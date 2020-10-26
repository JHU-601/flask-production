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

async def handleRegister(socket, msg):
    await socket.send('Received register command')

async def handleMove(socket, msg):
    await socket.send('Received move command to position %s' % msg['position'])

async def handleSuggest(socket, msg):
    await socket.send('Received suggest command to room %s' % msg['room'])

async def handleSuggestionResponse(socket, msg):
    await socket.send('Received suggestion response, witness is %s' % msg['witness'])

async def handleAccuse(socket, msg):
    await socket.send('Received accuse, room is %s' % msg['room'])

async def periodic_test_messages(socket):
    while True:
        await socket.send(json.dumps(
            {
                'message': 'Available',
                'characters': [x for x in range(5) if random.getrandbits(1)]
            }
        ))
        await socket.send(json.dumps(
            {
                'message': 'Registration',
                'character': random.randint(0,5),
                'display_name': 'jimmy dean breakfast sausages',
            }
        ))
        await socket.send(json.dumps(
            {
                'message': 'Positions',
                'positions': {
                    'player0': random.randint(0,20),
                    'player1': random.randint(0,20),
                    'player2': random.randint(0,20),
                    'player3': random.randint(0,20),
                    'player4': random.randint(0,20),
                    'player5': random.randint(0,20),
                },
            }
        ))
        await socket.send(json.dumps(
            {
                'message': 'PlayerTurn',
                'is_player_turn': bool(random.getrandbits(1)),
            }
        ))
        await socket.send(json.dumps(
            {
                'message': 'Suggestion',
                'player': random.randint(0,20),
                'room': random.randint(0,20),
                'suspect': random.randint(0,20),
                'weapon': random.randint(0,20),
            }
        ))
        await socket.send(json.dumps(
            {
                'message': 'SuggestionQuery',
            }
        ))
        await socket.send(json.dumps(
            {
                'message': 'SuggestionStatus',
                'character': random.randint(0,5),
                'status': random.choice(['denied', 'witnessed'])
            }
        ))
        await socket.send(json.dumps(
            {
                'message': 'SuggestionWitness',
                'character': random.randint(0,5),
                'witness': random.randint(0,10),
            }
        ))
        await socket.send(json.dumps(
            {
                'message': 'Accusation',
                'player': random.randint(0,5),
                'room': random.randint(0,8),
                'suspect': random.randint(0,5),
                'weapon': random.randint(0,5),
            }
        ))
        await socket.send(json.dumps(
            {
                'message': 'Winner',
                'player': random.randint(0,5),
            }
        ))
        await socket.send(json.dumps(
            {
                'message': 'Disqualified',
                'player': random.randint(0,5),
            }
        ))
        await asyncio.sleep(1)

async def websockopen(socket, path):
    # asynchronously send messages at random
    asyncio.create_task(periodic_test_messages(socket))
    global first_client
    first_client = socket # TODO handle multiple clients
    # Listen for messages
    while True:
        msg_str = await socket.recv()
        print('I just received:',msg_str)
        msg = json.loads(msg_str)
        if msg['message'] == 'Register':
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
