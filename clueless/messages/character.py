"""
Character base type for use in the backend logic and sent over the API.
"""
from __future__ import annotations

from enum import IntEnum
from typing import Union
from clueless.error import ApiError
from clueless.messages.location import Hallway

_CHARACTER_NAMES = [
  "Colonel Mustard",
  "Miss Scarlet",
  "Professor Plum",
  "Mr. Green",
  "Mrs. White",
  "Mrs. Peacock"
]


class Character(IntEnum):
    """
    Enumeration of characters.
    """
    YELLOW = 0
    RED = 1
    PURPLE = 2
    GREEN = 3
    WHITE = 4
    BLUE = 5

    @property
    def _string_name(self) -> str:
        try:
            return _CHARACTER_NAMES[self.__int__()]
        except IndexError:
            raise ApiError(f'Invalid character {self}. This should be impossible') from IndexError

    @classmethod
    def _from_name(cls, val: str) -> Character:
        try:
            return cls(_CHARACTER_NAMES.index(val))
        except ValueError:
            raise ApiError(f'Invalid character name {val}') from ValueError

    @classmethod
    def _from_ordinal(cls, ordinal: int) -> Character:
        try:
            return cls(ordinal)
        except ValueError:
            raise ApiError(f'Invalid character ordinal {ordinal}') from ValueError

    def serialize(self) -> int:
        # pylint: disable=missing-function-docstring
        return self.value

    @classmethod
    def deserialize(cls, val: Union[str, int]) -> Character:
        # pylint: disable=missing-function-docstring
        if isinstance(val, int):
          return Character._from_ordinal(val)
        try:
            intval: int = int(val)
            return Character._from_ordinal(intval)
        except ValueError:
            return Character._from_name(val)

    @property
    def first_location(self) -> Hallway:
        if self == Character.YELLOW:
            return Hallway.LOUNGE_DINING
        elif self == Character.RED:
            return Hallway.HALL_LOUNGE
        elif self == Character.PURPLE:
            return Hallway.STUDY_LIBRARY
        elif self == Character.GREEN:
            return Hallway.CONSERVATORY_BALLROOM
        elif self == Character.WHITE:
            return Hallway.BALLROOM_KITCHEN
        elif self == Character.BLUE:
            return Hallway.LIBRARY_CONSERVATORY
