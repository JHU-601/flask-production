class Panel {
  constructor(id) {
    this.element = document.getElementById(id);
  }
  // Abstract method display
  display(gameState) {
    console.log('Warning: display not overrided for ' + this.constructor.name);
  }
}

class GamePanel extends Panel {
  display(gameState) {
    this.element.innerHTML = 'i just updated game state!';
  }
}

class HomePanel extends Panel {

}

class StartPanel extends Panel {

}

class WaitingRoomPanel extends Panel {

}

class GameboardPanel extends Panel {

}

class InteractionPanel extends Panel {

}

class TabbedPanel extends Panel {

}

class AccusePanel extends Panel {

}

class SuggestPanel extends Panel {

}

class MovePanel extends Panel {

}

class ChatPanel extends Panel {

}

class NotepadPanel extends Panel {

}

class ModalPanel extends Panel {

}
