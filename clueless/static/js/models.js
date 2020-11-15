class Character {
  constructor(character_id) {
    this.id = parseInt(character_id);
    switch(this.id) {
      case 0:
        this.name = "Colonel Mustard";
        this.color = "yellow";
        this.position = 14;
        break;
      case 1:
        this.name = "Miss Scarlet";
        this.color = "red";
        this.position = 11;
        break;
      case 2:
        this.name = "Professor Plum";
        this.color = "purple";
        this.position = 12;
        break;
      case 3:
        this.name = "Mr. Green";
        this.color = "green";
        this.position = 19;
        break;
      case 4:
        this.name = "Mrs. White";
        this.color = "white";
        this.position = 20;
        break;
      case 5:
        this.name = "Mrs. Peacock";
        this.color = "blue";
        this.position = 17;
        break;
      default:
        throw "Character id is not valid: " + this.id;
        break;
    }
  }
}

class Player {
  constructor(character_id, display_name) {
    this.disqualified = false;
    this.display_name = display_name;
    this.character = new Character(character_id);
  }
}
