// Clue-Less Main JavaScript File

WEBSOCKET_URL = 'ws://localhost:8081'; // TODO update to server / something dynamic
var socket;

function handleBtnTestClick() {
  socket.send('test message');
  console.log('sent test message to server');
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
  $('#btnTest').click(function() {
    handleBtnTestClick();
  });
  if (window.location.pathname.includes('gameroom')) {
    initGameroom();
  } else {
    initHomepage();
  }
});
