// Clue-Less Main JavaScript File

WEBSOCKET_URL = 'ws://localhost:8081'; // TODO update to server / something dynamic
var socket;
var players = 0;
var positions = {};

function handleMessage(data) {
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
    players++;
    if (players >= 5) {
      $('#content').fadeOut();
      $('#gameboard').fadeIn();
    }
  } else if (msg.message == 'Positions') {
    // console.log('Received message Positions');
    $('#msgPositions').html(data);

  } else if (msg.message == 'PlayerTurn') {
    // console.log('Received message PlayerTurn');
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
function handleBtnRegisterClick(e) {
  e.preventDefault(); // Don't submit the form & reload page
  var msg = {
    'message': 'Register',
    'character': $('#formRegister input[name=character]').val(),
    'displayName': $('#formRegister input[name=displayName]').val(),
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
  // setup canvas
  var canvas = $('canvas#game')[0];
  canvas.width = canvas.getBoundingClientRect().width;
  canvas.height = canvas.getBoundingClientRect().height;
  var ctx = canvas.getContext('2d');
  var imgSplash = $('#imgSplash')[0];
  // setInterval(function() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'red';
    ctx.fillRect(0,0,canvas.width,canvas.height);
    ctx.drawImage(imgSplash, 10, 10);
    console.log('drew it all')
  // }, 10);
}

function initHomepage() {
  // our "main method" for the homepage
  console.log('on homepage');
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
