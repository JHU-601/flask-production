class Panel {
  constructor(id) {
    this.element = document.getElementById(id);
    if (this.element == null) {
      throw "Element id " + id + " not found. Element cannot be null.";
    }
    this.orig_display = null;
  }
  // Abstract method display
  display(gameState) {
    throw 'Error: display not overrided for ' + this.constructor.name;
  }
  hide() {
    this.orig_display = this.element.style.display;
    this.element.style.display = "none";
  }
  show() {
    // Only attempt to show if already hidden
    if (this.element.style.display == "none") {
      // If we saved the display value, restore it
      if (this.orig_display != null) {
        this.element.style.display = this.orig_display;
      }
      // otherwise, just set it to inherit to get it to show up
      else {
        this.element.style.display = "inherit";
      }
    }
  }
}

class GamePanel extends Panel {
  constructor(id) {
    super(id);
    this.homePanel = new HomePanel('home-panel');
    this.startPanel = new StartPanel('start-panel');
    this.waitingRoomPanel = new WaitingRoomPanel('waitingroom-panel');
    this.registrationPanel = new RegistrationPanel('registration-panel');
    this.gameboardPanel = new GameboardPanel('gameboard-panel');
    this.interactionPanel = new InteractionPanel('interaction-panel');
    this.modalPanel = new ModalPanel('modal-panel');

    this.showScreen1();
  }
  display(gameState) {
    this.homePanel.display(gameState);
    this.startPanel.display(gameState);
    this.waitingRoomPanel.display(gameState);
    this.registrationPanel.display(gameState);
    this.gameboardPanel.display(gameState);
    this.interactionPanel.display(gameState);
    this.modalPanel.display(gameState);
  }
  showScreen1() {
    this.homePanel.show();
    this.startPanel.show();
    this.waitingRoomPanel.hide();
    this.registrationPanel.hide();
    this.gameboardPanel.hide();
    this.interactionPanel.hide();
    this.modalPanel.hide();
  }
  showScreen2() {
    this.homePanel.hide();
    this.startPanel.hide();
    this.waitingRoomPanel.show();
    this.registrationPanel.show();
    this.gameboardPanel.hide();
    this.interactionPanel.hide();
    this.modalPanel.hide();
  }
  showScreen3() {
    this.homePanel.hide();
    this.startPanel.hide();
    this.waitingRoomPanel.hide();
    this.registrationPanel.hide();
    this.gameboardPanel.show();
    this.interactionPanel.show();
    this.modalPanel.hide();
  }
  showModal(title, message) {
    this.modalPanel.show(title, message);
  }
}

class HomePanel extends Panel {
  display(gameState) {

  }
}

class StartPanel extends Panel {
  constructor(id) {
    super(id);
    // Get references to relevant elements
    this.btnCreateGame = this.element.querySelector('#btnCreateGame');
    this.txtGameId = this.element.querySelector('#txtGameId');
    this.btnJoinGame = this.element.querySelector('#btnJoinGame');
    this.btnAbout = this.element.querySelector('#btnAbout');
    // Set up click listeners
    this.btnCreateGame.onclick = this.handleBtnCreateGameClick.bind(this);
    this.btnJoinGame.onclick = this.handleBtnJoinGameClick.bind(this);
    this.btnAbout.onclick = this.handleBtnAboutClick.bind(this);
  }
  display(gameState) {

  }
  handleBtnCreateGameClick() {
    // gameHub.gamePanel.showModal('Create Game', 'Not implemented.');
    gameHub.sendCreateGame();
  }
  handleBtnJoinGameClick() {
    alert('btnJoinGame clicked with gameid=' + this.txtGameId.value);
  }
  handleBtnAboutClick() {
    gameHub.gamePanel.showModal('Yes', 'Yes');
  }
}

class WaitingRoomPanel extends Panel {
  display(gameState) {

  }
}

class RegistrationPanel extends Panel {
  display(gameState) {

  }
}

class GameboardPanel extends Panel {
  display(gameState) {

  }
}

class InteractionPanel extends Panel {
  display(gameState) {

  }
}

class TabbedPanel extends Panel {
  display(gameState) {

  }
}

class AccusePanel extends Panel {
  display(gameState) {

  }
}

class SuggestPanel extends Panel {
  display(gameState) {

  }
}

class MovePanel extends Panel {
  display(gameState) {

  }
}

class ChatPanel extends Panel {
  display(gameState) {

  }
}

class NotepadPanel extends Panel {
  display(gameState) {

  }
}

class ModalPanel extends Panel {
  constructor(id) {
    super(id);
    this.btnOkay = this.element.querySelector('#btnOkay');
    this.btnOkay.onclick = this.handleBtnOkayClick.bind(this);
  }
  display(gameState) {

  }
  show(title, message) {
    // TODO insert title, message into element
    super.show();
  }
  handleBtnOkayClick() {
    this.hide();
  }
}
