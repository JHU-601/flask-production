#!/usr/bin/env python

import os
import random

import asyncio
import websockets
import json

from aiohttp import web

REPO_ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
STATIC_DIR = os.path.join(REPO_ROOT, 'clueless', 'static')

# Dirty way of doing this
first_client = None

async def handleCreateGame(socket, msg):
    await socket.send(json.dumps({
        'message': 'Joined',
        'id': 'fakeid',
    }))

async def handleJoinGame(socket, msg):
    await socket.send(json.dumps({
        'message': 'Joined',
        'id': 'fakeid2',
    }))

async def handleRegister(socket, msg):
    await socket.send(json.dumps({
        'message': 'Registration',
        'character': msg['character'],
        'display_name': msg['display_name'],
    }))
    for i in range(6):
        if i != int(msg['character']):
            await asyncio.sleep(.1)
            await socket.send(json.dumps({'message': 'Registration','character': i,'display_name': 'rando' + str(i),}))

async def handleMove(socket, msg):
    await socket.send(json.dumps({
        'message': 'temp',
        'body': 'Received move command to position %s' % msg['position'],
    }))

async def handleSuggest(socket, msg):
    await socket.send(json.dumps({
        'message': 'temp',
        'body': 'Received suggest command to room %s' % msg['room'],
    }))

async def handleSuggestionResponse(socket, msg):
    await socket.send(json.dumps({
        'message': 'temp',
        'body': 'Received suggestion response, witness is %s' % msg['witness'],
    }))

async def handleAccuse(socket, msg):
    await socket.send(json.dumps({
        'message': 'temp',
        'body': 'Received accuse, room is %s' % msg['room'],
    }))

async def periodic_test_messages(socket):
    # Create game (after user has requested it)
    import string
    await socket.send(json.dumps(
        {
            'message': 'GameCreated',
            # 10 char long game id with random letters
            'id': ''.join([random.choice(string.ascii_letters) for x in range(0,10)]),
        }
    ))
    await asyncio.sleep(1)
    # Register a few people to join
    players = [{'character': 0, 'display_name': 'DJ Mustard'},
                {'character': 1, 'display_name': 'scarlet'},
                {'character': 2, 'display_name': 'dr. egg'},
                {'character': 3, 'display_name': 'sonic'},
                {'character': 4, 'display_name': 'spongebob'},
                {'character': 5, 'display_name': 'patrick'},]
    for i,p in enumerate(players):
        await socket.send(json.dumps(
            {
                'message': 'Registration',
                'character': p['character'],
                'display_name': p['display_name'],
            }
        ))
        await socket.send(json.dumps(
            {
                'message': 'Available',
                'characters': [x for x in range(i, 6)]
            }
        ))
        await asyncio.sleep(1)
    # we have enough - say each player's position and whose turn it is
    for i,p in enumerate(players):
        await socket.send(json.dumps(
            {
                'message': 'Position',
                'position': random.randint(0,20),
                'character': p['character'],
            }
        ))
    await socket.send(json.dumps(
        {
            'message': 'PlayerTurn',
            'character': random.randint(0,5),
        }
    ))
    await socket.send(json.dumps(
        {
            'message': 'Witness',
            'room': random.randint(0,8),
            'character': random.randint(0,8),
            'weapon': random.randint(0,8),
        }
    ))

    await socket.send(json.dumps(
        {
            'message': 'Suggestion',
            'character': random.randint(0,5),
            'room': random.randint(0,20),
            'suspect': random.randint(0,5),
            'weapon': random.randint(0,8),
        }
    ))
    await asyncio.sleep(1)
    await socket.send(json.dumps(
        {
            'message': 'SuggestionQuery',
        }
    ))
    await asyncio.sleep(1)
    await socket.send(json.dumps(
        {
            'message': 'SuggestionStatus',
            'character': random.randint(0,5),
            'status': random.choice(['denied', 'witnessed'])
        }
    ))
    await asyncio.sleep(1)
    await socket.send(json.dumps(
        {
            'message': 'SuggestionWitness',
            'character': random.randint(0,5),
            'witness': random.randint(0,10),
        }
    ))
    await asyncio.sleep(1)
    await socket.send(json.dumps(
        {
            'message': 'Accusation',
            'character': random.randint(0,5),
            'room': random.randint(0,8),
            'suspect': random.randint(0,5),
            'weapon': random.randint(0,5),
        }
    ))
    await asyncio.sleep(1)
    for i in range(5, 0, -1):
        await socket.send(json.dumps(
            {
                'message': 'Disqualified',
                'character': i,
            }
        ))
        await asyncio.sleep(1)
    # you win!
    await socket.send(json.dumps(
        {
            'message': 'Winner',
            'character': 0,
        }
    ))

async def websockopen(socket, path):
    # asynchronously send messages at random
    # asyncio.create_task(periodic_test_messages(socket))
    global first_client
    first_client = socket # TODO handle multiple clients
    # Listen for messages
    while True:
        msg_str = await socket.recv()
        print('Server received client message:', msg_str)
        msg = json.loads(msg_str)
        if msg['message'] == 'CreateGame':
            await handleCreateGame(socket, msg)
        elif msg['message'] == 'JoinGame':
            await handleJoinGame(socket, msg)
        elif msg['message'] == 'Register':
            await handleRegister(socket, msg)
        elif msg['message'] == 'Move':
            await handleMove(socket, msg)
        elif msg['message'] == 'Suggest':
            await handleSuggest(socket, msg)
        elif msg['message'] == 'SuggestionResponse':
            await handleSuggestionResponse(socket, msg)
        elif msg['message'] == 'Accuse':
            await handleAccuse(socket, msg)
        else:
            await socket.send('Unrecognized message')

async def index(request):
    return web.FileResponse(os.path.join(REPO_ROOT, 'clueless', 'static', 'index.html'))

async def gameroom(request):
    return web.FileResponse(os.path.join(REPO_ROOT, 'clueless', 'static', 'gameroom.html'))

async def other(request):
    respath = os.path.join(REPO_ROOT, 'clueless', 'static', request.path[1:])
    if os.path.exists(respath):
        return web.FileResponse(respath)
    else:
        raise web.HTTPNotFound()


print('Serving on localhost:8080 (web) and localhost:8081 (ws)')
start_server = websockets.serve(websockopen, "localhost", 8081)

app = web.Application()
app.router.add_route('GET', '/', index)
app.router.add_route('GET', '/gameroom', gameroom)
app.router.add_route('GET', '/{tail:.*}', other)

loop = asyncio.get_event_loop()
f = loop.create_server(app.make_handler(), '0.0.0.0', 8080)
loop.run_until_complete(start_server)
loop.run_until_complete(f)
asyncio.get_event_loop().run_forever()
