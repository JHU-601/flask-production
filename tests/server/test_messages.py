from clueless.messages import Character, Room, Hallway, Location

"""
Character tests
"""
def test_character_serialize():
    def test_ser(c, name):
        assert c.serialize() == name
    test_ser(Character.YELLOW, "Colonel Mustard")
    test_ser(Character.RED, "Miss Scarlet")
    test_ser(Character.PURPLE, "Professor Plum")
    test_ser(Character.GREEN, "Mr. Green")
    test_ser(Character.WHITE, "Mrs. White")
    test_ser(Character.BLUE, "Mrs. Peacock")

def test_character_deserialize():
    def test_deser(name, c):
        assert Character.deserialize(name) == c
    test_deser("Colonel Mustard", Character.YELLOW)
    test_deser("Miss Scarlet", Character.RED)
    test_deser("Professor Plum", Character.PURPLE)
    test_deser("Mr. Green", Character.GREEN)
    test_deser("Mrs. White", Character.WHITE)
    test_deser("Mrs. Peacock", Character.BLUE)


"""
Room tests
"""
def test_room_serialize():
    def test_ser(r, i):
        assert r.serialize() == i
    test_ser(Room.STUDY, 0)
    test_ser(Room.HALL, 1)
    test_ser(Room.LOUNGE, 2)
    test_ser(Room.LIBRARY, 3)
    test_ser(Room.BILLIARD, 4)
    test_ser(Room.DINING, 5)
    test_ser(Room.CONSERVATORY, 6)
    test_ser(Room.BALLROOM, 7)
    test_ser(Room.KITCHEN, 8)


def test_room_deserialize():
    def test_deser(i, r):
        assert Room.deserialize(i) == r
    test_deser(0, Room.STUDY)
    test_deser(1, Room.HALL)
    test_deser(2, Room.LOUNGE)
    test_deser(3, Room.LIBRARY)
    test_deser(4, Room.BILLIARD)
    test_deser(5, Room.DINING)
    test_deser(6, Room.CONSERVATORY)
    test_deser(7, Room.BALLROOM)
    test_deser(8, Room.KITCHEN)


def test_room_adjacent():
    def test_adj(r, rl):
        adj = r.adjacent
        assert all([Location.deserialize(l) in adj for l in rl])
    test_adj(Room.STUDY, ["STUDY_HALL", "STUDY_LIBRARY", "KITCHEN"])
    test_adj(Room.HALL, ["HALL_LOUNGE", "HALL_BILLIARD", "STUDY_HALL"])
    test_adj(Room.LOUNGE, ["HALL_LOUNGE", "LOUNGE_DINING", "CONSERVATORY"])
    test_adj(Room.LIBRARY, ["STUDY_LIBRARY", "LIBRARY_BILLIARD", "LIBRARY_CONSERVATORY"])
    test_adj(Room.BILLIARD, ["LIBRARY_BILLIARD", "HALL_BILLIARD", "BILLIARD_DINING", "BILLIARD_BALLROOM"])
    test_adj(Room.DINING, ["LOUNGE_DINING", "BILLIARD_DINING", "DINING_KITCHEN"])
    test_adj(Room.CONSERVATORY, ["LIBRARY_CONSERVATORY", "CONSERVATORY_BALLROOM", "LOUNGE"])
    test_adj(Room.BALLROOM, ["CONSERVATORY_BALLROOM", "BILLIARD_BALLROOM", "BALLROOM_KITCHEN"])
    test_adj(Room.KITCHEN, ["BALLROOM_KITCHEN", "DINING_KITCHEN", "STUDY"])

"""
Hallway tests
"""
def test_hallway_serialize():
    def test_ser(r, i):
        assert r.serialize() == i
    test_ser(Hallway.STUDY_HALL, 10)
    test_ser(Hallway.HALL_LOUNGE, 11)
    test_ser(Hallway.STUDY_LIBRARY, 12)
    test_ser(Hallway.HALL_BILLIARD, 13)
    test_ser(Hallway.LOUNGE_DINING, 14)
    test_ser(Hallway.LIBRARY_BILLIARD, 15)
    test_ser(Hallway.BILLIARD_DINING, 16)
    test_ser(Hallway.LIBRARY_CONSERVATORY, 17)
    test_ser(Hallway.BILLIARD_BALLROOM, 18)
    test_ser(Hallway.DINING_KITCHEN, 19)
    test_ser(Hallway.CONSERVATORY_BALLROOM, 20)
    test_ser(Hallway.BALLROOM_KITCHEN, 21)


