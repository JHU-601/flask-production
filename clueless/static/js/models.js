var MAP = [
  [0,   10,   1,  11,   2],
  [12,  null, 13, null, 14],
  [3,   15,   4,  16,   5],
  [17,  null, 18, null, 19],
  [6,   20,   7,  21,   8],
];

var Room = {
  STUDY: 0,
  HALL: 1,
  LOUNGE: 2,
  LIBRARY: 3,
  BILLIARD_ROOM: 4,
  DINING_ROOM: 5,
  CONSERVATORY: 6,
  BALLROOM: 7,
  KITCHEN: 8,
};

class Position {
  constructor(id) {
    this.id = parseInt(id);
    // Look up x,y
    for (var i = 0; i < MAP.length; i++) {
      for (var j = 0; j < MAP[0].length; j++) {
        if (MAP[i][j] == this.id) {
          this.x = j;
          this.y = i;
        }
      }
    }
    if (this.x == undefined || this.y == undefined) {
      throw "Error: Could not find Position " + this.id + " in MAP";
    }
    switch(this.id) {
      case Room.STUDY:
        this.name = "Study";
        break;
      case 1:
        this.name = "Hall";
        break;
      case 2:
        this.name = "Lounge";
        break;
      case 3:
        this.name = "Library";
        break;
      case 4:
        this.name = "Billiard Room";
        break;
      case 5:
        this.name = "Dining Room";
        break;
      case 6:
        this.name = "Conservatory";
        break;
      case 7:
        this.name = "Ballroom";
        break;
      case 8:
        this.name = "Kitchen";
        break;
      case 10:
        this.name = "Study to Hall";
        break;
      case 11:
        this.name = "Hall to Lounge";
        break;
      case 12:
        this.name = "Study to Library";
        break;
      case 13:
        this.name = "Hall to Billiard Room";
        break;
      case 14:
        this.name = "Lounge to Dining Room";
        break;
      case 15:
        this.name = "Library to Billiard Room";
        break;
      case 16:
        this.name = "Billiard Room to Dining Room";
        break;
      case 17:
        this.name = "Library to Conservatory";
        break;
      case 18:
        this.name = "Billiard Room to Ballroom";
        break;
      case 19:
        this.name = "Dining Room to Kitchen";
        break;
      case 20:
        this.name = "Conservatory to Ballroom";
        break;
      case 21:
        this.name = "Ballroom to Kitchen";
        break;
      default:
        throw "Room id is not valid: " + this.id;
        break;
    }
  }
  getRelativePosition(direction) {
    var new_x, new_y;
    switch(direction) {
      case 'upleft':
        if (this.id == Room.KITCHEN) { // kitchen
          return new Position(Room.STUDY);
        } else {
          return null;
        }
        break;
      case 'up':
        new_x = this.x;
        new_y = this.y - 1;
        if (new_y > 0) {
          return new Position(MAP[new_y][new_x]);
        } else {
          return null;
        }
        break;
      case 'upright':
        if (this.id == Room.CONSERVATORY) { // conservatory
          return new Position(Room.LOUNGE);
        } else {
          return null;
        }
        break;
      case 'left':
        new_x = this.x - 1;
        new_y = this.y;
        if (new_x > 0) {
          return new Position(MAP[new_y][new_x]);
        } else {
          return null;
        }
        break;
      case 'right':
        new_x = this.x + 1;
        new_y = this.y;
        if (new_x < MAP[0].length) {
          return new Position(MAP[new_y][new_x]);
        } else {
          return null;
        }
        break;
      case 'downleft':
        if (this.id == Room.LOUNGE) {
          return new Position(Room.CONSERVATORY);
        } else {
          return null;
        }
        break;
      case 'down':
        new_x = this.x;
        new_y = this.y + 1;
        if (new_y < MAP.length) {
          return new Position(MAP[new_y][new_x]);
        } else {
          return null;
        }
        break;
      case 'downright':
        if (this.id == Room.STUDY) {
          return new Position(Room.KITCHEN)
        } else {
          return null;
        }
        break;
      default:
        throw "Unrecognized relative direction: " + direction;
    }
  }
}

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
