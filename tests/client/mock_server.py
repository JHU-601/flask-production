#!/usr/bin/env python

import os

import asyncio
import websockets
import json

from aiohttp import web

REPO_ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
STATIC_DIR = os.path.join(REPO_ROOT, 'clueless', 'static')

async def handleRegister(socket, msg):
    await socket.send('Received register command')

async def handleMove(socket, msg):
    await socket.send('Received move command to position %s' % msg['position'])

async def handleSuggest(socket, msg):
    await socket.send('Received suggest command to room %s' % msg['room'])

async def hello(socket, path):
    while True:
        msg_str = await socket.recv()
        msg = json.loads(msg_str)
        if msg['message'] == 'Register':
            await handleRegister(socket, msg)
        elif msg['message'] == 'Move':
            await handleMove(socket, msg)
        elif msg['message'] == 'Suggest':
            await handleSuggest(socket, msg)
        else:
            await socket.send('Unrecognized message')

@asyncio.coroutine
def index(request):
    return web.FileResponse(os.path.join(REPO_ROOT, 'clueless', 'static', 'index.html'))
@asyncio.coroutine
def gameroom(request):
    return web.FileResponse(os.path.join(REPO_ROOT, 'clueless', 'static', 'gameroom.html'))
@asyncio.coroutine
def other(request):
    respath = os.path.join(REPO_ROOT, 'clueless', 'static', request.path[1:])
    if os.path.exists(respath):
        return web.FileResponse(respath)
    else:
        raise web.HTTPNotFound()


print('Serving on localhost:8080 (web) and localhost:8081 (ws)')
start_server = websockets.serve(hello, "localhost", 8081)

app = web.Application()
app.router.add_route('GET', '/', index)
app.router.add_route('GET', '/gameroom', gameroom)
app.router.add_route('GET', '/{tail:.*}', other)

loop = asyncio.get_event_loop()
f = loop.create_server(app.make_handler(), '0.0.0.0', 8080)
loop.run_until_complete(start_server)
loop.run_until_complete(f)
asyncio.get_event_loop().run_forever()
