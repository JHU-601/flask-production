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
  })
  if (window.location.pathname.includes('gameroom')) {
    initGameroom();
  } else {
    initHomepage();
  }
});
