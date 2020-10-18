from __future__ import annotations

from typing import Type, Union, Optional
from clueless.error import ApiError
from clueless.messages.serialize import MessageSerialize, TMessageSerialize
from clueless.messages.room import Room
from clueless.messages.hallway import Hallway

class Location(MessageSerialize):
    def __init__(self, inner: Union[Room, Hallway]):
        self.inner = inner

    def as_room(self) -> Optional[Room]:
        if isinstance(self.inner, Room):
            return self.inner
        else:
            return None

    def as_hallway(self) -> Optional[Hallway]:
        if isinstance(self.inner, Hallway):
            return self.inner
        else:
            return None

    def _string_name(self) -> str:
        self.inner._string_name()

    def serialize(self) -> int:
        # pylint: disable=missing-function-docstring
        return self.inner.serialize()

    @classmethod
    def deserialize(cls: Type[TMessageSerialize], val: str) -> Location: # type: ignore
        # pylint: disable=missing-function-docstring
        try:
            intval = int(val)
            if intval < 10:
                inner = Room.deserialize(val)
                return Location(inner)
            else:
                inner = Hallway.deserialize(val)
                return Location(inner)
        except ValueError:
            pass

        try:
            inner = Room.deserialize(val)
            return Location(inner)
        except ApiError:
            pass

        inner = Hallway.deserialize(val)
        return Location(inner)


    def __str__(self) -> str:
        return f'Location({self.inner!r})'

    def __eq__(self, other: Union[Location, Room, Hallway]) -> bool:
        if other.__class__ == Location:
            return self.inner == other.inner
        elif (isinstance(other, Room) and isinstance(self.inner, Room)) or \
                (isinstance(other, Hallway) and isinstance(self.inner, Hallway)):
            return self.inner == other
        else:
            return False

    def __hash__(self):
        return self.inner.__hash__()
