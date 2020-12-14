import random

import logging
import string
import itertools

import asyncio

from clueless.messages.location import Hallway, Room, Location
from clueless.messages.character import Character
from clueless.messages.weapon import Weapon
from clueless.messages.server import *
from clueless.messages.client import *
from clueless.messages.serialize import deserialize_message, serialize_message
from clueless.error import ApiError
from enum import IntEnum, auto

# Dictionary to store all game IDs
'''
{Game ID: GameState()}
'''
GAMES = {}

class StateError(Exception):
    def __init__(self, msg):
        self.msg = msg
class LocationError(Exception):
    def __init__(self, msg):
        self.msg = msg

class PlayerState:
    in_turn = False
    moved = False
    suggest = False
    suggestion_completed = False
    accused = False


    def __str__(self):
        return f'in_turn: {self.in_turn}; moved: {self.moved}; suggest: {self.suggest}; suggest_comp: {self.suggestion_completed}; accused: {self.accused}'

    # Reset all values at the end of a players turn
    def end_turn(self):
        self._check_turn()
        self.in_turn = False
        self.moved = False
        self.suggest = False
        self.suggestion_completed = False
        self.accused = False

    # state to turn on or off certain player actions
    def start_turn(self):
        if self.in_turn:
            raise StateError("Already in player turn")
        else:
            self.in_turn = True

    def _check_turn(self):
        if not self.in_turn:
            raise StateError("It is not your turn.")

    def set_turn_value(self, value, msg):
        self._check_turn()
        if getattr(self, value):
            raise StateError(msg)
        setattr(self, value, True)


    def set_move(self):
        self.set_turn_value('moved', 'Player already moved.')

    def set_suggest (self):
        self.set_turn_value('suggest', 'Player has already made a suggesiton.')

    def set_suggestion_completed (self):
        self.set_turn_value('suggestion_completed', "Suggestion already completed.")

    def set_accused (self):
        self.set_turn_value('accused', 'Player already made an accusation.')


class Player:
    '''
    Server Representation of Player state, instances of this class are created upon client entrance into
    Web App
    '''
    def __init__(self, socket):
        self.socket = socket
        self.game = None
        self.character = None
        self.display_name = None
        self.location = None
        self.state = PlayerState()
        self.called = False         # What was the original purpose of this attribute - currently isn't in use
        self.logger = logging.getLogger(f'server.player{socket.remote_address}')
        self.logger.setLevel(logging.DEBUG)

    @property
    def sock_addr(self) -> str:
        return f'{self.socket.remote_address}'

    @property
    def is_registered(self) -> bool:
        return self.character is not None

    async def game_action(self, action, action_description):
        if self.game is not None:
            await action(self.game)
        else:
            await self.send_message(Status(f'Cannot {action_description}. Player has not joined a game.'))

    async def dispatch_message(self, message):
        self.logger.debug("Dispatch_message function:")
        if isinstance(message, CreateGame):
            if self.game is None:  # If this player instance is not in a game
                self.game = GameState()  # Create an instance of GameState class, associate it with Player instance
                id = self.game.id
                self.logger.debug(f'Created game {id}')
                GAMES[id] = self.game  # Place in a dictionary of games
                await GAMES[id].add_user(self)  # Add user into recently created class
            else:
                self.logger.debug(f'Create Game: Player is in a game')
                await self.send_message(Status("Player is already in a game"))

        elif isinstance(message, JoinGame):
            self.logger.debug("JoinGame instance")
            if self.game is None:                           # Check whether this player instance is assocaited with a game

                self.logger.debug(f'Player Validated')
                try:
                    game = GAMES[message.id]
                    await game.add_user(self)
                except KeyError:
                    await self.send_message(Status("Could not find game."))
            else:
                self.logger.debug(f'Player is in a game')
                await self.send_message(Status("Player is already in a game"))

        elif isinstance(message, Register):
            self.logger.debug("Register instance")
            if not self.is_registered:    # If the player is not yet registered
                self.logger.debug(f'Requesting registration as {message.display_name} with {message.character}')
                await self.game_action(lambda game: game.register_user(self, message), "register")

            else:
                self.logger.debug(f'Player is already registered')
                await self.send_message(Status("Player is already registered"))

        elif isinstance(message, Complete):
            self.logger.debug(f'Turn completed')
            await self.game_action(lambda game: game.complete_turn(self), "end turn")

        elif isinstance(message, Move):
            self.logger.debug(f'Move to {message.position}')
            await self.game_action(lambda game: game.move_player(self, message.position), "move")

        elif isinstance(message, Suggest):
            self.logger.debug(f'Suggestion: {message.room} {message.weapon} {message.suspect}')
            await self.game_action(lambda game: game.suggestion(self, message), "make a suggestion")
        elif isinstance(message, SuggestionResponse):
            self.logger.debug(f'Suggestion response witness: {message.witness}')
            await self.game_action(lambda game: game.suggestion_response(self, message), "respond to suggestion")
        elif isinstance(message, Accuse):
            self.logger.debug(f'Accusation: {message.room} {message.weapon} {message.suspect}')

            await self.game_action(lambda game: game.accuse(self, message), "make an accusation")
        elif isinstance(message, Chat):
            self.logger.debug(f'Chat: {message}')
            await self.game_action(lambda game: game.chat(self, message), "send a chat message")
        else:
            raise ApiError(f"received invalid message from client: {message}")

    async def send_message(self, message):
        self.logger.debug(f"Player - Server Send: {serialize_message(message)}")
        await self.socket.send(serialize_message(message))

    async def notify_move(self, player: Character, location: Location):
        # if player.character == self.character:
        #     self.location = location
        await self.send_message(Position(player, location))

    async def user_loop(self):
        while True:
            self.logger.debug("AWAITING")
            msg_str = await self.socket.recv()              # Waiting to receive something from Client
            self.logger.debug(f'received {msg_str}')
            try:
                msg = deserialize_message(msg_str)
            except ApiError as e:
                self.logger.error(f'message error {e}')
                await self.socket.send(Status(f'error deserializing message: {e}'))
            try:
                await self.dispatch_message(msg)
            except ApiError as e:
                self.logger.error(f'message error {e}')
                await self.socket.send(Status(f'error handling message: {e}'))

