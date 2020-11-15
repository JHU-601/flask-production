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

class PlayerState:
    in_turn = False
    moved = False
    suggest = False
    suggestion_completed = False
    accused = False

    # Reset all values at the end of a players turn
    def end_turn(self):
        in_turn = False
        moved = False
        suggest = False
        suggestion_completed = False
        accused = False 
    
    # state to turn on or off certain player actions
    def start_turn(self):
        if self.in_turn:
            raise StateError("Already in player turn")
        else:
            self.in_turn = True

    def move(self):
        if self.moved:
            raise StateError("Player already moved")
        self.moved = True

    def suggest (self):
        if self.suggest:
            raise StateError("Player has already suggested")
        self.suggest = True

    def suggestion_completed (self):
        if self.suggestion_completed:
            raise StateError("Suggestion already completed")
        else:
            self.suggestion_compeleted = True

    # If this state is active, move player to new position
    def accused (self):
        if self.accused:
            raise StateError("")
        else:
            self.accused = True

'''
Server Representation of Player state, instances of this class are created upon client entrance into
Web App
'''
class Player:
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

    async def dispatch_message(self, message):
        self.logger.debug("Dispatch_message function:")
        if isinstance(message, CreateGame):
            if self.game is None:                       # If this player instance is not in a game
                self.game = GameState()                 # Create an instance of GameState class, associate it with Player instance
                id = self.game.id                            
                self.logger.debug(f'Created game {id}')
                GAMES[id] = self.game                   # Place in a dictionary of games
                await GAMES[id].add_user(self)          # Add user into recently created class
            else:
                self.logger.debug(f'Create Game: Player is in a game')
                await self.send_message(Status("Player is already in a game"))
        
        elif isinstance(message, JoinGame):
            self.logger.debug("JoinGame instance")
            if self.game is None:                           # Check whether this player instance is assocaited with a game

                self.logger.debug(f'Player Validated')      
                self.game = GAMES[message.id]               # Instance of player gets its own game association

                if self.game.id in GAMES:                   # Check whether the game.id exists in dictionary
                    self.logger.debug(f'Game {message.id} Validated')
                    await GAMES[message.id].add_user(self)
                else:
                    self.logger.debug(f'Game ID {message.id} DOES NOT exist')
                    await self.send_message(Status("Game ID does NOT exist"))
            else:
                self.logger.debug(f'Player is in a game')
                await self.send_message(Status("Player is already in a game"))
                
        elif isinstance(message, Register):
            self.logger.debug("Register instance")
            if not self.is_registered:    # If the player is not yet registered 
                self.logger.debug(f'Requesting registration as {message.display_name} with {message.character}')
                await self.game.register_user(self, message)        # Communicate with GameState to validate

            else:
                self.logger.debug(f'Player is already registered')
                await self.send_message(Status("Player is already registered"))

        elif isinstance(message, Complete):
            self.logger.debug(f'Turn completed')
            self.state.end_turn()
            await self.game.complete_turn(self.character)

        elif isinstance(message, Move):
            self.logger.debug(f'Move to {message.position}')
            await self.game.move_player(self, message.position)

        elif isinstance(message, Suggest):
            self.logger.debug("Suggest instance")
            if self.game is not None:    # Validate Player is in this game
                self.logger.debug(f'Suggestion: {message.room} {message.weapon} {message.suspect}')
                await self.game.suggestion(self.character, message)
            else:
                await self.send_message(Status("Player is not in this game"))
            
        elif isinstance(message, SuggestionResponse):
            self.logger.debug(f'Suggestion response witness: {message.witness} type: {message.type}')
            pass
        elif isinstance(message, Accuse):
            self.logger.debug(f'Accusation: {message.room} {message.weapon} {message.suspect}')
            await self.game.accuse(self.character, message)
        else:
            raise ApiError(f"received invalid message from client: {message}")

    async def send_message(self, message):
        print("Player - Server Send:", serialize_message(message))
        await self.socket.send(serialize_message(message))

    async def notify_move(self, player: Character, location: Location):
        # if player.character == self.character:
        #     self.location = location
        await self.send_message(Position(player, location))

    async def suggestion_query(self):
        return SuggestionResponse(None, 0)

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

