QUnit.module('Position', function() {
  QUnit.test('exists and can be instantiated', function(assert) {
    assert.true(Position !== undefined);
    let obj = new Position(0);
    assert.equal(obj.name, 'Study');
  });
  QUnit.test('can move right', function(assert) {
    let obj = new Position(Room.STUDY);
    let next = obj.getRelativePosition('right');
    assert.equal(next.id, Room.STUDY_TO_HALL);
    next = next.getRelativePosition('right');
    assert.equal(next.id, Room.HALL);
    next = next.getRelativePosition('right');
    assert.equal(next.id, Room.HALL_TO_LOUNGE);
    next = next.getRelativePosition('right');
    assert.equal(next.id, Room.LOUNGE);
    next = next.getRelativePosition('right');
    assert.equal(next, null);
  });
  QUnit.test('can move down', function(assert) {
    let obj = new Position(Room.STUDY);
    let next = obj.getRelativePosition('down');
    assert.equal(next.id, Room.STUDY_TO_LIBRARY);
    next = next.getRelativePosition('down');
    assert.equal(next.id, Room.LIBRARY);
    next = next.getRelativePosition('down');
    assert.equal(next.id, Room.LIBRARY_TO_CONSERVATORY);
    next = next.getRelativePosition('down');
    assert.equal(next.id, Room.CONSERVATORY);
    next = next.getRelativePosition('down');
    assert.equal(next, null);
  });
  QUnit.test('can move left', function(assert) {
    let obj = new Position(Room.KITCHEN);
    let next = obj.getRelativePosition('left');
    assert.equal(next.id, Room.BALLROOM_TO_KITCHEN);
    next = next.getRelativePosition('left');
    assert.equal(next.id, Room.BALLROOM);
    next = next.getRelativePosition('left');
    assert.equal(next.id, Room.CONSERVATORY_TO_BALLROOM);
    next = next.getRelativePosition('left');
    assert.equal(next.id, Room.CONSERVATORY);
    next = next.getRelativePosition('left');
    assert.equal(next, null);
  });
  QUnit.test('can move up', function(assert) {
    let obj = new Position(Room.KITCHEN);
    let next = obj.getRelativePosition('up');
    assert.equal(next.id, Room.DINING_ROOM_TO_KITCHEN);
    next = next.getRelativePosition('up');
    assert.equal(next.id, Room.DINING_ROOM);
    next = next.getRelativePosition('up');
    assert.equal(next.id, Room.LOUNGE_TO_DINING_ROOM);
    next = next.getRelativePosition('up');
    assert.equal(next.id, Room.LOUNGE);
    next = next.getRelativePosition('up');
    assert.equal(next, null);
  });
});
