"""
Abstract Base Class for serializeable messages
"""
from typing import TypeVar, Type, Union, Dict, List
from abc import ABC, abstractmethod

TMessageSerialize = TypeVar("TMessageSerialize", bound = "MessageSerialize")

SerializeValue = Union[str, int, List, Dict]

class MessageSerialize(ABC):
    """
    A Message or component of a message that can be serialized or deserialized
    """
    @classmethod
    def __subclasshook__(cls, subclass):
        return (hasattr(subclass, 'serialize') and
                callable(subclass.serialize) and
                hasattr(subclass, 'deserialize') and
                callable(subclass.deserialize))

    @abstractmethod
    def serialize(self) -> SerializeValue:
        """
        Serialize the value to a valid JSON serializeable value
        """

    @classmethod
    @abstractmethod
    def deserialize(cls: Type[TMessageSerialize], val: SerializeValue) -> TMessageSerialize:
        """
        Deserialize the value from a JSON value
        """
