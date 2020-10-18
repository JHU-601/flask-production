const assert = require('assert');

const Character = require('../../clueless/character.js')

describe('Nothing', () => {
  it('can run a test', () => {
    assert(true);
  });
});

describe('Character', () => {
  var character;
  before(() => {
    character = new Character();
  });
  it('has a name', () => {

  });
});
