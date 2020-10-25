"""
Abstract Base Class for serializeable messages
"""

from clueless.messages.location import Hallway, Room, Location
from clueless.messages.character import Character
from clueless.messages.weapon import Weapon
from clueless.messages.server import *
from clueless.messages.client import *

import json

MESSAGE_NAMES = {
    'register': Register,
    'move': Move,
    'suggest': Suggest,
    'suggestion-response': SuggestionResponse,
    'accuse': Accuse,
    "status" : Status,
    "available" : Available,
    "status" : Registration,
    "witness" : Witness,
    "position" : Position,
    "player-turn" : PlayerTurn,
    "suggestion" : Suggestion,
    "suggestion-query" : SuggestionQuery,
    "suggestion-status" : SuggestionStatus,
    "suggestion-witness" : SuggestionWitness,
    "accusation" : Accusation,
    "winner" : Winner,
    "disqualified" : Disqualified,
}

class MessageEncoder(json.JSONEncoder):
    def default(self, item):
        if isinstance(item, Hallway) or \
              isinstance(item, Character) or \
              isinstance(item, Room) or \
              isinstance(item, Location):
            return item.value
        elif hasattr(item, 'message_name') and callable(item.message_name):
            value = item.__dict__
            value['message'] = item.message_name()
            return value
        else:
            return super().default(item)


def decode_message(dct):
    if 'message' in dct and dct['message'] in MESSAGE_NAMES:
        func = MESSAGE_NAMES[dct['message']]
        del dct['message']
        return func(**dct)
    return dct

def deserialize_message(data):
    json.loads(data, class_hook=decode_message)

def serialize_message(msg) -> str:
    json.dumps(msg, cls=MessageEncoder)
