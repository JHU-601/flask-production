class GameState {
  constructor() {
    this.players = [];
    this.localPlayer = null;
    this.witnessCharacter = null;
    this.witnessRoom = null;
    this.witnessWeapon = null;
  }
}

class GameHub {
  constructor() {
    this.gameState = new GameState();
    this.gamePanel = new GamePanel();

    updateDisplay();
  }

  updateDisplay() {
    this.gamePanel.display(this.gameState);
  }

  receiveMessage(message) {
    // TODO
  }
  sendMessage(message) {
    // TODO
  }

  // TODO individual message handlers
}
