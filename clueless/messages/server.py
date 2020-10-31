from __future__ import annotations

from typing import Type, Set, Union, Optional
from clueless.error import ApiError

from clueless.messages.location import Hallway, Room, Location
from clueless.messages.character import Character
from clueless.messages.weapon import Weapon
from clueless.messages.witness import WitnessType

class Status:
    def __init__(self, message=None):
        self.message = message

    def message_name(self) -> str:
        return "status"

class Joined:
    def __init__(self, id: str):
        self.id = id

class UserJoined:
    def __init__(self):
        pass

class Available:
    def __init__(self, characters=None):
        self.characters = characters if characters is not None else []

class Registration:
    def __init__(self, character: Character, display_name: str):
        self.character = character
        self.display_name = display_name

class Witness:
    def __init__(self, item1: Union[Character, Room, Weapon], item2: Union[Character, Room, Weapon], item3: Union[Character, Room, Weapon]):
        self.item1 = item1
        self.type1 = WitnessType.for_item(item1)
        self.item2 = item2
        self.type2 = WitnessType.for_item(item2)
        self.item3 = item3
        self.type3 = WitnessType.for_item(item3)

class Position:
    def __init__(self, player: Character, location: Location):
        self.player = player
        self.location = location

class PlayerTurn:
    def __init__(self, player: Character):
        self.player = player

class Suggestion:
    def __init__(self, player: Character, room: Room, weapon: Weapon, suspect: Character):
        self.player = player
        self.room = room
        self.weapon = weapon
        self.suspect = suspect

class SuggestionQuery:
    def __init__(self):
        pass

class SuggestionStatus:
    def __init__(self, character: Character, witnessed: bool):
        self.character = character
        self.witnessed = witnessed

class SuggestionWitness:
    def __init__(self, character: Character, witness: Optional[Union[Character, Room, Weapon]]):
        self.character = character
        self.witness = witness

class Accusation:
    def __init__(self, player: Character, room: Room, weapon: Weapon, suspect: Character):
        self.player = player
        self.room = room
        self.weapon = weapon
        self.suspect = suspect

class Winner:
    def __init__(self, player: Character):
        self.player = player

class Disqualified:
    def __init__(self, player: Character):
        self.player = player
