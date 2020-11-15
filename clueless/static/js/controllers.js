WEBSOCKET_URL = 'ws://localhost:8081'; // TODO update to server / something dynamic

class GameState {
  constructor() {
    this.usersJoined = 0;
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
    } else if (message.message == 'UserJoined') {
      this.handleMsgUserJoined(message);
    } else if (message.message == 'Registration') {
      this.handleMsgRegistration(message);
    } else if (message.message == 'Witness') {
      this.handleMsgWitness(message);
    } else if (message.message == 'Position') {
      this.handleMsgPosition(message);
    } else if (message.message == 'SuggestionWitness') {
      this.handleMsgSuggestionWitness(message);
    } else if (message.message == 'SuggestionStatus') {
      this.handleMsgSuggestionStatus(message);
    } else if (message.message == 'Accusation') {
      this.handleMsgAccusation(message);
    } else if (message.message == 'Winner') {
      this.handleMsgWinner(message);
    } else if (message.message == 'Disqualified') {
      this.handleMsgDisqualified(message);
    } else if (message.message == 'ServerChat') {
      this.handleMsgServerChat(message);
    } else if (message.message == 'Status') {
      this.handleMsgStatus(message);
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
      player: this.gameState.localPlayer.character.id,
    };
    this.sendMessage(message);
  }
  sendSuggest(room, suspect, weapon) {
    var message = {
      message: 'Suggest',
      room: room,
      suspect: suspect,
      weapon: weapon,
    };
    this.sendMessage(message);
  }
  sendAccuse(room, suspect, weapon) {
    var message = {
      message: 'Accuse',
      room: room,
      suspect: suspect,
      weapon: weapon,
    };
    this.sendMessage(message);
  }
  sendChat(message) {
    var message = {
      message: 'Chat',
      body: message,
    };
    this.sendMessage(message);
  }
  // Individual message handlers
  handleMsgJoined(message) {
    this.gamePanel.showScreen2();
    this.gameState.gameid = message.id;
  }
  handleMsgUserJoined(message) {
    this.gamePanel.showModal('User Joined', 'New user has entered the lobby.');
  }
  handleMsgRegistration(message) {
    var p = new Player(message.character, message.display_name);
    if (p.character.id == this.gameState.chosenPlayer) {
      this.gameState.localPlayer = p;
    }
    this.gameState.players.push(p);
  }
  handleMsgWitness(message) {
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
  handleMsgSuggestionWitness(message) {
    this.gamePanel.showModal('Suggestion Witness', message);
  }
  handleMsgSuggestionStatus(message) {
    this.gamePanel.showModal('Suggestion Status', message);
  }
  handleMsgAccusation(message) {
    this.gamePanel.showModal('Accusation', message);
  }
  handleMsgWinner(message) {
    this.gamePanel.showModal('Winner', message);
  }
  handleMsgDisqualified(message) {
    this.gamePanel.showModal('Disqualified', message);
  }
  handleMsgServerChat(message) {
    this.gamePanel.showModal('Server Chat', message);
  }
  handleMsgStatus(message) {
    this.gamePanel.showModal('Status', 'An error occurred');
  }
}
