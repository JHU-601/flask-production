from __future__ import annotations

from enum import IntEnum, auto
from typing import Type, Union, Optional, Set
from clueless.error import ApiError

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

        raise Exception


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
    def deserialize(cls, val: Union[str, int]) -> Room:
        # pylint: disable=missing-function-docstring
        if isinstance(val, int):
          return Room._from_ordinal(val)
        try:
            intval: int = int(val)
            return Room._from_ordinal(intval)
        except ValueError:
            return Room._from_name(val)

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
        first, second = self.name.split('_')
        return {Location(Room[first]), Location(Room[second])}

    @property
    def _string_name(self) -> str:
        return f'{self.name}'.lower().replace("_", " ").title()

    @classmethod
    def _from_name(cls, val: str) -> Hallway:
        try:
            return cls[val.upper()]
        except KeyError:
            raise ApiError(f'Invalid  name {val}') from KeyError

    @classmethod
    def _from_ordinal(cls, ordinal: int) -> Hallway:
        try:
            return cls(ordinal)
        except ValueError:
            raise ApiError(f'Invalid hallway ordinal {ordinal}') from ValueError

    def serialize(self) -> int:
        # pylint: disable=missing-function-docstring
        return self.value

    @classmethod
    def deserialize(cls, val: Union[str, int]) -> Hallway: # type: ignore
        # pylint: disable=missing-function-docstring
        if isinstance(val, int):
          return Hallway._from_ordinal(val)
        try:
            intval: int = int(val)
            return Hallway._from_ordinal(intval)
        except ValueError:
            return Hallway._from_name(val)

class Location:
    def __init__(self, inner: Union[Room, Hallway]):
        self.inner = inner


    @property
    def adjacent(self) -> Set[Location]:
        return self.inner.adjacent

    @property
    def is_room(self) -> bool:
        return isinstance(self.inner, Room)

    def as_room(self) -> Optional[Room]:
        if isinstance(self.inner, Room):
            return self.inner
        else:
            return None

    @property
    def is_hallway(self) -> bool:
        return isinstance(self.inner, Hallway)

    def as_hallway(self) -> Optional[Hallway]:
        if isinstance(self.inner, Hallway):
            return self.inner
        else:
            return None

    def _string_name(self) -> str:
        return self.inner._string_name

    def serialize(self) -> int:
        # pylint: disable=missing-function-docstring
        return self.inner.serialize()

    @classmethod
    def deserialize(cls, val: Union[str, int]) -> Location:
        # pylint: disable=missing-function-docstring
        try:
            intval = int(val)
            if intval < 10:
                return Location(Room.deserialize(val))
            else:
                return Location(Hallway.deserialize(val))
        except ValueError:
            pass

        try:
            return Location(Room.deserialize(val))
        except ApiError:
            pass

        return Location(Hallway.deserialize(val))


    def __str__(self) -> str:
        return f'Location({self.inner!r})'

    def __eq__(self, other):
        if other.__class__ == Location:
            return self.inner == other.inner
        elif (isinstance(other, Room) and isinstance(self.inner, Room)) or \
                (isinstance(other, Hallway) and isinstance(self.inner, Hallway)):
            return self.inner == other
        else:
            return False

    def __hash__(self):
        return self.inner.__hash__()