class GameState:
    def __init__(self):
        self.id = ''.join([random.choice(string.ascii_letters) for x in range(5)])
        self.crime_character = random.choice(list(Character))
        self.crime_weapon = random.choice(list(Weapon))
        self.crime_room = random.choice(list(Room))

        self.players = []
        self.characters = dict([(character, None) for character in list(Character)])
        self.locations = dict([(location, None) for location in itertools.chain(list(Room), list(Hallway))])    # Can we make this a nested dictionary
        
        self.current_player = None
        self.witness_items = [None, None, None, None, None]
        self.disqualified = set([])

        self.logger = logging.getLogger(f'game-{self.id}')
        self.logger.setLevel(logging.DEBUG)

    async def start_game(self):
        ## START: skeletal setup
        registered = set([player.character for player in self.players])
        available = filter(lambda x: x not in registered, list(Character))
        await asyncio.wait([self.add_user(FakePlayer(i, self)) for i in range(3)])
        for player in self.players[2:]:
            player.character = next(available)
            await self.register_user(player, Register(player.character, player.display_name))
        ## END: skeletal setup

        # sort the players by character so that they can be indexed by player id
        self.players.sort(key=lambda player: player.character.value)

        items = [item for item in itertools.chain(
            [c for c in list(Character) if c != self.crime_character],
            [w for w in list(Weapon) if w != self.crime_weapon],
            [r for r in list(Room) if r != self.crime_room],
            )]
        random.shuffle(items)
        items_iter = iter(items)
        for player in self.players:
            player_items = (next(items_iter), next(items_iter), next(items_iter))
            self.witness_items[player.character.value] = player_items
            i1, i2, i3 = player_items
            await player.send_message(Witness(i1, i2, i3))


    async def move_player(self, player: Player, location: Location):
        self.logger.debug(player.state.moved)

        try:
            self.logger.debug(f'Before {self.locations}')
            self.logger.debug(f'Before {player.location}')
            
            if location in player.location.adjacent:            # if the requested location is adjacent to player 
                player.state.move()                                 # Update Player State
                self.locations[player.location] = None              # Clear previous location   - rework upon changing self.locations
                player.location = location                          # Update Player Location
                self.locations[location] = (player.character)       # Update Game State         - rework upon changing self.locations
            
                for other in self.players:
                    await other.notify_move(player.character, location)

                self.logger.debug(f'After {self.locations}')
                self.logger.debug(f'After {player.location}')
            
            else:
                player.send_message(Status("The request room is not valid"))
        except StateError as e:
            await player.send_message(Status(e.msg))


    async def broadcast(self, message, skip=None):
        self.logger.debug(f'BROADCAST: {message}')
        players = [player for player in self.players if player != skip]
        if players:
            await asyncio.wait([player.send_message(message) for player in self.players if player != skip ])

    async def suggestion(self, player: Character, suggest: Suggest):
        self.logger.debug("suggestion - GameState")
        suggestion = suggest.into_suggestion(player)    # conversion | note: suggestion has player parameter, suggest does not

        try:
            player.state.suggest()
            self.locations[suggestion.room] = suggestion.suspect    # Suspect into suggestion room - Need to be able to append to location
            self.players[suggestion.suspect.value].location = suggestion.room   # Update Player instance to match
        except StateError as e:
            await player.send_message(Status(e.msg))

        await self.broadcast(suggestion)

        # iterate through other players to assume suggestion query
        for other in itertools.chain(self.players[player.value+1:], self.players[:player.value]):
            if other.character in self.disqualified:
                continue
            response = await other.suggestion_query()
            status = response.into_status(other.character)
            if status.witnessed:
                await self.broadcast(status, skip=player)
                await self.players[player].send_message(response.into_witness(other.character))
            else:
                await self.broadcast(status)

    async def register_user(self, player: Player, msg: Register):

        registration = msg.into_registration()                          # Convert from Register to Registration class
        if self.characters[registration.character] is None:             # If character selection is still available
            self.logger.debug(f"Server confirming {registration.display_name} as {registration.character}")
            player.character = registration.character                   # Setting the instance character - changed is_registered
            player.display_name = registration.display_name             # Setting the instance display_name
            self.characters[player.character] = player.display_name     # Updating characters dictionary

            # Setting default locations baed on character choice
           
            if player.character == 0:        # Col Mustard in Lounge/Dining
                player.location = Hallway.LOUNGE_DINING
            elif player.character == 1:     # Miss Scarlet in Library/Conservatory
                player.location = Hallway.LIBRARY_CONSERVATORY
            elif player.character == 2:     # Professor Plum in the Study/Library
                player.location = Hallway.STUDY_LIBRARY
            elif player.character == 3:     # Mr. Green in the Conservatory/Ballroom
                player.location = Hallway.CONSERVATORY_BALLROOM
            elif player.character == 4:     # Mrs. White in the Ballroom/Kitchen
                player.location = Hallway.BALLROOM_KITCHEN
            elif player.character == 5:     # Mrs. Peacock in the Library/Conservatory
                player.location = Hallway.LIBRARY_CONSERVATORY
            
        
            self.locations[player.location] = player.character  # Update Game State location

            self.logger.debug(self.locations)   # Checking all locations

            await self.broadcast(registration, player.character)        # Broadcast to other clients
        else:
            self.logger.debug(f'Character selection not available')
            player.character = None
            await player.send_message(Status("Character selection not available"))

        registered = all([player.is_registered for player in self.players]) 
        if len(self.players) == 6 and registered:       # If we have 6 registered players, start the game
            self.logger.debug(f'Game is full, starting Clue-Less')
            await self.start_game()                     # Did not go into this yet

    async def add_user(self, player: Player):
        player.game = self
        self.logger.debug(f'adding player from {player.sock_addr}')
        await self.broadcast(UserJoined())
        await player.send_message(Joined(self.id))
        self.players.append(player)

    async def accuse(self, player: Character, accuse: Accuse):
        accusation = accuse.into_accusation(player)
        await self.broadcast(accusation, skip=player)
        if accusation.suspect == self.crime_character and accusation.room == self.crime_room and accusation.weapon == self.crime_weapon:
            await self.broadcast(Winner(player))
        else:
            self.disqualified.add(player)
            await self.broadcast(Disqualified(player))

    async def complete_turn(self, player: Character):
        try:
            self.current_player = Character(player.value+1)
        except ValueError:
            self.current_player = Character(0)
        self.broadcast(PlayerTurn(self.current_player))


class FakePlayer(Player):
    def __init__(self, num, game):
        self.num = num
        self.game = game
        self.character = None
        self.display_name = f"fake player {num}"
        self.state = UserState.UNREGISTERED
        self.called = False
        self.logger = logging.getLogger(f'server.{self.display_name}')
        self.logger.setLevel(logging.DEBUG)

    @property
    def sock_addr(self) -> str:
        return self.display_name

    async def dispatch_message(self, message):
        pass

    async def send_message(self, message):
        self.logger.debug(f'skip sending {serialize_message(message)}')

    async def notify_move(self, player: Character, location: Location):
        if player == self.character:
            self.location = location
        await self.send_message(Position(player, location))

    async def suggestion_query(self):
        return SuggestionResponse(None, 0)

    async def user_loop(self):
        while True:
            msg_str = await self.socket.recv()
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