def test_hallway_deserialize():
    def test_deser(i, r):
        assert Hallway.deserialize(i) == r
    test_deser(10, Hallway.STUDY_HALL)
    test_deser(11, Hallway.HALL_LOUNGE)
    test_deser(12, Hallway.STUDY_LIBRARY)
    test_deser(13, Hallway.HALL_BILLIARD)
    test_deser(14, Hallway.LOUNGE_DINING)
    test_deser(15, Hallway.LIBRARY_BILLIARD)
    test_deser(16, Hallway.BILLIARD_DINING)
    test_deser(17, Hallway.LIBRARY_CONSERVATORY)
    test_deser(18, Hallway.BILLIARD_BALLROOM)
    test_deser(19, Hallway.DINING_KITCHEN)
    test_deser(20, Hallway.CONSERVATORY_BALLROOM)
    test_deser(21, Hallway.BALLROOM_KITCHEN)


def test_hallway_adjacent():
    def test_adj(hallway, first, second):
        assert first in hallway.adjacent
        assert second in hallway.adjacent
    test_adj(Hallway.STUDY_HALL, Room.STUDY, Room.HALL)
    test_adj(Hallway.HALL_LOUNGE, Room.HALL, Room.LOUNGE)
    test_adj(Hallway.STUDY_LIBRARY, Room.STUDY, Room.LIBRARY)
    test_adj(Hallway.HALL_BILLIARD, Room.HALL, Room.BILLIARD)
    test_adj(Hallway.LOUNGE_DINING, Room.LOUNGE, Room.DINING)
    test_adj(Hallway.LIBRARY_BILLIARD, Room.LIBRARY, Room.BILLIARD)
    test_adj(Hallway.BILLIARD_DINING, Room.BILLIARD, Room.DINING)
    test_adj(Hallway.LIBRARY_CONSERVATORY, Room.LIBRARY, Room.CONSERVATORY)
    test_adj(Hallway.BILLIARD_BALLROOM, Room.BILLIARD, Room.BALLROOM)
    test_adj(Hallway.DINING_KITCHEN, Room.DINING, Room.KITCHEN)
    test_adj(Hallway.CONSERVATORY_BALLROOM, Room.CONSERVATORY, Room.BALLROOM)
    test_adj(Hallway.BALLROOM_KITCHEN, Room.BALLROOM, Room.KITCHEN)

"""
Location tests
"""
def test_location_serialize():
    def test_ser(r, i):
        assert Location(r).serialize() == i
    test_ser(Room.STUDY, 0)
    test_ser(Room.HALL, 1)
    test_ser(Room.LOUNGE, 2)
    test_ser(Room.LIBRARY, 3)
    test_ser(Room.BILLIARD, 4)
    test_ser(Room.DINING, 5)
    test_ser(Room.CONSERVATORY, 6)
    test_ser(Room.BALLROOM, 7)
    test_ser(Room.KITCHEN, 8)
    test_ser(Hallway.STUDY_HALL, 10)
    test_ser(Hallway.HALL_LOUNGE, 11)
    test_ser(Hallway.STUDY_LIBRARY, 12)
    test_ser(Hallway.HALL_BILLIARD, 13)
    test_ser(Hallway.LOUNGE_DINING, 14)
    test_ser(Hallway.LIBRARY_BILLIARD, 15)
    test_ser(Hallway.BILLIARD_DINING, 16)
    test_ser(Hallway.LIBRARY_CONSERVATORY, 17)
    test_ser(Hallway.BILLIARD_BALLROOM, 18)
    test_ser(Hallway.DINING_KITCHEN, 19)
    test_ser(Hallway.CONSERVATORY_BALLROOM, 20)
    test_ser(Hallway.BALLROOM_KITCHEN, 21)

def test_location_deserialize():
    def test_deser(i, r):
        print(f'{Location.deserialize(i)} == {Location(r)}')
        assert Location.deserialize(i) == Location(r)
    test_deser(0, Room.STUDY)
    test_deser(1, Room.HALL)
    test_deser(2, Room.LOUNGE)
    test_deser(3, Room.LIBRARY)
    test_deser(4, Room.BILLIARD)
    test_deser(5, Room.DINING)
    test_deser(6, Room.CONSERVATORY)
    test_deser(7, Room.BALLROOM)
    test_deser(8, Room.KITCHEN)
    test_deser(10, Hallway.STUDY_HALL)
    test_deser(11, Hallway.HALL_LOUNGE)
    test_deser(12, Hallway.STUDY_LIBRARY)
    test_deser(13, Hallway.HALL_BILLIARD)
    test_deser(14, Hallway.LOUNGE_DINING)
    test_deser(15, Hallway.LIBRARY_BILLIARD)
    test_deser(16, Hallway.BILLIARD_DINING)
    test_deser(17, Hallway.LIBRARY_CONSERVATORY)
    test_deser(18, Hallway.BILLIARD_BALLROOM)
    test_deser(19, Hallway.DINING_KITCHEN)
    test_deser(20, Hallway.CONSERVATORY_BALLROOM)
    test_deser(21, Hallway.BALLROOM_KITCHEN)
