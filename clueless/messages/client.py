from __future__ import annotations

from typing import Type, Set, Union, Optional
from clueless.error import ApiError

from clueless.messages import Hallway, Character, Room, Location, Weapon, Position, Registration, SuggestionStatus, Suggestion, SuggestionWitness, Accusation
from clueless.messages.witness import WitnessType

class JoinGame:
    def __init__(self, id: str):
        self.id = id

class CreateGame:
    def __init__(self):
        pass

class Complete:
    def __init__(self):
        pass

class Register:
    def __init__(self, character: Union[Character, int], display_name: str):
        self.character = character if isinstance(character, Character) else Character.deserialize(character)
        self.display_name = display_name

    def into_registration(self) -> Registration:
        return Registration(self.character, self.display_name)


class Move:
    def __init__(self, position: Union[Location, int]):
        self.position = position if isinstance(position, Location) else Location.deserialize(position)

    def player_position(self, player: Character) -> Position:
        return Position(player, self.position)

class Suggest:
    def __init__(self, room: Union[Room, int], weapon: Union[Weapon, int], suspect: Union[Character, int]):
        print(f'room: {room}, {room.__class__}')
        self.room = room if isinstance(room, Room) else Room.deserialize(room)
        self.weapon = weapon if isinstance(weapon, Weapon) else Weapon.deserialize(weapon)
        self.suspect = suspect if isinstance(suspect, Character) else Character.deserialize(suspect)

    def into_suggestion(self, player: Character) -> Suggestion:
        return Suggestion(player, self.room, self.weapon, self.suspect)

class SuggestionResponse:
    def __init__(self, witness: Optional[Union[Character, Room, Weapon]]=None, type: Union[WitnessType, int]=None ):
        if type is None:
            self.witness = None
        else:
            self.type = type if isinstance(type, WitnessType) else WitnessType.deserialize(type)
            if isinstance(witness, Character) or isinstance(witness, Room) or isinstance(witness, Weapon):
                self.witness = witness
            elif witness is not None:
                if self.type == WitnessType.ROOM:
                    self.witness = Room.deserialize(witness)
                elif self.type == WitnessType.CHARACTER:
                    self.witness = Character.deserialize(witness)
                else:
                    self.witness = Weapon.deserialize(witness)
            else:
                self.witness = None

    def into_status(self, player: Character) -> SuggestionStatus:
        return SuggestionStatus(player, self.witness is not None)

    def into_witness(self, player: Character) -> SuggestionWitness:
        return SuggestionWitness(player, self.witness)


class Accuse:
    def __init__(self, room: Room, weapon: Weapon, suspect: Character):
        self.room = room if isinstance(room, Room) else Room.deserialize(room)
        self.weapon = weapon if isinstance(weapon, Weapon) else Weapon.deserialize(weapon)
        self.suspect = suspect if isinstance(suspect, Character) else Character.deserialize(suspect)

    def into_accusation(self, player: Character) -> Accusation:
        return Accusation(player, self.room, self.weapon, self.suspect)
