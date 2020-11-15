WEBSOCKET_URL = 'ws://localhost:8081'; // TODO update to server / something dynamic

class GameState {
  constructor() {
    this.players = [];
    this.localPlayer = null;
    this.chosenPlayer = null;
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
    console.log('Received message.', message);
    if (message.message == 'Joined') {
      this.handleMsgJoined(message);
    } else if (message.message == 'Registration') {
      this.handleMsgRegistration(message);
    } else if (message.message == 'WitnessItems') {
      this.handleMsgWitnessItems(message);
    } else if (message.message == 'Position') {
      this.handleMsgPosition(message);
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
  sendJoinGame(id) {
    var message = {
      message: 'JoinGame',
      id: id,
    }
    this.sendMessage(message);
  }
  sendRegister(character, display_name) {
    var message = {
      message: 'Register',
      character: character,
      display_name: display_name,
    };
    this.gameState.chosenPlayer = parseInt(character);
    this.sendMessage(message);
  }
  sendMove(position) {
    var message = {
      message: 'Move',
      position: position,
    };
    this.sendMessage(message);
  }
  sendSuggest(room, suspect, weapon) {
    var message = {
      room: room,
      suspect: suspect,
      weapon: weapon,
    };
    this.sendMessage(message);
  }
  // Individual message handlers
  handleMsgJoined(message) {
    this.gamePanel.showScreen2();
    this.gameState.gameid = message.id;
  }
  handleMsgRegistration(message) {
    var p = new Player(message.character, message.display_name);
    if (p.character.id == this.gameState.chosenPlayer) {
      this.gameState.localPlayer = p;
    }
    this.gameState.players.push(p);
  }
  handleMsgWitnessItems(message) {
    this.gameState.witnessCharacter = message.character;
    this.gameState.witnessRoom = message.room;
    this.gameState.witnessWeapon = message.weapon;
    // Put all players in starting positions
    for (var i = 0; i < this.gameState.players.length; i++) {
      var curPlayer = this.gameState.players[i];
      // console.log(this.gameState);
    }
    this.gamePanel.showScreen3();
  }
  handleMsgPosition(message) {
    // Update localPlayer if needed
    if (message.player == this.gameState.localPlayer.character.id) {
      this.gameState.localPlayer.character.position = message.location;
    }
    // Find and update the right player
    for (var i = 0; i < this.gameState.players.length; i++) {
      if (this.gameState.players[i].character.id == message.player) {
        this.gameState.players[i].character.position = message.location;
      }
    }
  }
}
