"""
Abstract Base Class for serializeable messages
"""

from clueless.messages.location import Hallway, Room, Location
from clueless.messages.character import Character
from clueless.messages.weapon import Weapon
import clueless.messages.server
import clueless.messages.client

import json

import sys
import inspect

DESERIALIZE = dict(inspect.getmembers(sys.modules[clueless.messages.client.__name__], inspect.isclass))

SERIALIZE = set([name for (name, _) in inspect.getmembers(sys.modules[clueless.messages.server.__name__], inspect.isclass)])

class MessageEncoder(json.JSONEncoder):
    def default(self, item):
        if isinstance(item, Hallway) or \
              isinstance(item, Character) or \
              isinstance(item, Room):
            return item.value
        elif isinstance(item, Location):
            return item.inner.value
        elif item.__class__.__name__ in SERIALIZE:
            value = item.__dict__
            value['message'] = item.__class__.__name__
            return value
        else:
            return super().default(item)

def decode_message(dct):
    if 'message' in dct and dct['message'] in DESERIALIZE:
        func = DESERIALIZE[dct['message']]
        del dct['message']
        return func(**dct)
    return dct

def deserialize_message(data):
    return json.loads(data, object_hook=decode_message)

def serialize_message(msg) -> str:
    return json.dumps(msg, cls=MessageEncoder)
