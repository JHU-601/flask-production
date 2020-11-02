"""
Weapon base type for backend logic and API.
"""
from __future__ import annotations

from enum import IntEnum, auto
from typing import Union, Set
from clueless.error import ApiError

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
    def _from_name(cls, val: str) -> Weapon:
        try:
            return cls[val.upper()]
        except KeyError:
            raise ApiError(f'Invalid room name {val}') from KeyError

    @classmethod
    def _from_ordinal(cls, ordinal: int) -> Weapon:
        try:
            return cls(ordinal)
        except ValueError:
            raise ApiError(f'Invalid weapon ordinal {ordinal}') from ValueError

    def serialize(self) -> int:
        # pylint: disable=missing-function-docstring
        return self.value

    @classmethod
    def deserialize(cls, val: Union[str, int]) -> Weapon:
        # pylint: disable=missing-function-docstring
        if isinstance(val, int):
            return Weapon._from_ordinal(val)
        try:
            intval: int = int(val)
            return Weapon._from_ordinal(intval)
        except ValueError:
            return Weapon._from_name(val)
