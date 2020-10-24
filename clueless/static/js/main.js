// Clue-Less Main JavaScript File

// const object functions as enum. Has multiple aliases
// Numbers are per the SRS
class Character {
  DEFAULT = 0
  YELLOW = 0
  COLONEL_MUSTARD = 0

  RED = 1
  MISS_SCARLET = 1

  PURPLE = 2
  PROFESSOR_PLUM = 2

  GREEN = 3
  MR_GREEN = 3

  WHITE = 4
  MRS_WHITE = 4

  BLUE = 5
  MRS_PEACOCK = 5

  constructor(type) {
    this.type = type;
  }
};

class Weapon {
  DEFAULT = 0
  ROPE = 0
  PIPE = 1
  KNIFE = 2
  WRENCH = 3
  CANDLESTICK = 4
  REVOLVER = 5

  constructor(type) {
    this.type = type;
  }
}

class Room {
  DEFAULT = 0
  STUDY = 0
  HALL = 1
  LOUNGE = 2
  LIBRARY = 3
  BILLIARD_ROOM = 4
  DINING_ROOM = 5
  CONSERVATORY = 6
  BALLROOM = 7
  KITCHEN = 8

  constructor(type) {
    this.type = type;
  }
}

// -------------------------------------------------------------------------

WEBSOCKET_URL = 'ws://' + window.location.host + '/web_socket'

function initGameroom() {
  // our "main method" for the gameroom page
  var socket = new WebSocket(WEBSOCKET_URL);
  socket.onopen = function(event) {
    console.log('connected to server');
  };
  socket.onmessage = function(event) {
    console.log('received message: ' + event.data)
  }
}

function initHomepage() {
  // our "main method" for the homepage
  console.log('on homepage');
}

$(document).ready(function() {
  if (window.location.pathname.includes('gameroom')) {
    initGameroom();
  } else {
    initHomepage();
  }
});
