// Clue-Less Main JavaScript File

// const object functions as enum. Has multiple aliases
const Color = {
  DEFAULT: 'yellow',
  YELLOW: 'yellow',
  COLONEL_MUSTARD: 'yellow',

  RED: 'red',
  MISS_SCARLET: 'red',

  PURPLE: 'purple',
  PROFESSOR_PLUM: 'purple',

  GREEN: 'green',
  MR_GREEN: 'green',

  WHITE: 'white',
  MRS_WHITE: 'white',

  BLUE: 'blue',
  MRS_PEACOCK: 'blue',
};
class Character {
  constructor() {
    this.color = Color.DEFAULT;
  }
}
