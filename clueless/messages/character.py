"""
Character base type for use in the backend logic and sent over the API.
"""
from __future__ import annotations

from enum import IntEnum
from typing import Type
from clueless.error import ApiError
from clueless.messages.serialize import MessageSerialize, TMessageSerialize

_CHARACTER_NAMES = [
  "Colonel Mustard",
  "Miss Scarlet",
  "Professor Plum",
  "Mr. Green",
  "Mrs. White",
  "Mrs. Peacock"
]


@MessageSerialize.register
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

    def serialize(self) -> str:
        # pylint: disable=missing-function-docstring
        return f'{self._string_name}'

    @classmethod
    def deserialize(cls: Type[TMessageSerialize], val: str) -> Character: # type: ignore
        # pylint: disable=missing-function-docstring
        return Character._from_name(val)
