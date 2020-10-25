from __future__ import annotations

from typing import Type, Set, Union, Optional
from clueless.error import ApiError

from clueless.messages import Hallway, Character, Room, Location, Weapon, Position, Registration, SuggestionStatus, Suggestion, SuggestionWitness, Accusation

class Register:
    def __init__(self, character: Union[Character, int], display_name: str):
        if isinstance(character, Character):
            self.character = character
        else:
            self.character = Character(character)

        self.display_name = display_name

    def into_registration(self) -> Registration:
        return Registration(self.character, self.display_name)

    def message_name(self) -> str:
        return "register"



class Move:
    def __init__(self, position: Union[Location, int]):
        if isinstance(position, Location):
            self.position = position
        else:
            self.position = Location.deserialize(position)

    def player_position(self, player: Character) -> Position:
        return Position(player, self.position)

    def message_name(self) -> str:
        return "move"

class Suggest:
    def __init__(self, room: Union[Room, int], weapon: Union[Weapon, int], suspect: Union[Character, int]):
        self.room = room
        self.weapon = weapon
        self.suspect = suspect

    def into_suggestion(self, player: Character) -> Suggestion:
        return Suggestion(player, self.room, self.weapon, self.suspect)

    def message_name(self) -> str:
        return "suggest"

class SuggestionResponse:
    def __init__(self, witness: Optional[Union[Character, Room, Weapon]]):
        self.witness = witness

    def into_status(self, player: Character) -> SuggestionStatus:
        return SuggestionStatus(player, self.witness is not None)

    def into_witness(self, player: Character) -> SuggestionWitness:
        return SuggestionWitness(player, self.witness)

    def message_name(self) -> str:
        return "suggestion-response"


class Accuse:
    def __init__(self, room: Room, weapon: Weapon, suspect: Character):
        self.room = room
        self.weapon = weapon
        self.suspect = suspect

    def into_accusation(self, player: Character) -> Accusation:
        return Accusation(player, self.room, self.weapon, self.suspect)

    def message_name(self) -> str:
        return "accuse"
