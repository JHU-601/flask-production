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
    if (this.element.style.display != 'hidden') {
      this.orig_display = this.element.style.display;
    }
    this.element.style.display = "none";
  }
  show() {
    // Only attempt to show if already hidden
    if (this.element.style.display == "none") {
      // If we saved the display value, restore it
      if (this.orig_display != 'none') {
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
    gameHub.sendCreateGame();
  }
  handleBtnJoinGameClick() {
    if (this.txtGameId.value.length < 1) {
      gameHub.gamePanel.showModal('Validation Error', 'You must enter a game ID.');
    } else {
      var gameId = this.txtGameId.value;
      gameHub.sendJoinGame(gameId);
    }
  }
  handleBtnAboutClick() {
    gameHub.gamePanel.showModal('About Clue-Less', 'Clue-Less was developed by Iron Board Games.');
  }
}

class WaitingRoomPanel extends Panel {
  constructor(id) {
    super(id);
    this.lblGameId = this.element.querySelector("#lblGameId");
    this.lstOfPlayers = this.element.querySelector("#lstOfPlayers");
    this.btnStartGame = this.element.querySelector("#btnStartGame");
    // handlers
    this.btnStartGame.onclick = this.handleBtnStartGameClick.bind(this);
  }
  display(gameState) {
    // Display lblGameId
    this.lblGameId.innerHTML = gameState.gameid;
    // Display lstOfPlayers
    if (gameState.players.length < 1) {
      this.lstOfPlayers.innerHTML = "No one has joined yet.";
    } else {
      this.lstOfPlayers.innerHTML = "";
      for (var i = 0; i < gameState.players.length; i++) {
        var curPlayer = gameState.players[i];
        this.lstOfPlayers.innerHTML += '<div class="character">' + curPlayer.character.name + ' - ' + curPlayer.display_name + '</div>';
      }
    }
    // Disable start button until everyone joins
    if (gameState.players.length < 6) {
      this.btnStartGame.disabled = true;
    } else {
      this.btnStartGame.disabled = false;
    }
  }
  handleBtnStartGameClick() {
    alert('btnStart clicked');
  }
}

class RegistrationPanel extends Panel {
  constructor(id) {
    super(id);
    // Class vars
    this.clickedCharacter = null;
    // Set up refs
    this.characters = [
      this.element.querySelector('#character1'),
      this.element.querySelector('#character2'),
      this.element.querySelector('#character3'),
      this.element.querySelector('#character4'),
      this.element.querySelector('#character5'),
      this.element.querySelector('#character6'),
    ];
    this.txtDisplayName = this.element.querySelector('#txtDisplayName');
    this.btnRegister = this.element.querySelector('#btnRegister');
    // set up listeners
    for (var i = 0; i < this.characters.length; i++) {
      this.characters[i].onclick = this.handleCharacterClick.bind(this);
    }
    this.btnRegister.onclick = this.handleBtnRegisterClick.bind(this);
  }
  display(gameState) {
    for (var i = 0; i < gameState.players.length; i++) {
      var currPlayer = gameState.players[i];
      this.characters[currPlayer.character.id].classList.add("taken");
    }
    // Disable all buttons if we already have a character
    for (var i = 0; i < this.characters.length; i++) {
      if (gameState.localPlayer != null) {
        this.characters[i].disabled = true;
      }
    }
  }
  handleCharacterClick(e) {
    // Ignore this click if we already have chosen a player
    if (gameHub.gameState.localPlayer != null) {
      return;
    }
    // Ignore this click if the character is already taken
    var clickedCharacter = e.target.dataset.character;
    for (var i = 0; i < gameHub.gameState.players.length; i++) {
      if (gameHub.gameState.players[i].character == clickedCharacter) {
        return;
      }
    }

    // Remove class from old one (if it exists)
    if (this.clickedCharacter != null) {
      this.characters[this.clickedCharacter].classList.remove("clicked");
    }
    this.clickedCharacter = clickedCharacter;
    this.characters[this.clickedCharacter].classList.add("clicked");
  }
  handleBtnRegisterClick() {
    if (this.clickedCharacter == null || this.txtDisplayName.value == null || this.txtDisplayName.value.length < 1) {
      gameHub.gamePanel.showModal('Validation Error', 'You must select a character and enter a display name.');
    } else {
      gameHub.sendRegister(this.clickedCharacter, this.txtDisplayName.value);
    }
  }
}

class GameboardPanel extends Panel {
  constructor(id) {
    super(id);
    this.players = [
      this.element.querySelector('#player0'),
      this.element.querySelector('#player1'),
      this.element.querySelector('#player2'),
      this.element.querySelector('#player3'),
      this.element.querySelector('#player4'),
      this.element.querySelector('#player5'),
    ];
  }
  display(gameState) {
    for (var i = 0; i < gameState.players.length; i++) {
      var curPlayer = gameState.players[i];
      var playerElem = this.element.querySelector('#player' + curPlayer.character.id);
      var roomElem = this.element.querySelector('#room' + curPlayer.character.position);
      roomElem.appendChild(playerElem);
    }
  }
}

class InteractionPanel extends Panel {
  constructor(id) {
    super(id);
    this.notepadPanel = new NotepadPanel('notepad-panel');
    this.chatPanel = new ChatPanel('chat-panel');

    this.topPanel = new TabbedPanel('top-panel', [this.notepadPanel, this.chatPanel]);

    this.movePanel = new MovePanel('move-panel');
    this.suggestPanel = new SuggestPanel('suggest-panel');
    this.accusePanel = new AccusePanel('accuse-panel');

    this.bottomPanel = new TabbedPanel('bottom-panel', [this.movePanel, this.suggestPanel, this.accusePanel]);
  }
  display(gameState) {
    this.notepadPanel.display(gameState);
    this.chatPanel.display(gameState);

    this.topPanel.display(gameState);

    this.movePanel.display(gameState);
    this.suggestPanel.display(gameState);
    this.accusePanel.display(gameState);

    this.bottomPanel.display(gameState);
  }
}

class TabbedPanel extends Panel {
  constructor(id, childPanels) {
    super(id);
    this.childPanels = childPanels;
    this.selectors = this.element.querySelectorAll('.tab-selector');
    this.selectedPanel = 0;
    // Ensure block for child panels
    for (var i = 0; i < this.childPanels.length; i++) {

    }
    // Set up listeners
    for (var i = 0; i < this.selectors.length; i++) {
      this.selectors[i].onclick = this.handleSelectorClick.bind(this);
    }
  }
  display(gameState) {
    var numTabs = this.selectors.length;
    for (var i = 0; i < numTabs; i++) {
      // Show / hide panels
      if (i == this.selectedPanel) {
        // Show the panel
        this.childPanels[i].show();
        // Add active class to selector
        this.selectors[i].classList.add('active');
      } else {
        // Hide the panel
        this.childPanels[i].hide();
        // Remove active class from selector
        this.selectors[i].classList.remove('active');
      }
    }
  }
  handleSelectorClick(e) {
    this.selectedPanel = e.target.dataset.index;
    this.display(null);
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
  constructor(id) {
    super(id);
    this.buttons = this.element.querySelectorAll('.direction');
    this.btnMove = this.element.querySelector('#btnMove');
    this.selected = null;
    // Listeners
    for (var i = 0; i < this.buttons.length; i++) {
      this.buttons[i].onclick = this.handleButtonClick.bind(this);
    }
    this.btnMove.onclick = this.handleBtnMoveClick.bind(this);
  }
  display(gameState) {
    for (var i = 0; i < this.buttons.length; i++) {
      var curButton = this.buttons[i];
      if (curButton.dataset.direction == this.selected) {
        curButton.disabled = true;
      } else {
        curButton.disabled = false;
      }
    }
  }
  handleButtonClick(e) {
    this.selected = e.target.dataset.direction;
    this.display(null);
  }
  handleBtnMoveClick() {
    if (this.selected == null) {
      gameHub.gamePanel.showModal('Validation Error', 'You must select a direction to move.');
    } else {
      var new_pos = new Position(gameHub.gameState.localPlayer.character.position).getRelativePosition(this.selected);
      if (new_pos == null) {
        gameHub.gamePanel.showModal('Validation Error', 'Invalid move.')
      } else {
        gameHub.sendMove(new_pos.id);
      }
    }
  }
}

class ChatPanel extends Panel {
  display(gameState) {

  }
}

class NotepadPanel extends Panel {
  constructor(id) {
    super(id);
    this.checkboxes = this.element.querySelectorAll('.check');
    for (var i = 0; i < this.checkboxes.length; i++) {
      this.checkboxes[i].onclick = this.handleCheckboxClick.bind(this);
    }
  }
  display(gameState) {

  }
  handleCheckboxClick(e) {
    // Toggle checked class
    if (e.target.classList.contains('clicked')) {
      e.target.classList.remove('clicked');
    } else {
      e.target.classList.add('clicked');
    }
  }
}

class ModalPanel extends Panel {
  constructor(id) {
    super(id);
    this.txtNotifTitle = this.element.querySelector('#txtNotifTitle');
    this.txtNotifContent = this.element.querySelector("#txtNotifContent");
    this.btnOkay = this.element.querySelector('#btnOkay');
    this.btnOkay.onclick = this.handleBtnOkayClick.bind(this);
  }
  display(gameState) {

  }
  show(title, message) {
    this.txtNotifTitle.innerHTML = title;
    this.txtNotifContent.innerHTML = message;
    super.show();
  }
  handleBtnOkayClick() {
    this.hide();
  }
}
