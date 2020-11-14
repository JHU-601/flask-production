WEBSOCKET_URL = 'ws://localhost:8081'; // TODO update to server / something dynamic

class GameState {
  constructor() {
    this.players = [];
    this.localPlayer = null;
    this.witnessCharacter = null;
    this.witnessRoom = null;
    this.witnessWeapon = null;
    this.gameid = null;
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
    if (message.message == 'Joined') {
      this.handleMsgJoined(message);
    } else if (message.message == 'Registration') {
      this.handleMsgRegister(message);
    }
    this.updateDisplay();
  }
  sendMessage(message) {
    this.socket.send(JSON.stringify(message));
  }

  // Individual message senders
  sendCreateGame() {
    var message = {
      message: 'CreateGame'
    };
    this.sendMessage(message);
  }
  sendRegister(character, display_name) {
    var message = {
      message: 'Register',
      character: character,
      display_name: display_name,
    };
    this.sendMessage(message);
  }
  // Individual message handlers
  handleMsgJoined(message) {
    this.gamePanel.showScreen2();
    this.gameState.gameid = message.id;
  }
  handleMsgRegister(message) {
    this.gameState.players.push(new Player(message.character, message.display_name));
  }
}