class Locations:
    def __init__(self):
        # Dict mapping location to players
        self.locations = {}
        # Dict with the reverse, mapping players to locations
        self.positions = {}

        self.called = set([])

        for room in list(Room):
            self.locations[room] = set([])
        for hallway in list(Hallway):
            self.locations[hallway] = None

    def __str__(self):
        val = ''
        '''
        for room in list(Room):
            val = val + f'{room} :'
            val = val + (','.join([str(player) for player in self.locations[room]]) if self.locations[room] else 'empty')
            val = val + '\n'
        for hallway in list(Hallway):
            val = val + f'{hallway} :'
            val = val + (str(self.locations[hallway]) if self.locations[hallway] is not None else 'empty')
            val = val + '\n'
        '''
        for player, location in self.positions.items():
            val += f'{player}: ' +  (str(location) if location is not None else 'start')
        return val

    def is_available(self, location: Location):
        if location.is_room:
            return True
        try:
            return self.positions[location] is not None
        except KeyError:
            return True



    def is_called(self, player: Player):
        return player.character in self.called

    def call_player(self, character: Character, room: Room):
        self.called.add(character)
        self.positions[character] = Location(room)
        self.locations[room].add(character)

    def _remove_player(self, player: Player, location: Location):
        if location.is_room:
            self.locations[location.as_room()].remove(player.character)
        else:
            self.locations[location.as_hallway()] = None

    def move_player(self, player: Player, location: Location):
        player.state.set_move()
        if location.is_room:
            return self.move_to_room(player, location.as_room())
        elif location.is_hallway:
            return self.move_to_hallway(player, location.as_hallway())

        # should be impossible to reach this point
        assert False

    def move_to_room(self, player: Player, room: Room):
        try:
            current_location = self.positions[player.character]
            self._remove_player(player, current_location)
            if Location(room) not in current_location.adjacent:
                raise LocationError("Player cannot move to this location.")
        except KeyError:
            raise LocationError("Cannot move to this location on first turn.")

        self.positions[player.character] = Location(room)
        self.locations[room].add(player.character)
        if player.character in self.called:
            self.called.remove(player.character)

    def move_to_hallway(self, player: Player, hallway: Hallway):
        if self.locations[hallway] is not None:
            raise LocationError("Hallway is blocked.")

        try:
            current_location = self.positions[player.character]
            self._remove_player(player, current_location)
        except KeyError:
            # Only an error if the player ins't moving to the
            # hallway adjacent to their starting position
            if hallway != player.character.first_location:
                raise LocationError("Cannot move to this location on first turn.")
        

        self.locations[hallway] = player.character
        self.positions[player.character] = Location(hallway)
        if player.character in self.called:
            self.called.remove(player.character)


