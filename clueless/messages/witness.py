from __future__ import annotations

from typing import Union, Dict

from enum import IntEnum, auto
from clueless.error import ApiError

class WitnessType(IntEnum):
    ROOM = 0
    CHARACTER = auto()
    WEAPON = auto()

    @classmethod
    def deserialize(cls, val: Union[str, int]) -> WitnessType:
        # pylint: disable=missing-function-docstring
        if isinstance(val, int):
          return WitnessType(val)
        try:
            intval: int = int(val)
            return WitnessType(intval)
        except ValueError:
            raise ApiError(f"invalid witness type: {val}")
