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
  STUDY_TO_HALL: 10,
  HALL_TO_LOUNGE: 11,
  STUDY_TO_LIBRARY: 12,
  HALL_TO_BILLIARD_ROOM: 13,
  LOUNGE_TO_DINING_ROOM: 14,
  LIBRARY_TO_BILLIARD_ROOM: 15,
  BILLIARD_ROOM_TO_DINING_ROOM: 16,
  LIBRARY_TO_CONSERVATORY: 17,
  BILLIARD_ROOM_TO_BALLROOM: 18,
  DINING_ROOM_TO_KITCHEN: 19,
  CONSERVATORY_TO_BALLROOM: 20,
  BALLROOM_TO_KITCHEN: 21,
};
// ROOMS = [Room.STUDY, Room.HALL, Room.LOUNGE, Room.LIBRARY, Room.BILLIARD_ROOM, Room.DINING_ROOM, Room.CONSERVATORY, Room.BALLROOM, Room.KITCHEN];


var Weapon = {
  ROPE: {
    id: 0,
    name: 'Rope',
  },
  PIPE: {
    id: 1,
    name: 'Pipe',
  },
  KNIFE: {
    id: 2,
    name: 'Knife',
  },
  WRENCH: {
    id: 3,
    name: 'Wrench',
  },
  CANDLESTICK: {
    id: 4,
    name: 'Candlestick',
  },
  REVOLVER: {
    id: 5,
    name: 'Revolver',
  },
};
WEAPONS = [Weapon.ROPE, Weapon.PIPE, Weapon.KNIFE, Weapon.WRENCH, Weapon.CANDLESTICK, Weapon.REVOLVER];

var WitnessType = {
  ROOM: 0,
  CHARACTER: 1,
  WEAPON: 2,
};
WITNESS_TYPES = [WitnessType.ROOM, WitnessType.CHARACTER, WitnessType.WEAPON];

// This next part makes me want to die
// Let's wrap the wrapper of the wrapper
// Not sure if static methods supported
function WitnessItem_fromType(id, type) {
  switch(type) {
    case WitnessType.ROOM:
      return new RoomItem(id);
    case WitnessType.CHARACTER:
      return new CharacterItem(id);
    case WitnessType.WEAPON:
      return new WeaponItem(id);
    default:
      throw "Unrecognized type: " + type;
  }
}
class WitnessItem {
  constructor(id) {
    this.id = id;
  }
  equals(wi) {
    return this.id == wi.id && this.type == wi.type;
  }
}
class RoomItem extends WitnessItem {
  constructor(id) {
    super(id);
    this.type = WitnessType.ROOM;
    this.name = new Position(id).name;
  }
}
class CharacterItem extends WitnessItem {
  constructor(id) {
    super(id);
    this.type = WitnessType.CHARACTER;
    this.name = new Character(id).name;
  }
}
class WeaponItem extends WitnessItem {
  constructor(id) {
    super(id);
    this.type = WitnessType.WEAPON;
    this.name = WEAPONS[id].name;
  }
}
// End part that makes me want to die

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
        this.name = "Dining Hall";
        break;
      case 1:
        this.name = "Peabody Institute";
        break;
      case 2:
        this.name = "Gilman Hall";
        break;
      case 3:
        this.name = "Library";
        break;
      case 4:
        this.name = "The Hospital";
        break;
      case 5:
        this.name = "The Lounge";
        break;
      case 6:
        this.name = "Hutzler Reading Room";
        break;
      case 7:
        this.name = "Stacks";
        break;
      case 8:
        this.name = "Shriver Hall";
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
        if (new_y >= 0) {
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
        if (new_x >= 0) {
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
        this.name = "Ed S.";
        this.color = "yellow";
        this.position = null;
        this.first_move = 14;
        break;
      case 1:
        this.name = "Jeff G.";
        this.color = "red";
        this.position = null;
        this.first_move = 11;
        break;
      case 2:
        this.name = "Joe D.";
        this.color = "purple";
        this.position = null;
        this.first_move = 12;
        break;
      case 3:
        this.name = "Ralph S.";
        this.color = "green";
        this.position = null;
        this.first_move = 20;
        break;
      case 4:
        this.name = "Ronald D.";
        this.color = "white";
        this.position = null;
        this.first_move = 21;
        break;
      case 5:
        this.name = "Sam S.";
        this.color = "blue";
        this.position = null;
        this.first_move = 17;
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
