WEBSOCKET_URL = 'ws://' + window.location.hostname + ':8081';

class GameState {
  constructor() {
    this.usersJoined = 0;
    this.players = [null, null, null, null, null, null];
    this.localPlayer = null;
    this.chosenPlayer = null;
    this.playerTurn = null;
    this.witnessItems = [null, null, null];
    this.gameid = null;
    this.lastSuggestion = null;
    this.chat_log = [];
    this.has_unread_chats = false;
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

    // Update when we re-focus to clear chat notiications
    var that = this;
    window.onfocus = function() {
      that.updateDisplay();
    }
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
    } else if (message.message == 'ChatMessage') {
      this.handleMsgChatMessage(message);
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
    // Update gamestate - move the suggested player
    this.gameState.players[message.suspect].character.position = message.room;
    this.updateDisplay();
  }
  sendAccuse(room, suspect, weapon) {
    var message = {
      message: 'Accuse',
      room: room,
      suspect: suspect,
      weapon: weapon,
    };
    this.sendMessage(message);
    // Update gamestate - move the accused player
    this.gameState.players[message.suspect].character.position = message.room;
    this.updateDisplay();
  }
  sendChat(message, to) {
    var message = {
      message: 'Chat',
      text: message,
    };
    if (to.length > 0) {
      message.to = to;
    }
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
      this.gameState.players[p.character.id] = p;
    }
    this.gamePanel.showToast('Welcome!');
  }
  handleMsgUserJoined(message) {
    this.gamePanel.showToast('A new user has entered the lobby.');
  }
  handleMsgRegistration(message) {
    var p = new Player(message.character, message.display_name);
    if (p.character.id == this.gameState.chosenPlayer) {
      this.gameState.localPlayer = p;
      document.title += " (" + p.display_name + ")";
    }
    this.gameState.players[p.character.id] = p;
    this.gamePanel.showToast(p.display_name + ' has registered.');
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
    var item1 = WitnessItem_fromType(message.item1, message.type1);
    var item2 = WitnessItem_fromType(message.item2, message.type2);
    var item3  = WitnessItem_fromType(message.item3, message.type3);
    this.gamePanel.showScreen3();
    this.gamePanel.showToast('The game has started. Your witness items are: ' + item1.name + ', ' + item2.name + ', ' + item3.name);
  }
  handleMsgPosition(message) {
    // Update localPlayer if needed
    if (message.player == this.gameState.localPlayer.character.id) {
      this.gameState.localPlayer.character.position = message.location;
    }
    // Find and update the right player
    this.gameState.players[message.player].character.position = message.location;
    // I don't think a toast is needed for this since you can see the move happen, but we could always add one.
  }
  handleMsgSuggestion(message) {
    // Get suggesting player by character id
    var player = gameHub.gameState.players[message.player];
    var room = WitnessItem_fromType(message.room, WitnessType.ROOM);
    var suspect = WitnessItem_fromType(message.suspect, WitnessType.CHARACTER);
    var weapon  = WitnessItem_fromType(message.weapon, WitnessType.WEAPON);

    var msg = player.display_name + ' made a suggestion: ' + suspect.name + ' in ' + room.name + ' with the ' + weapon.name;

    this.gamePanel.showToast(msg);
    this.gameState.lastSuggestion = {
      player: message.player,
      room: message.room,
      weapon: message.weapon,
      suspect: message.suspect,
    };
    // Update gamestate - move the suggested player
    this.gameState.players[message.suspect].character.position = message.room;
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
    // Get which player has won by character id
    var player = gameHub.gameState.players[message.player];
    var room = WitnessItem_fromType(message.room, WitnessType.ROOM);
    var suspect = WitnessItem_fromType(message.suspect, WitnessType.CHARACTER);
    var weapon  = WitnessItem_fromType(message.weapon, WitnessType.WEAPON);

    var msg = player.display_name + ' made an accusation: ' + suspect.name + ' in ' + room.name + ' with the ' + weapon.name;
    this.gamePanel.showToast(msg);
    // Update gamestate - move the accused player
    this.gameState.players[message.suspect].character.position = message.room;
  }
  handleMsgWinner(message) {
    // Get which player has won by character id
    var player = gameHub.gameState.players[message.player];
    var msg = player.display_name + " has won!";
    this.gamePanel.showToast(msg);
    this.gamePanel.showModal('Winner!', msg);
  }
  handleMsgDisqualified(message) {
    // Get which player was disqualified by character id
    var player = gameHub.gameState.players[message.player];
    var isLocalPlayer = (player.character.id == gameHub.gameState.localPlayer.character.id);

    if (isLocalPlayer) {
      var msg = "You have been disqualified.";
      this.gamePanel.showToast(msg);
      this.gamePanel.showModal('Disqualified!', msg);
    } else {
      var msg = player.display_name + " has been disqualified.";
      this.gamePanel.showToast(msg);
    }
  }
  handleMsgChatMessage(message) {
    this.gameState.chat_log.push({
      'from': this.gameState.players[message.from_player].display_name,
      'message': message.text,
      'private': message.private,
      'date': new Date(),
    });
    // New message arrived!
    this.gameState.has_unread_chats = true;
  }
  handleMsgStatus(message) {
    this.gamePanel.showModal('Error', message.error);
    this.gamePanel.showToast(message.error);
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
