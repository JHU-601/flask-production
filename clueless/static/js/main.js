// Clue-Less Main JavaScript File

class Player {
  constructor(character, display_name) {
    this.character = character;
    this.display_name = display_name;
    this.position = -1;
    this.disqualified = false;
  }
  to_string() {
    return 'Player(character=' + this.character + ', display_name=' + this.display_name + ', position: ' + this.position + ', disqualified: '+this.disqualified+')';
  }
}

WEBSOCKET_URL = 'ws://localhost:8081'; // TODO update to server / something dynamic
var socket;

var gameState = {
  players: [], // each player: location (int), disqualified (true/false)
  currentPlayerTurn: -1,
  localPlayer: 0, // indicates which character this client is playing as // TODO actually update this
  witnessItems: {
    room: null,
    character: null,
    weapon: null,
  }, // 3 witness items
  microstate: 'n/a',
};
var messagesReceived = 0;

function displayGameState() {
  $('#statePlayers').html('');
  for (var i = 0; i < gameState.players.length; i++) {
    $('#statePlayers').append(gameState.players[i].to_string());
    if (i < gameState.players.length - 1) $('#statePlayers').append(', ');
    $('#statePlayers').append('<br/>');
  }
  $('#stateCurrentPlayerTurn').html(gameState.currentPlayerTurn);
  $('#stateLocalPlayer').html(gameState.localPlayer);
  $('#stateWitnessItems').html(`room=${gameState.witnessItems.room} character=${gameState.witnessItems.character} weapon=${gameState.witnessItems.weapon}`);
  $('#stateMicrostate').html(gameState.microstate);
}

function logMessage(actor, data) {
  $('#txtMessages').prepend(messagesReceived + ' <b>'+actor+':</b> ' + data + '<br/>');
  messagesReceived++;
}

function handleMessage(data) {
  logMessage('Server', data);
  // Handle message received from server
  // TODO handle invalid message that cannot be parsed
  try {
    msg = JSON.parse(data);
  } catch(err) {
    console.log('Error parsing server message: ' + data);
    return;
  }

  if (msg.message == 'Available') {
  } else if (msg.message == 'Registration') {
    gameState.players.push(new Player(msg.character, msg.display_name));
  } else if (msg.message == 'Witness') {
    gameState.witnessItems.room = msg.room;
    gameState.witnessItems.character = msg.character;
    gameState.witnessItems.weapon = msg.weapon;
  } else if (msg.message == 'Position') {
    // Find player with the right id
    var foundPlayer;
    for (var i = 0; i < gameState.players.length; i++) {
      if (gameState.players[i].character == msg.character) {
        foundPlayer = gameState.players[i];
      }
    }
    // TODO validation
    foundPlayer.position = msg.position;
  } else if (msg.message == 'PlayerTurn') {
    gameState.currentPlayerTurn = msg.character;
  } else if (msg.message == 'Suggestion') {
    alert(`Suggestion! player=${msg.player} room=${msg.room} suspect=${msg.suspect} weapon=${msg.weapon}`);
  } else if (msg.message == 'SuggestionQuery') {
    alert(`SuggestionQuery!`);
  } else if (msg.message == 'SuggestionStatus') {
    alert(`SuggestionStatus! character=${msg.character} status=${msg.status}`);
  } else if (msg.message == 'SuggestionWitness') {
    alert(`SuggestionWitness! character=${msg.character} witness=${msg.witness}`);
  } else if (msg.message == 'Accusation') {
    alert(`Accusation! player=${msg.player} room=${msg.room} suspect=${msg.suspect} weapon=${msg.weapon}`);
  } else if (msg.message == 'Winner') {
    alert(`Winner! player=${msg.character}`);
  } else if (msg.message == 'GameCreated') {
    alert(`Game Created! game id=${msg.id}`);
  } else if (msg.message == 'Disqualified') {
    // Find player with the right id
    var foundPlayer;
    for (var i = 0; i < gameState.players.length; i++) {
      if (gameState.players[i].character == msg.character) {
        foundPlayer = gameState.players[i];
      }
    }
    // TODO validation
    foundPlayer.disqualified = true;
    alert(`Disqualified! player=${msg.character}`);
  } else {
    console.log('Unrecognized message received: ' + data);
  }

  displayGameState();
}

