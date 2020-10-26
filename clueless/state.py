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

class UserState(IntEnum):
    UNREGISTERED = 0
    REGISTERED = auto()
    TURN_MOVED = auto()
    TURN_SUGGESTED = auto()

GAMES = {}

class Player:
    def __init__(self, socket):
        self.socket = socket
        self.game = None
        self.character = None
        self.display_name = None
        self.location = None
        self.state = UserState.UNREGISTERED
        self.called = False
        self.logger = logging.getLogger(f'server.player{socket.remote_address}')
        self.logger.setLevel(logging.DEBUG)

    @property
    def sock_addr(self) -> str:
        return f'{self.socket.remote_address}'

    @property
    def is_registered(self) -> bool:
        return self.character is not None

    async def dispatch_message(self, message):
        if isinstance(message, CreateGame):
            self.logger.debug(f"Received crate game")
            game = GameState()
            id = game.id
            self.logger.debug(f'Created game {id}')
            GAMES[id] = game
            await GAMES[id].add_user(self)
        elif isinstance(message, JoinGame):
            self.logger.debug(f'Joining game {message.id}')
            await GAMES[message.id].add_user(self)
        elif isinstance(message, Register):
            self.logger.debug(f'Registering as {message.display_name} with {message.character}')
            self.character = message.character
            self.display_name = message.display_name
            await self.game.register_user(self, message)
        elif isinstance(message, Complete):
            self.logger.debug(f'Turn completed')
            await self.game.complete_turn(self.character)
        elif isinstance(message, Move):
            self.logger.debug(f'Move to {message.position}')
            await self.game.move_player(self.character, message.position)
        elif isinstance(message, Suggest):
            self.logger.debug(f'Suggestion: {message.room} {message.weapon} {message.suspect}')
            await self.game.suggestion(self.character, message)
        elif isinstance(message, SuggestionResponse):
            self.logger.debug(f'Suggestion response witness: {message.witness} type: {message.type}')
            pass
        elif isinstance(message, Accuse):
            self.logger.debug(f'Accusation: {message.room} {message.weapon} {message.suspect}')
            await self.game.accuse(self.character, message)
        else:
            raise ApiError(f"received invalid message from client: {message}")

    async def send_message(self, message):
        await self.socket.send(serialize_message(message))

    async def notify_move(self, player: Character, location: Location):
        if player == self.character:
            self.location = location
        await self.send_message(Position(player, location))

    async def suggestion_query(self):
        return SuggestionResponse(None, 0)

    async def user_loop(self):
        while True:
            msg_str = await self.socket.recv()
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

class GameState:
    def __init__(self):
        self.id = ''.join([random.choice(string.ascii_letters) for x in range(5)])
        self.crime_character = random.choice(list(Character))
        self.crime_weapon = random.choice(list(Weapon))
        self.crime_room = random.choice(list(Room))

        self.players = []
        self.characters = dict([(character, None) for character in list(Character)])
        self.locations = dict([(location, None) for location in itertools.chain(list(Room), list(Hallway))])
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


    async def move_player(self, player: Character, location: Location):
        self.locations[location] = player
        for other in self.players:
            await other.notify_move(player, location)

    async def broadcast(self, message, skip=None):
        self.logger.debug(f'BROADCAST: {message}')
        players = [player for player in self.players if player != skip]
        if players:
            await asyncio.wait([player.send_message(message) for player in self.players if player != skip ])

    async def suggestion(self, player: Character, suggest: Suggest):
        suggestion = suggest.into_suggestion(player)
        self.locations[suggestion.room] = suggestion.suspect
        self.players[suggestion.suspect.value].location = suggestion.room
        await self.broadcast(suggestion)
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
        registration = msg.into_registration()
        await self.broadcast(registration, player.character)
        ## For the skeletal, to register fake users to show "in game" messages
        ## change to 6 after skeletal
        registered = all([player.is_registered for player in self.players])
        if len(self.players) == 2 and registered:
            await self.start_game()

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


