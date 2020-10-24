import os

import cherrypy
from cherrypy.lib.static import serve_file
from ws4py.server.cherrypyserver import WebSocketPlugin, WebSocketTool
from ws4py.websocket import WebSocket

REPO_ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
STATIC_DIR = os.path.join(REPO_ROOT, 'clueless', 'static')

class CluelessTestServer:
    def __init__(self):
        pass
    @cherrypy.expose
    def default(self, tag):
        return self.index()
    @cherrypy.expose
    def index(self):
        """Render the index page
        url: '/'
        """
        return serve_file(os.path.join(STATIC_DIR, 'index.html'))
    @cherrypy.expose
    def gameroom(self):
        """Render the gameroom page
        url: '/gameroom'
        """
        return serve_file(os.path.join(STATIC_DIR, 'gameroom.html'))

class WebSocketHandler(WebSocket):
    """WebSocketHandler
    This class will be instantiated to represent any incoming WebSocket
    connections.
    It will allow us to have a very fast way to push/pull data to and from the
    client's browser.
    """
    def opened(self):
        """This function is called when the WebSocket is opened."""
        self.running = True
    def close(self, code=1000, reason=''):
        self.running = False
    def received_message(self, data):
        """This function is called whenever this WebSocket receives a message."""
        # Parse and act upon manual control message
        message = json.loads(str(data))
        self.send('I hear you.',str(data))

if __name__ == '__main__':
    WebSocketPlugin(cherrypy.engine).subscribe()
    cherrypy.tools.websocket = WebSocketTool()
    
    CHERRYPY_CONFIG = {
        '/': {
            # Auto-serve static assets like CSS, JS, and images
            'tools.staticdir.on': True,
            'tools.staticdir.dir': STATIC_DIR,
        },
        '/web_socket': {
            # WebSockets config
            'tools.websocket.on': True,
            'tools.websocket.handler_cls': WebSocketHandler, # This is our custom handler class
        }
    }
    cherrypy.quickstart(CluelessTestServer(), config=CHERRYPY_CONFIG)
