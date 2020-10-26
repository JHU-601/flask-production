import random

import logging
import string
import itertools

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

    async def dispatch_message(self, message):
        if isinstance(message, CreateGame):
            game = GameState()
            id = game.id
            GAMES[id] = game
            await GAMES[id].add_user(self)
        elif isinstance(message, JoinGame):
            await GAMES[message.id].add_user(self)
        elif isinstance(message, Register):
            self.character = message.character
            self.display_name = message.display_name
            await self.game.register_user(self, message)
        elif isinstance(message, Complete):
            await self.game.complete_turn(self.character)
        elif isinstance(message, Move):
            await self.game.move_player(self.character, message.position)
        elif isinstance(message, Suggest):
            await self.game.suggestion(self.character, message)
        elif isinstance(message, SuggestionResponse):
            pass
        elif isinstance(message, Accuse):
            await self.game.accuse(self.player, message)
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
        logger = logging.getLogger('game_logger')
        while True:
            msg_str = await self.socket.recv()
            logger.debug(f'got message {msg_str}')
            try:
                msg = deserialize_message(msg_str)
            except ApiError as e:
                logger.error(f'message error {e}')
                await self.socket.send(Status(f'error deserializing message: {e}'))
            try:
                await self.dispatch_message(msg)
            except ApiError as e:
                logger.error(f'message error {e}')
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
        self.witness_items = []
        self.disqualified = set([])


    async def start_game(self):
        # sort the players by character so that they can be indexed by player id
        self.players.sort(key=lambda player: player.character.value)

    async def move_player(self, player: Character, location: Location):
        self.locations[location] = player
        for other in self.players:
            await other.notify_move(player, location)

    async def broadcast(self, message, skip=None):
        for player in self.players:
            if skip is not None and player.character == skip:
                continue
            await player.send_message(message)

    async def suggestion(self, player: Character, suggest: Suggest):
        suggestion = suggest.into_suggestion(player)
        self.locations[suggestion.room] = suggestion.suspect
        self.players[suggestion.suspect].location = suggestion.room
        self.broadcast(suggestion)
        for other in itertools.chain(self.players[player.value+1:], self.players[:player.value]):
            if other.character in self.disqualified:
                continue
            response = await other.suggestion_query()
            status = response.into_status(other)
            if status.witnessed:
                await self.broadcast(status, skip=player)
                self.players[player].send_message(response.into_witness(other))
            else:
                await self.broadcast(status)

    async def register_user(self, player: Player, msg: Register):
        registration = msg.into_registration()
        await self.broadcast(registration, player.character)

    async def add_user(self, player: Player):
        player.game = self
        await self.broadcast(UserJoined())
        await player.send_message(Joined(self.id))
        self.players.append(player)

    async def accuse(self, player: Character, accuse: Accuse):
        accusation = accuse.into_accusation(player)
        self.broadcast(accusation, skip=player)
        if accusation.suspect == self.crime_character and accusation.room == self.crime_room and accusation.weapon == self.crime_weapon:
            self.broadcast(Winner(player))
        else:
            self.disqualified.add(player)
            self.broadcast(Disqualified(player))

    async def complete_turn(self, player: Character):
        try:
            self.current_player = Character(player.value+1)
        except ValueError:
            self.current_player = Character(0)
        self.broadcast(PlayerTurn(self.current_player))


