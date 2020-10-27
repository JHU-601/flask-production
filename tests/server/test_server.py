import json
from clueless.messages.serialize import deserialize_message, serialize_message
from clueless.messages.server import *
from clueless.messages.client import *

'''
Message Serialized Test - Server to Client
'''
def test_server_Status():
    instance = Status("foo")

    msg = serialize_message(Status("foo"))
    assert msg == '{"message": "foo"}'


# def test_server_Position():

#     msg = serialize_message(Position(Character.YELLOW, Location(Room.KITCHEN)))
#     assert msg == '{"message": "Position", "player": 0, "location": 3}'
