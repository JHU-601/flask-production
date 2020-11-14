WEBSOCKET_URL = 'ws://localhost:8081'; // TODO update to server / something dynamic

class GameState {
  constructor() {
    this.players = [];
    this.localPlayer = null;
    this.witnessCharacter = null;
    this.witnessRoom = null;
    this.witnessWeapon = null;
  }
}

class GameHub {
  constructor() {
    // set up child instances
    this.gameState = new GameState();
    this.gamePanel = new GamePanel('game-panel');
    // set up websockets
    this.socket = new WebSocket(WEBSOCKET_URL);
    this.socket.onopen = function(event) {
      console.log('connected to server');
    };
    this.socket.onmessage = function(event) {
      this.receiveMessage(JSON.parse(event.data));
    }.bind(this);
    // do initial display update
    this.updateDisplay();
  }

  updateDisplay() {
    this.gamePanel.display(this.gameState);
  }

  receiveMessage(message) {
    console.log('received a message!!!!!!', message);
    if (message.message == 'Joined') {
      this.handleMsgJoined(message);
    }
  }
  sendMessage(message) {
    console.log('sending a message!!!!!!', message);
    this.socket.send(JSON.stringify(message));
  }

  // Individual message senders
  sendCreateGame() {
    var message = {
      message: 'CreateGame'
    };
    this.sendMessage(message);
  }
  // Individual message handlers
  handleMsgJoined() {
    alert('message joined!')
  }
}
