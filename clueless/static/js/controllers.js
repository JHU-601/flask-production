WEBSOCKET_URL = 'ws://' + window.location.hostname + ':8081';

class GameState {
  constructor() {
    this.usersJoined = 0;
    this.players = [];
    this.localPlayer = null;
    this.chosenPlayer = null;
    this.playerTurn = null;
    this.witnessItems = [null, null, null];
    this.gameid = null;
    this.lastSuggestion = null;
    this.registered = [];
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
    } else if (message.message == 'Suggestion') {
        this.handleMsgSuggestion(message);
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
    } else if (message.message == 'PlayerTurn') {
      this.handleMsgPlayerTurn(message);
    } else if (message.message == 'SuggestionQuery') {
      this.handleMsgSuggestionQuery(message);
    }
    this.updateDisplay();
  }
  sendMessage(message) {
    console.log('Sent message.', message);
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
  sendComplete() {
    var message = {
      message: 'Complete',
    };
    this.sendMessage(message);
  }
  sendSuggestionResponse(id, type) {
    var message;
    if (id == null || type == null) {
      message = {
        message: 'SuggestionResponse',
      };
    } else {
      message = {
        message: 'SuggestionResponse',
        witness: id,
        type: type,
      };
    }
    this.sendMessage(message);
  }
  // Individual message handlers
  handleMsgJoined(message) {
    this.gamePanel.showScreen2();
    this.gameState.gameid = message.id;
    for (var i = 0; i < message.registered.length; i++) {
      var p = new Player(message.registered[i].character, message.registered[i].name);
      this.gameState.players.push(p);
    }
  }
  handleMsgUserJoined(message) {
    this.gamePanel.showToast('A new user has entered the lobby.');
  }
  handleMsgRegistration(message) {
    var p = new Player(message.character, message.display_name);
    if (p.character.id == this.gameState.chosenPlayer) {
      this.gameState.localPlayer = p;
    }
    this.gameState.players.push(p);
  }
  handleMsgWitness(message) {
    this.gameState.witnessItems[0] = {
      id: message.item1,
      type: message.type1,
    };
    this.gameState.witnessItems[1] = {
      id: message.item2,
      type: message.type2,
    };
    this.gameState.witnessItems[2] = {
      id: message.item3,
      type: message.type3,
    };
    // Put all players in starting positions
    for (var i = 0; i < this.gameState.players.length; i++) {
      var curPlayer = this.gameState.players[i];
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
  handleMsgSuggestion(message) {
    this.gamePanel.showToast('Suggestion: ' + JSON.stringify(message));
    this.gameState.lastSuggestion = {
      player: message.player,
      room: message.room,
      weapon: message.weapon,
      suspect: message.suspect,
    };
  }
  handleMsgSuggestionWitness(message) {
    var player = this.gameState.players[message.character];
    var item = WitnessItem_fromType(message.witness, message.type);
    this.gamePanel.suggestionPanel.update(player, item);
  }
  handleMsgSuggestionStatus(message) {
    this.gamePanel.suggestionQueryPanel.hide();
  }
  handleMsgAccusation(message) {
    this.gamePanel.showToast('Accusation: ' + JSON.stringify(message));
  }
  handleMsgWinner(message) {
    this.gamePanel.showToast('Winner: ' + JSON.stringify(message));
  }
  handleMsgDisqualified(message) {
    this.gamePanel.showToast('Disqualified: ' + JSON.stringify(message));
  }
  handleMsgServerChat(message) {
    this.gamePanel.showToast('ServerChat: ' + JSON.stringify(message));
  }
  handleMsgStatus(message) {
    this.gamePanel.showModal('Error', message.error);
    this.gamePanel.suggestionPanel.hide();
  }
  handleMsgPlayerTurn(message) {
    this.gameState.playerTurn = message.player;
    var player = this.gameState.players[message.player];
    if (player.character.id == this.gameState.localPlayer.character.id) {
      $('#turn-indicator').html('Your turn!');
      $('#turn-indicator').addClass('yourturn');
    } else {
      $('#turn-indicator').html(player.display_name + '\'s turn');
      $('#turn-indicator').removeClass('yourturn');
    }

  }
  handleMsgSuggestionQuery(message) {
    this.gamePanel.suggestionQueryPanel.show(message.player, message.room, message.weapon, message.suspect);
  }
}
