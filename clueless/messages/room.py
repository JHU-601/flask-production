"""
Room base type for backend logic. Typically should be wrapped in a Location.
"""
from __future__ import annotations

from enum import IntEnum, auto
from typing import Type, Set
from clueless.error import ApiError
from clueless.messages.serialize import MessageSerialize, TMessageSerialize

@MessageSerialize.register
class Room(IntEnum):
    """
    Enumeration of a unique room on the board
    """
    STUDY = 0
    HALL = auto()
    LOUNGE = auto()
    LIBRARY = auto()
    BILLIARD = auto()
    DINING = auto()
    CONSERVATORY = auto()
    BALLROOM = auto()
    KITCHEN = auto()

    @property
    def adjacent(self) -> Set[Location]:
        from clueless.messages.hallway import Hallway
        from clueless.messages.location import Location
        if self == Room.STUDY:
            return {
                Location(Hallway.STUDY_HALL),
                Location(Hallway.STUDY_LIBRARY),
                Location(Room.KITCHEN)
            }

        if self == Room.HALL:
          return {
                Location(Hallway.HALL_LOUNGE),
                Location(Hallway.HALL_BILLIARD),
                Location(Hallway.STUDY_HALL)
            }

        if self == Room.LOUNGE:
            return {
                Location(Hallway.HALL_LOUNGE),
                Location(Hallway.LOUNGE_DINING),
                Location(Room.CONSERVATORY)
            }

        if self == Room.LIBRARY:
            return {
                Location(Hallway.STUDY_LIBRARY),
                Location(Hallway.LIBRARY_BILLIARD),
                Location(Hallway.LIBRARY_CONSERVATORY)
            }

        if self == Room.BILLIARD:
            return {
                Location(Hallway.LIBRARY_BILLIARD),
                Location(Hallway.HALL_BILLIARD),
                Location(Hallway.BILLIARD_DINING),
                Location(Hallway.BILLIARD_BALLROOM)
            }

        if self == Room.DINING:
            return {
                Location(Hallway.LOUNGE_DINING),
                Location(Hallway.BILLIARD_DINING),
                Location(Hallway.DINING_KITCHEN)
            }

        if self == Room.CONSERVATORY:
            return {
                Location(Hallway.LIBRARY_CONSERVATORY),
                Location(Hallway.CONSERVATORY_BALLROOM),
                Location(Room.LOUNGE)
            }

        if self == Room.BALLROOM:
            return {
                Location(Hallway.CONSERVATORY_BALLROOM),
                Location(Hallway.BILLIARD_BALLROOM),
                Location(Hallway.BALLROOM_KITCHEN)
            }

        if self == Room.KITCHEN:
            return {
                Location(Hallway.BALLROOM_KITCHEN),
                Location(Hallway.DINING_KITCHEN),
                Location(Room.STUDY)
            }


    @property
    def _string_name(self) -> str:
        return f'{self.name}'.lower().title()

    @classmethod
    def _from_name(cls, val: str) -> Room:
        try:
            return cls[val.upper()]
        except KeyError:
            raise ApiError(f'Invalid room name {val}') from KeyError

    @classmethod
    def _from_ordinal(cls, ordinal: int) -> Room:
        try:
            return cls(ordinal)
        except ValueError:
            raise ApiError(f'Invalid room ordinal {ordinal}') from ValueError

    def serialize(self) -> int:
        # pylint: disable=missing-function-docstring
        return self.value

    @classmethod
    def deserialize(cls: Type[TMessageSerialize], val: str) -> Room: # type: ignore
        # pylint: disable=missing-function-docstring
        try:
            intval = int(val)
            return Room._from_ordinal(intval)
        except ValueError:
            return Room._from_name(val)
