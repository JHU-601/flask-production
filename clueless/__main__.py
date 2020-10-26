#!/usr/bin/env python

import os
import random
import logging
import asyncio
import websockets
import json

from aiohttp import web

from .state import Player

REPO_ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
STATIC_DIR = os.path.join(REPO_ROOT, 'clueless', 'static')


async def websockopen(socket, path):
    # Listen for messages
    player = Player(socket)
    await player.user_loop()
    """
    logger = logging.getLogger('game_logger')
    while True:
        msg_str = await player.socket.recv()
        logger.debug(f'got message {msg_str}')
        try:
            msg = deserialize_message(msg_str)
        except ApiError as e:
            logger.error(f'message error {e}')
            await player.send_message(Status(f'error deserializing message: {e}'))
        try:
            await player.dispatch_message(msg)
        except ApiError as e:
            logger.error(f'message error {e}')
            await player.send_message(Status(f'error handling message: {e}'))
    """

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
