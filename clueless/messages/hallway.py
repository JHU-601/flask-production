"""
Hallway base type for backend logic. Typically should be wrapped in a Location.
"""
from __future__ import annotations

from enum import IntEnum, auto
from typing import Type, Set
from clueless.error import ApiError
from clueless.messages.serialize import MessageSerialize, TMessageSerialize

@MessageSerialize.register
class Hallway(IntEnum):
    """
    Enumeration of a unique Hallway on the board
    """
    STUDY_HALL = 10
    HALL_LOUNGE = auto()
    STUDY_LIBRARY = auto()
    HALL_BILLIARD = auto()
    LOUNGE_DINING = auto()
    LIBRARY_BILLIARD = auto()
    BILLIARD_DINING = auto()
    LIBRARY_CONSERVATORY = auto()
    BILLIARD_BALLROOM = auto()
    DINING_KITCHEN = auto()
    CONSERVATORY_BALLROOM = auto()
    BALLROOM_KITCHEN = auto()

    @property
    def adjacent(self) -> Set[Location]:
        from clueless.messages.room import Room
        from clueless.messages.location import Location
        first, second = self.name.split('_')
        return(Location(Room[first]), Location(Room[second]))

    @property
    def _string_name(self) -> str:
        return f'{self.name}'.lower().replace("_", " ").title()

    @classmethod
    def _from_name(cls, val: str) -> Room:
        try:
            return cls[val.upper()]
        except KeyError:
            raise ApiError(f'Invalid  name {val}') from KeyError

    @classmethod
    def _from_ordinal(cls, ordinal: int) -> Room:
        try:
            return cls(ordinal)
        except ValueError:
            raise ApiError(f'Invalid hallway ordinal {ordinal}') from ValueError

    def serialize(self) -> int:
        # pylint: disable=missing-function-docstring
        return self.value

    @classmethod
    def deserialize(cls: Type[TMessageSerialize], val: str) -> Room: # type: ignore
        # pylint: disable=missing-function-docstring
        try:
            intval = int(val)
            return Hallway._from_ordinal(intval)
        except ValueError:
            return Hallway._from_name(val)
