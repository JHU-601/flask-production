import json
from clueless.messages.serialize import deserialize_message, serialize_message
from clueless.messages.server import *
from clueless.messages.client import *

'''
Message Serialized Test - Server to Client
'''

def test_server_Status():
    msg = serialize_message(json.dumps({'player': 0, 'location': 3}))
    assert isinstance(msg, Position)
    assert msg.character == Character.YELLOW
    assert msg.display_name == Room.LIBRARY
