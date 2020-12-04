#!/usr/bin/env python

"""
from clueless.app import run_app
import asyncio

run_app()
"""
import os
import random
import logging
import asyncio
import websockets
import json

from aiohttp import web
from dotenv import load-dotenv

from .state import Player

load_dotenv # load environment vars from .env

REPO_ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
STATIC_DIR = os.path.join(REPO_ROOT, 'clueless', 'static')

if os.environ.get('CLUELESS_ENVIRONMENT') == 'production':
    PORT = os.environ.get('CLUELESS_PORT')
    PORT_WS = os.environ.get('CLUELESS_PORT_WS')
else:
    PORT = 8080
    PORT_WS = 8081

logging.basicConfig(level=logging.DEBUG)
[logging.getLogger(logger).setLevel(logging.ERROR) for logger in ("websockets.server", "websockets.protocol", "aiohttp.access")]
logger = logging.getLogger('server')
logger.setLevel(logging.DEBUG)

async def websockopen(socket, path):
    # Listen for messages
    logger.debug(f"User connected from {socket.remote_address}")
    player = Player(socket)
    await player.user_loop()

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
start_server = websockets.serve(websockopen, "localhost", PORT_WS)

app = web.Application()
app.router.add_route('GET', '/', index)
app.router.add_route('GET', '/gameroom', gameroom)
app.router.add_route('GET', '/{tail:.*}', other)

loop = asyncio.get_event_loop()
f = loop.create_server(app.make_handler(), '0.0.0.0', PORT)
loop.run_until_complete(start_server)
loop.run_until_complete(f)
asyncio.get_event_loop().run_forever()

