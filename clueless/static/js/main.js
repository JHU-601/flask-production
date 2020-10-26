// Clue-Less Main JavaScript File

WEBSOCKET_URL = 'ws://localhost:8081'; // TODO update to server / something dynamic
var socket;

var gameState = {
  players: [], // each player: location (int), disqualified (true/false)
  currentPlayerTurn: -1,
  localPlayer: -1, // indicates which character this client is playing as
  witnessItems: [], // 3 witness items
  microstate: 'n/a',
};
var messagesReceived = 0;
// TODO code to update state when each message received (w/o logic/validation) - Steve, Ken
// TODO output box for client mock messages - Steve

function showGameState() {
  $('#statePlayers').html(gameState.players);
  $('#stateCurrentPlayerTurn').html(gameState.currentPlayerTurn);
  $('#stateLocalPlayer').html(gameState.localPlayer);
  $('#stateWitnessItems').html(gameState.witnessItems);
  $('#stateMicrostate').html(gameState.microstate);
}

function handleMessage(data) {
  $('#txtMessages').prepend(messagesReceived + ' <b>Server:</b> ' + data + '<br/>');
  messagesReceived++;
  // Handle message received from server
  // TODO handle invalid message that cannot be parsed
  try {
    msg = JSON.parse(data);
  } catch(err) {
    console.log('Error parsing server message: ' + data);
    return;
  }

  if (msg.message == 'Available') {
    // console.log('Received message Available');
    $('#msgAvailable').html(data);
  } else if (msg.message == 'Registration') {
    // console.log('Received message Registration');
    $('#msgRegistration').html(data);
  } else if (msg.message == 'Position') {
    // console.log('Received message Positions');
    $('#msgPosition').html(data);
  } else if (msg.message == 'PlayerTurn') {
    gameState.turn = true;
    $('#msgPlayerTurn').html(data);
  } else if (msg.message == 'Suggestion') {
    // console.log('Received message Suggestion');
    $('#msgSuggestion').html(data);
  } else if (msg.message == 'SuggestionQuery') {
    // console.log('Received message SuggestionQuery');
    $('#msgSuggestionStatus').html(data);
  } else if (msg.message == 'SuggestionStatus') {
    // console.log('Received message SuggestionStatus');
    $('#msgSuggestionQuery').html(data);
  } else if (msg.message == 'SuggestionWitness') {
    // console.log('Received message SuggestionWitness');
    $('#msgSuggestionWitness').html(data);
  } else if (msg.message == 'Accusation') {
    // console.log('Received message Accusation');
    $('#msgAccusation').html(data);
  } else if (msg.message == 'Winner') {
    // console.log('Received message Winner');
    $('#msgWinner').html(data);
  } else if (msg.message == 'Disqualified') {
    // console.log('Received message Disqualified');
    $('#msgDisqualified').html(data);
  } else {
    console.log('Unrecognized message received: ' + data);
  }
}

function handleBtnTestClick(e) {
  socket.send('test message');
  console.log('sent test message to server');
}
function handleBtnJoinClick(e) {
    e.preventDefault(); // Don't submit the form & reload page
    var msg = {
        'message': 'JoinGame',
        'id': $('#formJoin input[name=gameId]').val(),
    };
    socket.send(JSON.stringify(msg));
}
function handleBtnCreateClick(e) {
    e.preventDefault(); // Don't submit the form & reload page
    var msg = {
        'message': 'CreateGame',
    };
    socket.send(JSON.stringify(msg));
}
function handleBtnRegisterClick(e) {
  e.preventDefault(); // Don't submit the form & reload page
  var msg = {
    'message': 'Register',
    'character': $('#formRegister input[name=character]:checked').val(),
    'display_name': $('#formRegister input[name=displayName]').val(),
  };
  socket.send(JSON.stringify(msg));
}
function handleBtnMoveClick(e) {
  e.preventDefault();
  var msg = {
    'message': 'Move',
    'position': $('#formMove input[name=position]').val(),
  }
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
  socket.send(JSON.stringify(msg));
}
function handleBtnSuggestionResponseClick(e) {
  e.preventDefault();
  var msg = {
    'message': 'SuggestionResponse',
    'witness': $('#formSuggestionResponse input[name=witness]').val(),
  }
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
  socket.send(JSON.stringify(msg));
}

function initGameroom() {
  // our "main method" for the gameroom page
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
  $('#btnTest').click(function(e) {
    handleBtnTestClick(e);
  });
  $('#btnRegister').click(function(e) {
    handleBtnRegisterClick(e);
  });
  $('#btnCreate').click(function(e) {
      handleBtnCreateClick(e);
  });
  $('#btnJoin').click(function(e) {
      handleBtnJoinClick(e);
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