class GameState:
    def __init__(self):
        self.id = ''.join([random.choice(string.ascii_letters) for x in range(5)])
        self.crime_character = random.choice(list(Character))
        self.crime_weapon = random.choice(list(Weapon))
        self.crime_room = random.choice(list(Room))

        self.players = []
        self.characters = dict([(character, None) for character in list(Character)])
        self.locations = Locations()

        self.current_player = None
        self.witness_items = [None, None, None, None, None, None]
        self.disqualified = set([])

        # iterator over players to query for suggestion responses
        self.suggestion_query = None
        # the player who is making a suggestion
        self.suggestion_player = None
        # the player currently being queried
        self.queried_player = None

        self.logger = logging.getLogger(f'game-{self.id}')
        self.logger.setLevel(logging.DEBUG)

    def is_accusation_correct(self, accusation):
        return accusation.suspect == self.crime_character and \
            accusation.room == self.crime_room and \
            accusation.weapon == self.crime_weapon

    async def start_game(self):
        # sort the players by character so that they can be indexed by player id
        self.players.sort(key=lambda player: player.character.value)

        items = [item for item in itertools.chain(
            [c for c in list(Character) if c != self.crime_character],
            [w for w in list(Weapon) if w != self.crime_weapon],
            [r for r in list(Room) if r != self.crime_room],
        )]
        self.logger.debug(f'crime character: {self.crime_character}; crime weapon: {self.crime_weapon}; '
                          f'crime room: {self.crime_room}')
        random.shuffle(items)
        items_iter = iter(items)
        for player in self.players:
            player_items = (next(items_iter), next(items_iter), next(items_iter))
            self.witness_items[player.character.value] = player_items
            i1, i2, i3 = player_items
            await player.send_message(Witness(i1, i2, i3))

        self.current_player = self.players[0]
        self.current_player.state.start_turn()
        await self.broadcast(PlayerTurn(self.current_player.character))


    async def move_player(self, player: Player, location: Location):
        self.logger.debug(f'player moved: {player.state.moved}')

        self.logger.debug(f'Before {self.locations}')
        self.logger.debug(f'Before {player.location}')

        try:
            self.locations.move_player(player, location)
            self.logger.debug(f'moved {player.character} to {location}')
        except LocationError as e:
            player.state.moved = False
            return await player.send_message(Status(e.msg))
        except StateError as e:
            return await player.send_message(Status(e.msg))

        player.location = location

        for other in self.players:
            await other.notify_move(player.character, location)

        self.logger.debug(f'After {self.locations}')
        self.logger.debug(f'After {player.location}')


    async def broadcast(self, message, skip=None):
        self.logger.debug(f'BROADCAST: {message}')
        players = [player for player in self.players if player != skip]
        if players:
            await asyncio.wait([player.send_message(message) for player in self.players if player != skip])


    def validate_suggestion_response(self, response_player: Player, response: SuggestionResponse):
        denied = response.witness is None
        has_item = False
        for item in self.witness_items[response_player.character]:
            if (isinstance(item, Room) and item == self.current_suggestion.room) or \
               (isinstance(item, Weapon) and item == self.current_suggestion.weapon) or \
               (isinstance(item, Character) and item == self.current_suggestion.character):
                has_item = True
                break
        if denied and has_item:
            return False
        elif denied:
            return True

        if (isinstance(response.witness, Room) and response.witness != self.current_suggestion.room) or \
           isinstance(response.witness, Character) and response.witness != self.current_suggestion.suspect or \
           isinstance(response.witness, Weapon) and response.witness != self.current_suggestion.weapon:
            return False
        return True


    async def suggestion_response(self, response_player: Player, response: SuggestionResponse):
        if self.suggestion_player is None:
            return await response_player.send_message(Status("Cannot respond to suggestion, no suggestion was made."))
        if self.queried_player != response_player:
            return await response_player.send_message(Status("Wait your turn to respond."))
        # check response for cheating
        #is_valid = self.validate_suggestion_response(response_player, response)

        #if not is_valid:
        #    return await response_player.send_message(Status("Invalid suggestion reponse"))

        status = response.into_status(response_player.character)


        if response.witness is not None:
            witness = response.into_witness(response_player.character)
            await self.suggestion_player.send_message(witness)
            await self.broadcast(status, skip=self.suggestion_player)
            self.suggestion_player = None
            self.suggestion_query = None
            self.queried_player = None
            self.current_suggestion = None
        else:
            await self.broadcast(status)
            try:
                self.queried_player = next(self.suggestion_query)
            except StopIteration:
                # Nobody else to query, we're done
                self.suggestion_player = None
                self.suggestion_query = None
                self.queried_player = None
                self.current_suggestion = None
                return
            await self.queried_player.send_message(SuggestionQuery())


    async def suggestion(self, player: Player, suggest: Suggest):
        self.logger.debug("suggestion - GameState")
        # conversion | note: suggestion has player parameter, suggest does not
        suggestion = suggest.into_suggestion(player.character)

        if not player.state.moved and not self.locations.is_called(player):
            return await player.send_message(Status("Player must move before making a suggestion."))
        if player.location != Location(suggest.room):
            return await player.send_message(Status("Player must be in the room specified in their suggestion"))

        try:
            player.state.set_suggest()
        except StateError as e:
            return await player.send_message(Status(e.msg))

        # Update the player location and mark them as called
        self.locations.call_player(suggestion.suspect, suggestion.room)

        await self.broadcast(suggestion)

        # Set things up for the querying process
        players = itertools.chain(self.players[player.character + 1:], self.players[:player.character])
        # iterator over qualified players, in the order they should be queried
        self.suggestion_query = filter(lambda p: p not in self.disqualified, players)
        self.suggestion_player = player
        self.queried_player = next(self.suggestion_query)
        self.current_suggestion = suggestion

        await self.queried_player.send_message(SuggestionQuery())

    async def register_user(self, player: Player, msg: Register):

        # Convert from Register to Registration class
        registration = msg.into_registration()
        if self.characters[registration.character] is None:
            # If character selection is still available
            self.logger.debug(f"Server confirming {registration.display_name} as {registration.character}")
            # Setting the instance character - changed is_registered
            player.character = registration.character
            # Setting the instance display_name
            player.display_name = registration.display_name
            # Updating characters dictionary
            self.characters[player.character] = player.display_name

            # Note: Removed default Player locations, as they don't technically
            # start out in these locations, they start adjacent to them off the board

            await self.broadcast(registration, player.character)        # Broadcast to other clients
        else:
            self.logger.debug(f'Character selection not available')
            player.character = None
            await player.send_message(Status("Character selection not available"))

        registered = all([player.is_registered for player in self.players])
        # If we have 6 registered players, start the game
        if len(self.players) == 6 and registered:
            self.logger.debug(f'Game is full, starting Clue-Less')
            # Did not go into this yet
            await self.start_game()

    async def add_user(self, player: Player):

        if len(self.players) == 6:
            return await player.send_message(Status("Game is full"))

        player.game = self
        self.logger.debug(f'adding player from {player.sock_addr}')
        await self.broadcast(UserJoined())
        available = [character for character in list(Character) if self.characters[character] is None]
        registered = []
        for c in list(Character):
            if self.characters[c] is not None:
                registered.append((c, self.characters[c]))
        players = len(self.players) + 1
        await player.send_message(Joined(self.id, available, registered, players))
        self.players.append(player)

    async def accuse(self, player: Player, accuse: Accuse):
        accusation = accuse.into_accusation(player.character)

        # validate player's turn who's making accusation
        if self.current_player == player:
            # Update the player location and mark them as called
            self.locations.call_player(suggestion.suspect, suggestion.room)

            await self.broadcast(accusation, skip=player)
            if self.is_accusation_correct(accusation):
                await self.broadcast(Winner(player.character))
            else:
                self.disqualified.add(player)
                # check for number of disqualified players
                if len(self.disqualified) < 5:
                    await self.broadcast(Disqualified(player.character))
                    await self.complete_turn(player)
                elif len(self.disqualified) == 5:
                    for curPlayer in self.players:
                        if curPlayer not in self.disqualified:
                            self.logger.debug(f'Five players disqualified, ending game.')
                            await self.broadcast(Winner(player.character));

        else:
            self.logger.debug(f'Invalid move, not currently turn of accuser')
            await self.players[player].send_message(Status(f'Invalid move, not currently turn of accuser'))

    def next_player(self):
        try:
            self.current_player = self.players[self.current_player.character.value + 1]
        except IndexError:
            self.current_player = self.players[0]

        if self.current_player in self.disqualified:
            return self.next_player()
        else:
            return self.current_player

    async def complete_turn(self, player: Player):
        try:
            has_moved = player.state.moved
            can_move = any([self.locations.is_available(loc) for loc in player.location.adjacent])
            if not has_moved and can_move and not self.locations.is_called(player):
                return await player.send_message(Status("You must move before ending your turn."))
            self.logger.debug(f'ending turn for {player.character}: {player.state}')
            player.state.end_turn()
            self.logger.debug(f'ended turn for {player.character}: {player.state}')
        except StateError as e:
            return await player.send_message(Status(e.msg))
        except AttributeError as e:
            return await player.send_message(Status("You must make a move before ending your turn."))

        new_player = self.next_player()
        self.logger.debug(f'starting turn for {new_player.character}: {new_player.state}')
        try:
            new_player.state.start_turn()
        except StateError as e:
            self.logger.error(f'Something went horribly wrong, multiple players in turn. Resetting')
            new_player.state.end_turn()
            new_player.state.start_turn()
        await self.broadcast(PlayerTurn(self.current_player.character))

    async def chat(self, player: Player, chat: Chat):
        chat_msg = chat.into_chat_message(player.character)
        if chat.to is not None:
            to_player = self.players[chat.to]
            await to_player.send_message(chat_msg)
        else:
            await self.broadcast(chat_msg)