function handleBtnTestClick(e) {
  logMessage('Client', 'test message');
  socket.send('test message');
  console.log('sent test message to server');
}
function handleBtnCreateGameClick(e) {
  e.preventDefault(); // Don't submit the form & reload page
  var msg = {
    'message': 'CreateGame',
  };
  logMessage('Client', JSON.stringify(msg));
  socket.send(JSON.stringify(msg));
}
function handleBtnJoinGameClick(e) {
  e.preventDefault(); // Don't submit the form & reload page
  var msg = {
    'message': 'JoinGame',
    'id': $('#formJoinGame input[name=id]').val(),
  };
  logMessage('Client', JSON.stringify(msg));
  socket.send(JSON.stringify(msg));
}
function handleBtnRegisterClick(e) {
  e.preventDefault(); // Don't submit the form & reload page
  var msg = {
    'message': 'Register',
    'character': $('#formRegister input[name=character]:checked').val(),
    'display_name': $('#formRegister input[name=displayName]').val(),
  };
  logMessage('Client', JSON.stringify(msg));
  socket.send(JSON.stringify(msg));
}
function handleBtnMoveClick(e) {
  e.preventDefault();
  var msg = {
    'message': 'Move',
    'position': $('#formMove input[name=position]').val(),
  }
  logMessage('Client', JSON.stringify(msg));
  socket.send(JSON.stringify(msg));
}
function handleBtnSuggestClick(e) {
  e.preventDefault();
  var msg = {
    'message': 'Suggest',
    'room': $('#formSuggest input[name=room]').val(),
    'suspect': $('#formSuggest input[name=suspect]').val(),
    'weapon': $('#formSuggest input[name=weapon]').val(),
  }
  logMessage('Client', JSON.stringify(msg));
  socket.send(JSON.stringify(msg));
}
function handleBtnSuggestionResponseClick(e) {
  e.preventDefault();
  var msg = {
    'message': 'SuggestionResponse',
    'witness': $('#formSuggestionResponse input[name=witness]').val(),
  }
  logMessage('Client', JSON.stringify(msg));
  socket.send(JSON.stringify(msg));
}
function handleBtnAccuseClick(e) {
  e.preventDefault();
  var msg = {
    'message': 'Accuse',
    'room': $('#formAccuse input[name=room]').val(),
    'suspect': $('#formAccuse input[name=suspect]').val(),
    'weapon': $('#formAccuse input[name=weapon]').val(),
  }
  logMessage('Client', JSON.stringify(msg));
  socket.send(JSON.stringify(msg));
}

function initGameroom() {
  // our "main method" for the gameroom page
  $('#btnTest').click(function(e) {
    handleBtnTestClick(e);
  });
  $('#btnCreateGame').click(function(e) {
    handleBtnCreateGameClick(e);
  });
  $('#btnJoinGame').click(function(e) {
    handleBtnJoinGameClick(e);
  });
  $('#btnRegister').click(function(e) {
    handleBtnRegisterClick(e);
  });
  $('#btnMove').click(function(e) {
    handleBtnMoveClick(e);
  });
  $('#btnSuggest').click(function(e) {
    handleBtnSuggestClick(e);
  });
  $('#btnSuggestionResponse').click(function(e) {
    handleBtnSuggestionResponseClick(e);
  });
  $('#btnAccuse').click(function(e) {
    handleBtnAccuseClick(e);
  });
  socket = new WebSocket(WEBSOCKET_URL);
  socket.onopen = function(event) {
    console.log('connected to server');
  };
  socket.onmessage = function(event) {
    handleMessage(event.data);
  }
}

function initHomepage() {
  // our "main method" for the homepage
  console.log('on homepage');
  $('#btnStartGame').click(function() {
    $('#screen1').fadeOut();
    $('#screen2').fadeIn();
  });
  $('#btnCreateGame').click(function() {
    console.log('Creating game.');
    $('#screen2').fadeOut();
    $('#screen3').fadeIn();
  });
  $('#btnJoinGame').click(function() {
    var gameId = $('#txtGameId').val();
    console.log('Joining game: ' + gameId);
    $('#screen2').fadeOut();
    $('#screen3').fadeIn();
  });
}
//
// $(window).on('beforeunload', function () {
//      socket.close();
// });

$(document).ready(function() {
  // Main method
  if (window.location.pathname.includes('gameroom')) {
    initGameroom();
  } else {
    initHomepage();
  }
});



// const object functions as enum. Has multiple aliases
// Numbers are per the SRS
class Character {
  static DEFAULT = 0
  static YELLOW = 0
  static COLONEL_MUSTARD = 0

  static RED = 1
  static MISS_SCARLET = 1

  static PURPLE = 2
  static PROFESSOR_PLUM = 2

  static GREEN = 3
  static MR_GREEN = 3

  static WHITE = 4
  static MRS_WHITE = 4

  static BLUE = 5
  static MRS_PEACOCK = 5

  constructor(type) {
    this.type = type;
  }
};

class Weapon {
  static DEFAULT = 0
  static ROPE = 0
  static PIPE = 1
  static KNIFE = 2
  static WRENCH = 3
  static CANDLESTICK = 4
  static REVOLVER = 5

  constructor(type) {
    this.type = type;
  }
}

class Room {
  static DEFAULT = 0
  static STUDY = 0
  static HALL = 1
  static LOUNGE = 2
  static LIBRARY = 3
  static BILLIARD_ROOM = 4
  static DINING_ROOM = 5
  static CONSERVATORY = 6
  static BALLROOM = 7
  static KITCHEN = 8

  constructor(type) {
    this.type = type;
  }
}
