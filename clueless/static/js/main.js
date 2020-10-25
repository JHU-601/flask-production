// Clue-Less Main JavaScript File

WEBSOCKET_URL = 'ws://localhost:8081'; // TODO update to server / something dynamic
var socket;

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

function initGameroom() {
  // our "main method" for the gameroom page
  socket = new WebSocket(WEBSOCKET_URL);
  socket.onopen = function(event) {
    console.log('connected to server');
  };
  socket.onmessage = function(event) {
    console.log('received message from server: ' + event.data);
  }
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
  $('#btnTest').click(function(e) {
    handleBtnTestClick(e);
  });
  $('#btnRegister').click(function(e) {
    handleBtnRegisterClick(e);
  });
  $('#btnMove').click(function(e) {
    handleBtnMoveClick(e);
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
