"""
Weapon base type for backend logic and API.
"""
from __future__ import annotations

from enum import IntEnum, auto
from typing import Type, Set
from clueless.error import ApiError
from clueless.messages.serialize import MessageSerialize, TMessageSerialize

@MessageSerialize.register
class Weapon(IntEnum):
    """
    Enumeration of a unique weapon in the game
    """
    ROPE = 0
    PIPE = auto()
    KNIFE = auto()
    WRENCH = auto()
    CANDLESTICK = auto()
    REVOLVER = auto()

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
            raise ApiError(f'Invalid weapon ordinal {ordinal}') from ValueError

    def serialize(self) -> int:
        # pylint: disable=missing-function-docstring
        return self.value

    @classmethod
    def deserialize(cls: Type[TMessageSerialize], val: str) -> Room: # type: ignore
        # pylint: disable=missing-function-docstring
        try:
            intval = int(val)
            return Weapon._from_ordinal(intval)
        except ValueError:
            return Weapon._from_name(val)
