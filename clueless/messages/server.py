from __future__ import annotations

from typing import Type, Set, Union, Optional
from clueless.error import ApiError

from clueless.messages.location import Hallway, Room, Location
from clueless.messages.character import Character
from clueless.messages.weapon import Weapon

class Status:
    def __init__(self, message=None):
        self.message = message

    def message_name(self) -> str:
        return "status"


class Available:
    def __init__(self, characters=None):
        self.characters = characters if characters is not None else []

    def message_name(self) -> str:
        return "available"

class Registration:
    def __init__(self, character: Character, display_name: str):
        self.character = character
        self.display_name = display_name
    def message_name(self) -> str:
        return "status"

class Witness:
    def __init__(self, item1: Union[Character, Room, Weapon], item2: Union[Character, Room, Weapon], item3: Union[Character, Room, Weapon]):
        self.item1 = item1
        self.item2 = item2
        self.item3 = item3

    def message_name(self) -> str:
        return "witness"

class Position:
    def __init__(self, player: Character, location: Location):
        self.player = player
        self.location = location

    def message_name(self) -> str:
        return "position"

class PlayerTurn:
    def __init__(self):
        pass
    def message_name(self) -> str:
        return "player-turn"

class Suggestion:
    def __init__(self, player: Character, room: Room, weapon: Weapon, suspect: Character):
        self.player = player
        self.room = room
        self.weapon = weapon
        self.suspect = suspect

    def message_name(self) -> str:
        return "suggestion"

class SuggestionQuery:
    def __init__(self):
        pass

    def message_name(self) -> str:
        return "suggestion-query"

class SuggestionStatus:
    def __init__(self, character: Character, witnessed: bool):
        self.character = character
        self.witnessed = witnessed

    def message_name(self) -> str:
        return "suggestion-status"

class SuggestionWitness:
    def __init__(self, character: Character, witness: Optional[Union[Character, Room, Weapon]]):
        self.character = character
        self.witness = witness

    def message_name(self) -> str:
        return "suggestion-witness"

class Accusation:
    def __init__(self, player: Character, room: Room, weapon: Weapon, suspect: Character):
        self.player = player
        self.room = room
        self.weapon = weapon
        self.suspect = suspect

    def message_name(self) -> str:
        return "accusation"

class Winner:
    def __init__(self, player: Character):
        self.player = player

    def message_name(self) -> str:
        return "winner"

class Disqualified:
    def __init__(self, player: Character):
        self.player = player

    def message_name(self) -> str:
        return "disqualified"



