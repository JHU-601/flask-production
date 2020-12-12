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
from dotenv import load_dotenv

from .state import Player

load_dotenv() # load environment vars from .env

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

CONNECTED = {}
DROPPED = {}

def add_connection(ip, player):
    global CONNECTED
    if ip in CONNECTED:
        CONNECTED[ip].append(player)
    else:
        CONNECTED[ip] = [player]

async def get_disconnected(ip):
    if ip in CONNECTED:
        # try twice to wait for a potential timeout
        for _ in range(2):
            for player in CONNECTED[ip]:
                logger.debug(f"checking for disconnected user {player.display_name}: {player.socket.closed}")
                if player.socket.closed:
                    return player
            # sleep for a very short time to allow async msg to come in
            await asyncio.sleep(0.2)
    return None

async def websockopen(socket, path):
    # Listen for messages
    global CONNECTED
    global DROPPED

    addr = socket.remote_address
    ip = addr[0]
    logger.debug(f"User connected from {addr}")

    if ip in DROPPED:
        logger.debug(f"found disconnected user")
        player = DROPPED.pop(ip)
        await player.reconnect(socket)
        CONNECTED[ip] = player
    else:
        player = await get_disconnected(ip)
        if player is not None:
            player.reconnect(socket)
        else:
            player = Player(socket)
            add_connection(ip, player)

    try:
        await player.user_loop()
    except (websockets.exceptions.ConnectionClosedOK, websockets.exceptions.ConnectionClosedError):
        if player.game is not None and not player.game.complete:
            DROPPED[ip] = player
        else:
            disconnect_player(ip, player)


async def index(request):
    logger.debug(f"Serving index")
    return web.FileResponse(os.path.join(REPO_ROOT, 'clueless', 'static', 'index.html'))

async def gameroom(request):
    return web.FileResponse(os.path.join(REPO_ROOT, 'clueless', 'static', 'gameroom.html'))

async def other(request):
    respath = os.path.join(REPO_ROOT, 'clueless', 'static', request.path[1:])
    if os.path.exists(respath):
        return web.FileResponse(respath)
    else:
        raise web.HTTPNotFound()


logger.debug(f'Serving on localhost:{PORT} (web) and localhost:{PORT_WS} (ws)')
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

