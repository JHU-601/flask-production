/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
"use strict";

var $protobuf = require("protobufjs/minimal");

// Common aliases
var $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

/**
 * Character enum.
 * @exports Character
 * @enum {number}
 * @property {number} YELLOW=0 YELLOW value
 * @property {number} RED=1 RED value
 * @property {number} PURPLE=2 PURPLE value
 * @property {number} GREEN=3 GREEN value
 * @property {number} WHITE=4 WHITE value
 * @property {number} BLUE=5 BLUE value
 */
$root.Character = (function() {
    var valuesById = {}, values = Object.create(valuesById);
    values[valuesById[0] = "YELLOW"] = 0;
    values[valuesById[1] = "RED"] = 1;
    values[valuesById[2] = "PURPLE"] = 2;
    values[valuesById[3] = "GREEN"] = 3;
    values[valuesById[4] = "WHITE"] = 4;
    values[valuesById[5] = "BLUE"] = 5;
    return values;
})();

/**
 * Weapon enum.
 * @exports Weapon
 * @enum {number}
 * @property {number} ROPE=0 ROPE value
 * @property {number} PIPE=1 PIPE value
 * @property {number} KNIFE=2 KNIFE value
 * @property {number} WRENCH=3 WRENCH value
 * @property {number} CANDLESTICK=4 CANDLESTICK value
 * @property {number} REVOLVER=5 REVOLVER value
 */
$root.Weapon = (function() {
    var valuesById = {}, values = Object.create(valuesById);
    values[valuesById[0] = "ROPE"] = 0;
    values[valuesById[1] = "PIPE"] = 1;
    values[valuesById[2] = "KNIFE"] = 2;
    values[valuesById[3] = "WRENCH"] = 3;
    values[valuesById[4] = "CANDLESTICK"] = 4;
    values[valuesById[5] = "REVOLVER"] = 5;
    return values;
})();

/**
 * Room enum.
 * @exports Room
 * @enum {number}
 * @property {number} STUDY=0 STUDY value
 * @property {number} HALL=1 HALL value
 * @property {number} LOUNGE=2 LOUNGE value
 * @property {number} LIBRARY=3 LIBRARY value
 * @property {number} BILLIARD=4 BILLIARD value
 * @property {number} DINING=5 DINING value
 * @property {number} CONSERVATORY=6 CONSERVATORY value
 * @property {number} BALLROOM=7 BALLROOM value
 * @property {number} KITCHEN=8 KITCHEN value
 */
$root.Room = (function() {
    var valuesById = {}, values = Object.create(valuesById);
    values[valuesById[0] = "STUDY"] = 0;
    values[valuesById[1] = "HALL"] = 1;
    values[valuesById[2] = "LOUNGE"] = 2;
    values[valuesById[3] = "LIBRARY"] = 3;
    values[valuesById[4] = "BILLIARD"] = 4;
    values[valuesById[5] = "DINING"] = 5;
    values[valuesById[6] = "CONSERVATORY"] = 6;
    values[valuesById[7] = "BALLROOM"] = 7;
    values[valuesById[8] = "KITCHEN"] = 8;
    return values;
})();

/**
 * Hallway enum.
 * @exports Hallway
 * @enum {number}
 * @property {number} STUDY_HALL=0 STUDY_HALL value
 * @property {number} HALL_LOUNGE=1 HALL_LOUNGE value
 * @property {number} STUDY_LIBRARY=2 STUDY_LIBRARY value
 * @property {number} HALL_BILLIARD=3 HALL_BILLIARD value
 * @property {number} LOUNGE_DINING=4 LOUNGE_DINING value
 * @property {number} LIBRARY_BILLIARD=5 LIBRARY_BILLIARD value
 * @property {number} BILLIARD_DINING=6 BILLIARD_DINING value
 * @property {number} LIBRARY_CONSERVATORY=7 LIBRARY_CONSERVATORY value
 * @property {number} BILLIARD_BALLROOM=8 BILLIARD_BALLROOM value
 * @property {number} DINING_KITCHEN=9 DINING_KITCHEN value
 * @property {number} CONSERVATORY_BALLROOM=10 CONSERVATORY_BALLROOM value
 * @property {number} BALLROOM_KITCHEN=11 BALLROOM_KITCHEN value
 */
$root.Hallway = (function() {
    var valuesById = {}, values = Object.create(valuesById);
    values[valuesById[0] = "STUDY_HALL"] = 0;
    values[valuesById[1] = "HALL_LOUNGE"] = 1;
    values[valuesById[2] = "STUDY_LIBRARY"] = 2;
    values[valuesById[3] = "HALL_BILLIARD"] = 3;
    values[valuesById[4] = "LOUNGE_DINING"] = 4;
    values[valuesById[5] = "LIBRARY_BILLIARD"] = 5;
    values[valuesById[6] = "BILLIARD_DINING"] = 6;
    values[valuesById[7] = "LIBRARY_CONSERVATORY"] = 7;
    values[valuesById[8] = "BILLIARD_BALLROOM"] = 8;
    values[valuesById[9] = "DINING_KITCHEN"] = 9;
    values[valuesById[10] = "CONSERVATORY_BALLROOM"] = 10;
    values[valuesById[11] = "BALLROOM_KITCHEN"] = 11;
    return values;
})();

$root.Location = (function() {

    /**
     * Properties of a Location.
     * @exports ILocation
     * @interface ILocation
     * @property {Room|null} [room] Location room
     * @property {Hallway|null} [hallway] Location hallway
     */

    /**
     * Constructs a new Location.
     * @exports Location
     * @classdesc Represents a Location.
     * @implements ILocation
     * @constructor
     * @param {ILocation=} [properties] Properties to set
     */
    function Location(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * Location room.
     * @member {Room} room
     * @memberof Location
     * @instance
     */
    Location.prototype.room = 0;

    /**
     * Location hallway.
     * @member {Hallway} hallway
     * @memberof Location
     * @instance
     */
    Location.prototype.hallway = 0;

    // OneOf field names bound to virtual getters and setters
    var $oneOfFields;

    /**
     * Location value.
     * @member {"room"|"hallway"|undefined} value
     * @memberof Location
     * @instance
     */
    Object.defineProperty(Location.prototype, "value", {
        get: $util.oneOfGetter($oneOfFields = ["room", "hallway"]),
        set: $util.oneOfSetter($oneOfFields)
    });

    /**
     * Creates a new Location instance using the specified properties.
     * @function create
     * @memberof Location
     * @static
     * @param {ILocation=} [properties] Properties to set
     * @returns {Location} Location instance
     */
    Location.create = function create(properties) {
        return new Location(properties);
    };

    /**
     * Encodes the specified Location message. Does not implicitly {@link Location.verify|verify} messages.
     * @function encode
     * @memberof Location
     * @static
     * @param {ILocation} message Location message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Location.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.room != null && Object.hasOwnProperty.call(message, "room"))
            writer.uint32(/* id 1, wireType 0 =*/8).int32(message.room);
        if (message.hallway != null && Object.hasOwnProperty.call(message, "hallway"))
            writer.uint32(/* id 2, wireType 0 =*/16).int32(message.hallway);
        return writer;
    };

    /**
     * Encodes the specified Location message, length delimited. Does not implicitly {@link Location.verify|verify} messages.
     * @function encodeDelimited
     * @memberof Location
     * @static
     * @param {ILocation} message Location message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Location.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a Location message from the specified reader or buffer.
     * @function decode
     * @memberof Location
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {Location} Location
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Location.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Location();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.room = reader.int32();
                break;
            case 2:
                message.hallway = reader.int32();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a Location message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof Location
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {Location} Location
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Location.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a Location message.
     * @function verify
     * @memberof Location
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    Location.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        var properties = {};
        if (message.room != null && message.hasOwnProperty("room")) {
            properties.value = 1;
            switch (message.room) {
            default:
                return "room: enum value expected";
            case 0:
            case 1:
            case 2:
            case 3:
            case 4:
            case 5:
            case 6:
            case 7:
            case 8:
                break;
            }
        }
        if (message.hallway != null && message.hasOwnProperty("hallway")) {
            if (properties.value === 1)
                return "value: multiple values";
            properties.value = 1;
            switch (message.hallway) {
            default:
                return "hallway: enum value expected";
            case 0:
            case 1:
            case 2:
            case 3:
            case 4:
            case 5:
            case 6:
            case 7:
            case 8:
            case 9:
            case 10:
            case 11:
                break;
            }
        }
        return null;
    };

    /**
     * Creates a Location message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof Location
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {Location} Location
     */
    Location.fromObject = function fromObject(object) {
        if (object instanceof $root.Location)
            return object;
        var message = new $root.Location();
        switch (object.room) {
        case "STUDY":
        case 0:
            message.room = 0;
            break;
        case "HALL":
        case 1:
            message.room = 1;
            break;
        case "LOUNGE":
        case 2:
            message.room = 2;
            break;
        case "LIBRARY":
        case 3:
            message.room = 3;
            break;
        case "BILLIARD":
        case 4:
            message.room = 4;
            break;
        case "DINING":
        case 5:
            message.room = 5;
            break;
        case "CONSERVATORY":
        case 6:
            message.room = 6;
            break;
        case "BALLROOM":
        case 7:
            message.room = 7;
            break;
        case "KITCHEN":
        case 8:
            message.room = 8;
            break;
        }
        switch (object.hallway) {
        case "STUDY_HALL":
        case 0:
            message.hallway = 0;
            break;
        case "HALL_LOUNGE":
        case 1:
            message.hallway = 1;
            break;
        case "STUDY_LIBRARY":
        case 2:
            message.hallway = 2;
            break;
        case "HALL_BILLIARD":
        case 3:
            message.hallway = 3;
            break;
        case "LOUNGE_DINING":
        case 4:
            message.hallway = 4;
            break;
        case "LIBRARY_BILLIARD":
        case 5:
            message.hallway = 5;
            break;
        case "BILLIARD_DINING":
        case 6:
            message.hallway = 6;
            break;
        case "LIBRARY_CONSERVATORY":
        case 7:
            message.hallway = 7;
            break;
        case "BILLIARD_BALLROOM":
        case 8:
            message.hallway = 8;
            break;
        case "DINING_KITCHEN":
        case 9:
            message.hallway = 9;
            break;
        case "CONSERVATORY_BALLROOM":
        case 10:
            message.hallway = 10;
            break;
        case "BALLROOM_KITCHEN":
        case 11:
            message.hallway = 11;
            break;
        }
        return message;
    };

    /**
     * Creates a plain object from a Location message. Also converts values to other types if specified.
     * @function toObject
     * @memberof Location
     * @static
     * @param {Location} message Location
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    Location.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (message.room != null && message.hasOwnProperty("room")) {
            object.room = options.enums === String ? $root.Room[message.room] : message.room;
            if (options.oneofs)
                object.value = "room";
        }
        if (message.hallway != null && message.hasOwnProperty("hallway")) {
            object.hallway = options.enums === String ? $root.Hallway[message.hallway] : message.hallway;
            if (options.oneofs)
                object.value = "hallway";
        }
        return object;
    };

    /**
     * Converts this Location to JSON.
     * @function toJSON
     * @memberof Location
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    Location.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return Location;
})();

$root.Available = (function() {

    /**
     * Properties of an Available.
     * @exports IAvailable
     * @interface IAvailable
     * @property {Array.<Character>|null} [characters] Available characters
     */

    /**
     * Constructs a new Available.
     * @exports Available
     * @classdesc Represents an Available.
     * @implements IAvailable
     * @constructor
     * @param {IAvailable=} [properties] Properties to set
     */
    function Available(properties) {
        this.characters = [];
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * Available characters.
     * @member {Array.<Character>} characters
     * @memberof Available
     * @instance
     */
    Available.prototype.characters = $util.emptyArray;

    /**
     * Creates a new Available instance using the specified properties.
     * @function create
     * @memberof Available
     * @static
     * @param {IAvailable=} [properties] Properties to set
     * @returns {Available} Available instance
     */
    Available.create = function create(properties) {
        return new Available(properties);
    };

    /**
     * Encodes the specified Available message. Does not implicitly {@link Available.verify|verify} messages.
     * @function encode
     * @memberof Available
     * @static
     * @param {IAvailable} message Available message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Available.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.characters != null && message.characters.length) {
            writer.uint32(/* id 1, wireType 2 =*/10).fork();
            for (var i = 0; i < message.characters.length; ++i)
                writer.int32(message.characters[i]);
            writer.ldelim();
        }
        return writer;
    };

    /**
     * Encodes the specified Available message, length delimited. Does not implicitly {@link Available.verify|verify} messages.
     * @function encodeDelimited
     * @memberof Available
     * @static
     * @param {IAvailable} message Available message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Available.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes an Available message from the specified reader or buffer.
     * @function decode
     * @memberof Available
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {Available} Available
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Available.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Available();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                if (!(message.characters && message.characters.length))
                    message.characters = [];
                if ((tag & 7) === 2) {
                    var end2 = reader.uint32() + reader.pos;
                    while (reader.pos < end2)
                        message.characters.push(reader.int32());
                } else
                    message.characters.push(reader.int32());
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes an Available message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof Available
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {Available} Available
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Available.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies an Available message.
     * @function verify
     * @memberof Available
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    Available.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.characters != null && message.hasOwnProperty("characters")) {
            if (!Array.isArray(message.characters))
                return "characters: array expected";
            for (var i = 0; i < message.characters.length; ++i)
                switch (message.characters[i]) {
                default:
                    return "characters: enum value[] expected";
                case 0:
                case 1:
                case 2:
                case 3:
                case 4:
                case 5:
                    break;
                }
        }
        return null;
    };

    /**
     * Creates an Available message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof Available
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {Available} Available
     */
    Available.fromObject = function fromObject(object) {
        if (object instanceof $root.Available)
            return object;
        var message = new $root.Available();
        if (object.characters) {
            if (!Array.isArray(object.characters))
                throw TypeError(".Available.characters: array expected");
            message.characters = [];
            for (var i = 0; i < object.characters.length; ++i)
                switch (object.characters[i]) {
                default:
                case "YELLOW":
                case 0:
                    message.characters[i] = 0;
                    break;
                case "RED":
                case 1:
                    message.characters[i] = 1;
                    break;
                case "PURPLE":
                case 2:
                    message.characters[i] = 2;
                    break;
                case "GREEN":
                case 3:
                    message.characters[i] = 3;
                    break;
                case "WHITE":
                case 4:
                    message.characters[i] = 4;
                    break;
                case "BLUE":
                case 5:
                    message.characters[i] = 5;
                    break;
                }
        }
        return message;
    };

    /**
     * Creates a plain object from an Available message. Also converts values to other types if specified.
     * @function toObject
     * @memberof Available
     * @static
     * @param {Available} message Available
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    Available.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.arrays || options.defaults)
            object.characters = [];
        if (message.characters && message.characters.length) {
            object.characters = [];
            for (var j = 0; j < message.characters.length; ++j)
                object.characters[j] = options.enums === String ? $root.Character[message.characters[j]] : message.characters[j];
        }
        return object;
    };

    /**
     * Converts this Available to JSON.
     * @function toJSON
     * @memberof Available
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    Available.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return Available;
})();

$root.Registration = (function() {

    /**
     * Properties of a Registration.
     * @exports IRegistration
     * @interface IRegistration
     * @property {Character|null} [character] Registration character
     * @property {string|null} [displayName] Registration displayName
     */

    /**
     * Constructs a new Registration.
     * @exports Registration
     * @classdesc Represents a Registration.
     * @implements IRegistration
     * @constructor
     * @param {IRegistration=} [properties] Properties to set
     */
    function Registration(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * Registration character.
     * @member {Character} character
     * @memberof Registration
     * @instance
     */
    Registration.prototype.character = 0;

    /**
     * Registration displayName.
     * @member {string} displayName
     * @memberof Registration
     * @instance
     */
    Registration.prototype.displayName = "";

    /**
     * Creates a new Registration instance using the specified properties.
     * @function create
     * @memberof Registration
     * @static
     * @param {IRegistration=} [properties] Properties to set
     * @returns {Registration} Registration instance
     */
    Registration.create = function create(properties) {
        return new Registration(properties);
    };

    /**
     * Encodes the specified Registration message. Does not implicitly {@link Registration.verify|verify} messages.
     * @function encode
     * @memberof Registration
     * @static
     * @param {IRegistration} message Registration message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Registration.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.character != null && Object.hasOwnProperty.call(message, "character"))
            writer.uint32(/* id 1, wireType 0 =*/8).int32(message.character);
        if (message.displayName != null && Object.hasOwnProperty.call(message, "displayName"))
            writer.uint32(/* id 2, wireType 2 =*/18).string(message.displayName);
        return writer;
    };

    /**
     * Encodes the specified Registration message, length delimited. Does not implicitly {@link Registration.verify|verify} messages.
     * @function encodeDelimited
     * @memberof Registration
     * @static
     * @param {IRegistration} message Registration message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Registration.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a Registration message from the specified reader or buffer.
     * @function decode
     * @memberof Registration
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {Registration} Registration
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Registration.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Registration();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.character = reader.int32();
                break;
            case 2:
                message.displayName = reader.string();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a Registration message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof Registration
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {Registration} Registration
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Registration.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a Registration message.
     * @function verify
     * @memberof Registration
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    Registration.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.character != null && message.hasOwnProperty("character"))
            switch (message.character) {
            default:
                return "character: enum value expected";
            case 0:
            case 1:
            case 2:
            case 3:
            case 4:
            case 5:
                break;
            }
        if (message.displayName != null && message.hasOwnProperty("displayName"))
            if (!$util.isString(message.displayName))
                return "displayName: string expected";
        return null;
    };

    /**
     * Creates a Registration message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof Registration
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {Registration} Registration
     */
    Registration.fromObject = function fromObject(object) {
        if (object instanceof $root.Registration)
            return object;
        var message = new $root.Registration();
        switch (object.character) {
        case "YELLOW":
        case 0:
            message.character = 0;
            break;
        case "RED":
        case 1:
            message.character = 1;
            break;
        case "PURPLE":
        case 2:
            message.character = 2;
            break;
        case "GREEN":
        case 3:
            message.character = 3;
            break;
        case "WHITE":
        case 4:
            message.character = 4;
            break;
        case "BLUE":
        case 5:
            message.character = 5;
            break;
        }
        if (object.displayName != null)
            message.displayName = String(object.displayName);
        return message;
    };

    /**
     * Creates a plain object from a Registration message. Also converts values to other types if specified.
     * @function toObject
     * @memberof Registration
     * @static
     * @param {Registration} message Registration
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    Registration.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.defaults) {
            object.character = options.enums === String ? "YELLOW" : 0;
            object.displayName = "";
        }
        if (message.character != null && message.hasOwnProperty("character"))
            object.character = options.enums === String ? $root.Character[message.character] : message.character;
        if (message.displayName != null && message.hasOwnProperty("displayName"))
            object.displayName = message.displayName;
        return object;
    };

    /**
     * Converts this Registration to JSON.
     * @function toJSON
     * @memberof Registration
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    Registration.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return Registration;
})();

$root.Position = (function() {

    /**
     * Properties of a Position.
     * @exports IPosition
     * @interface IPosition
     * @property {Character|null} [player] Position player
     * @property {ILocation|null} [location] Position location
     */

    /**
     * Constructs a new Position.
     * @exports Position
     * @classdesc Represents a Position.
     * @implements IPosition
     * @constructor
     * @param {IPosition=} [properties] Properties to set
     */
    function Position(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * Position player.
     * @member {Character} player
     * @memberof Position
     * @instance
     */
    Position.prototype.player = 0;

    /**
     * Position location.
     * @member {ILocation|null|undefined} location
     * @memberof Position
     * @instance
     */
    Position.prototype.location = null;

    /**
     * Creates a new Position instance using the specified properties.
     * @function create
     * @memberof Position
     * @static
     * @param {IPosition=} [properties] Properties to set
     * @returns {Position} Position instance
     */
    Position.create = function create(properties) {
        return new Position(properties);
    };

    /**
     * Encodes the specified Position message. Does not implicitly {@link Position.verify|verify} messages.
     * @function encode
     * @memberof Position
     * @static
     * @param {IPosition} message Position message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Position.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.player != null && Object.hasOwnProperty.call(message, "player"))
            writer.uint32(/* id 1, wireType 0 =*/8).int32(message.player);
        if (message.location != null && Object.hasOwnProperty.call(message, "location"))
            $root.Location.encode(message.location, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
        return writer;
    };

    /**
     * Encodes the specified Position message, length delimited. Does not implicitly {@link Position.verify|verify} messages.
     * @function encodeDelimited
     * @memberof Position
     * @static
     * @param {IPosition} message Position message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Position.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a Position message from the specified reader or buffer.
     * @function decode
     * @memberof Position
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {Position} Position
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Position.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Position();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.player = reader.int32();
                break;
            case 2:
                message.location = $root.Location.decode(reader, reader.uint32());
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a Position message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof Position
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {Position} Position
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Position.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a Position message.
     * @function verify
     * @memberof Position
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    Position.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.player != null && message.hasOwnProperty("player"))
            switch (message.player) {
            default:
                return "player: enum value expected";
            case 0:
            case 1:
            case 2:
            case 3:
            case 4:
            case 5:
                break;
            }
        if (message.location != null && message.hasOwnProperty("location")) {
            var error = $root.Location.verify(message.location);
            if (error)
                return "location." + error;
        }
        return null;
    };

    /**
     * Creates a Position message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof Position
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {Position} Position
     */
    Position.fromObject = function fromObject(object) {
        if (object instanceof $root.Position)
            return object;
        var message = new $root.Position();
        switch (object.player) {
        case "YELLOW":
        case 0:
            message.player = 0;
            break;
        case "RED":
        case 1:
            message.player = 1;
            break;
        case "PURPLE":
        case 2:
            message.player = 2;
            break;
        case "GREEN":
        case 3:
            message.player = 3;
            break;
        case "WHITE":
        case 4:
            message.player = 4;
            break;
        case "BLUE":
        case 5:
            message.player = 5;
            break;
        }
        if (object.location != null) {
            if (typeof object.location !== "object")
                throw TypeError(".Position.location: object expected");
            message.location = $root.Location.fromObject(object.location);
        }
        return message;
    };

    /**
     * Creates a plain object from a Position message. Also converts values to other types if specified.
     * @function toObject
     * @memberof Position
     * @static
     * @param {Position} message Position
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    Position.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.defaults) {
            object.player = options.enums === String ? "YELLOW" : 0;
            object.location = null;
        }
        if (message.player != null && message.hasOwnProperty("player"))
            object.player = options.enums === String ? $root.Character[message.player] : message.player;
        if (message.location != null && message.hasOwnProperty("location"))
            object.location = $root.Location.toObject(message.location, options);
        return object;
    };

    /**
     * Converts this Position to JSON.
     * @function toJSON
     * @memberof Position
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    Position.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return Position;
})();

$root.WitnessItem = (function() {

    /**
     * Properties of a WitnessItem.
     * @exports IWitnessItem
     * @interface IWitnessItem
     * @property {Character|null} [character] WitnessItem character
     * @property {Room|null} [room] WitnessItem room
     * @property {Weapon|null} [weapon] WitnessItem weapon
     */

    /**
     * Constructs a new WitnessItem.
     * @exports WitnessItem
     * @classdesc Represents a WitnessItem.
     * @implements IWitnessItem
     * @constructor
     * @param {IWitnessItem=} [properties] Properties to set
     */
    function WitnessItem(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * WitnessItem character.
     * @member {Character} character
     * @memberof WitnessItem
     * @instance
     */
    WitnessItem.prototype.character = 0;

    /**
     * WitnessItem room.
     * @member {Room} room
     * @memberof WitnessItem
     * @instance
     */
    WitnessItem.prototype.room = 0;

    /**
     * WitnessItem weapon.
     * @member {Weapon} weapon
     * @memberof WitnessItem
     * @instance
     */
    WitnessItem.prototype.weapon = 0;

    // OneOf field names bound to virtual getters and setters
    var $oneOfFields;

    /**
     * WitnessItem value.
     * @member {"character"|"room"|"weapon"|undefined} value
     * @memberof WitnessItem
     * @instance
     */
    Object.defineProperty(WitnessItem.prototype, "value", {
        get: $util.oneOfGetter($oneOfFields = ["character", "room", "weapon"]),
        set: $util.oneOfSetter($oneOfFields)
    });

    /**
     * Creates a new WitnessItem instance using the specified properties.
     * @function create
     * @memberof WitnessItem
     * @static
     * @param {IWitnessItem=} [properties] Properties to set
     * @returns {WitnessItem} WitnessItem instance
     */
    WitnessItem.create = function create(properties) {
        return new WitnessItem(properties);
    };

    /**
     * Encodes the specified WitnessItem message. Does not implicitly {@link WitnessItem.verify|verify} messages.
     * @function encode
     * @memberof WitnessItem
     * @static
     * @param {IWitnessItem} message WitnessItem message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    WitnessItem.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.character != null && Object.hasOwnProperty.call(message, "character"))
            writer.uint32(/* id 1, wireType 0 =*/8).int32(message.character);
        if (message.room != null && Object.hasOwnProperty.call(message, "room"))
            writer.uint32(/* id 2, wireType 0 =*/16).int32(message.room);
        if (message.weapon != null && Object.hasOwnProperty.call(message, "weapon"))
            writer.uint32(/* id 3, wireType 0 =*/24).int32(message.weapon);
        return writer;
    };

    /**
     * Encodes the specified WitnessItem message, length delimited. Does not implicitly {@link WitnessItem.verify|verify} messages.
     * @function encodeDelimited
     * @memberof WitnessItem
     * @static
     * @param {IWitnessItem} message WitnessItem message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    WitnessItem.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a WitnessItem message from the specified reader or buffer.
     * @function decode
     * @memberof WitnessItem
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {WitnessItem} WitnessItem
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    WitnessItem.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.WitnessItem();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.character = reader.int32();
                break;
            case 2:
                message.room = reader.int32();
                break;
            case 3:
                message.weapon = reader.int32();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a WitnessItem message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof WitnessItem
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {WitnessItem} WitnessItem
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    WitnessItem.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a WitnessItem message.
     * @function verify
     * @memberof WitnessItem
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    WitnessItem.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        var properties = {};
        if (message.character != null && message.hasOwnProperty("character")) {
            properties.value = 1;
            switch (message.character) {
            default:
                return "character: enum value expected";
            case 0:
            case 1:
            case 2:
            case 3:
            case 4:
            case 5:
                break;
            }
        }
        if (message.room != null && message.hasOwnProperty("room")) {
            if (properties.value === 1)
                return "value: multiple values";
            properties.value = 1;
            switch (message.room) {
            default:
                return "room: enum value expected";
            case 0:
            case 1:
            case 2:
            case 3:
            case 4:
            case 5:
            case 6:
            case 7:
            case 8:
                break;
            }
        }
        if (message.weapon != null && message.hasOwnProperty("weapon")) {
            if (properties.value === 1)
                return "value: multiple values";
            properties.value = 1;
            switch (message.weapon) {
            default:
                return "weapon: enum value expected";
            case 0:
            case 1:
            case 2:
            case 3:
            case 4:
            case 5:
                break;
            }
        }
        return null;
    };

    /**
     * Creates a WitnessItem message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof WitnessItem
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {WitnessItem} WitnessItem
     */
    WitnessItem.fromObject = function fromObject(object) {
        if (object instanceof $root.WitnessItem)
            return object;
        var message = new $root.WitnessItem();
        switch (object.character) {
        case "YELLOW":
        case 0:
            message.character = 0;
            break;
        case "RED":
        case 1:
            message.character = 1;
            break;
        case "PURPLE":
        case 2:
            message.character = 2;
            break;
        case "GREEN":
        case 3:
            message.character = 3;
            break;
        case "WHITE":
        case 4:
            message.character = 4;
            break;
        case "BLUE":
        case 5:
            message.character = 5;
            break;
        }
        switch (object.room) {
        case "STUDY":
        case 0:
            message.room = 0;
            break;
        case "HALL":
        case 1:
            message.room = 1;
            break;
        case "LOUNGE":
        case 2:
            message.room = 2;
            break;
        case "LIBRARY":
        case 3:
            message.room = 3;
            break;
        case "BILLIARD":
        case 4:
            message.room = 4;
            break;
        case "DINING":
        case 5:
            message.room = 5;
            break;
        case "CONSERVATORY":
        case 6:
            message.room = 6;
            break;
        case "BALLROOM":
        case 7:
            message.room = 7;
            break;
        case "KITCHEN":
        case 8:
            message.room = 8;
            break;
        }
        switch (object.weapon) {
        case "ROPE":
        case 0:
            message.weapon = 0;
            break;
        case "PIPE":
        case 1:
            message.weapon = 1;
            break;
        case "KNIFE":
        case 2:
            message.weapon = 2;
            break;
        case "WRENCH":
        case 3:
            message.weapon = 3;
            break;
        case "CANDLESTICK":
        case 4:
            message.weapon = 4;
            break;
        case "REVOLVER":
        case 5:
            message.weapon = 5;
            break;
        }
        return message;
    };

    /**
     * Creates a plain object from a WitnessItem message. Also converts values to other types if specified.
     * @function toObject
     * @memberof WitnessItem
     * @static
     * @param {WitnessItem} message WitnessItem
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    WitnessItem.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (message.character != null && message.hasOwnProperty("character")) {
            object.character = options.enums === String ? $root.Character[message.character] : message.character;
            if (options.oneofs)
                object.value = "character";
        }
        if (message.room != null && message.hasOwnProperty("room")) {
            object.room = options.enums === String ? $root.Room[message.room] : message.room;
            if (options.oneofs)
                object.value = "room";
        }
        if (message.weapon != null && message.hasOwnProperty("weapon")) {
            object.weapon = options.enums === String ? $root.Weapon[message.weapon] : message.weapon;
            if (options.oneofs)
                object.value = "weapon";
        }
        return object;
    };

    /**
     * Converts this WitnessItem to JSON.
     * @function toJSON
     * @memberof WitnessItem
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    WitnessItem.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return WitnessItem;
})();

$root.Witness = (function() {

    /**
     * Properties of a Witness.
     * @exports IWitness
     * @interface IWitness
     * @property {IWitnessItem|null} [item1] Witness item1
     * @property {IWitnessItem|null} [item2] Witness item2
     * @property {IWitnessItem|null} [item3] Witness item3
     */

    /**
     * Constructs a new Witness.
     * @exports Witness
     * @classdesc Represents a Witness.
     * @implements IWitness
     * @constructor
     * @param {IWitness=} [properties] Properties to set
     */
    function Witness(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * Witness item1.
     * @member {IWitnessItem|null|undefined} item1
     * @memberof Witness
     * @instance
     */
    Witness.prototype.item1 = null;

    /**
     * Witness item2.
     * @member {IWitnessItem|null|undefined} item2
     * @memberof Witness
     * @instance
     */
    Witness.prototype.item2 = null;

    /**
     * Witness item3.
     * @member {IWitnessItem|null|undefined} item3
     * @memberof Witness
     * @instance
     */
    Witness.prototype.item3 = null;

    /**
     * Creates a new Witness instance using the specified properties.
     * @function create
     * @memberof Witness
     * @static
     * @param {IWitness=} [properties] Properties to set
     * @returns {Witness} Witness instance
     */
    Witness.create = function create(properties) {
        return new Witness(properties);
    };

    /**
     * Encodes the specified Witness message. Does not implicitly {@link Witness.verify|verify} messages.
     * @function encode
     * @memberof Witness
     * @static
     * @param {IWitness} message Witness message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Witness.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.item1 != null && Object.hasOwnProperty.call(message, "item1"))
            $root.WitnessItem.encode(message.item1, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
        if (message.item2 != null && Object.hasOwnProperty.call(message, "item2"))
            $root.WitnessItem.encode(message.item2, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
        if (message.item3 != null && Object.hasOwnProperty.call(message, "item3"))
            $root.WitnessItem.encode(message.item3, writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
        return writer;
    };

    /**
     * Encodes the specified Witness message, length delimited. Does not implicitly {@link Witness.verify|verify} messages.
     * @function encodeDelimited
     * @memberof Witness
     * @static
     * @param {IWitness} message Witness message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Witness.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a Witness message from the specified reader or buffer.
     * @function decode
     * @memberof Witness
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {Witness} Witness
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Witness.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Witness();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.item1 = $root.WitnessItem.decode(reader, reader.uint32());
                break;
            case 2:
                message.item2 = $root.WitnessItem.decode(reader, reader.uint32());
                break;
            case 3:
                message.item3 = $root.WitnessItem.decode(reader, reader.uint32());
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a Witness message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof Witness
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {Witness} Witness
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Witness.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a Witness message.
     * @function verify
     * @memberof Witness
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    Witness.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.item1 != null && message.hasOwnProperty("item1")) {
            var error = $root.WitnessItem.verify(message.item1);
            if (error)
                return "item1." + error;
        }
        if (message.item2 != null && message.hasOwnProperty("item2")) {
            var error = $root.WitnessItem.verify(message.item2);
            if (error)
                return "item2." + error;
        }
        if (message.item3 != null && message.hasOwnProperty("item3")) {
            var error = $root.WitnessItem.verify(message.item3);
            if (error)
                return "item3." + error;
        }
        return null;
    };

    /**
     * Creates a Witness message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof Witness
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {Witness} Witness
     */
    Witness.fromObject = function fromObject(object) {
        if (object instanceof $root.Witness)
            return object;
        var message = new $root.Witness();
        if (object.item1 != null) {
            if (typeof object.item1 !== "object")
                throw TypeError(".Witness.item1: object expected");
            message.item1 = $root.WitnessItem.fromObject(object.item1);
        }
        if (object.item2 != null) {
            if (typeof object.item2 !== "object")
                throw TypeError(".Witness.item2: object expected");
            message.item2 = $root.WitnessItem.fromObject(object.item2);
        }
        if (object.item3 != null) {
            if (typeof object.item3 !== "object")
                throw TypeError(".Witness.item3: object expected");
            message.item3 = $root.WitnessItem.fromObject(object.item3);
        }
        return message;
    };

    /**
     * Creates a plain object from a Witness message. Also converts values to other types if specified.
     * @function toObject
     * @memberof Witness
     * @static
     * @param {Witness} message Witness
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    Witness.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.defaults) {
            object.item1 = null;
            object.item2 = null;
            object.item3 = null;
        }
        if (message.item1 != null && message.hasOwnProperty("item1"))
            object.item1 = $root.WitnessItem.toObject(message.item1, options);
        if (message.item2 != null && message.hasOwnProperty("item2"))
            object.item2 = $root.WitnessItem.toObject(message.item2, options);
        if (message.item3 != null && message.hasOwnProperty("item3"))
            object.item3 = $root.WitnessItem.toObject(message.item3, options);
        return object;
    };

    /**
     * Converts this Witness to JSON.
     * @function toJSON
     * @memberof Witness
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    Witness.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return Witness;
})();

$root.PlayerTurn = (function() {

    /**
     * Properties of a PlayerTurn.
     * @exports IPlayerTurn
     * @interface IPlayerTurn
     */

    /**
     * Constructs a new PlayerTurn.
     * @exports PlayerTurn
     * @classdesc Represents a PlayerTurn.
     * @implements IPlayerTurn
     * @constructor
     * @param {IPlayerTurn=} [properties] Properties to set
     */
    function PlayerTurn(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * Creates a new PlayerTurn instance using the specified properties.
     * @function create
     * @memberof PlayerTurn
     * @static
     * @param {IPlayerTurn=} [properties] Properties to set
     * @returns {PlayerTurn} PlayerTurn instance
     */
    PlayerTurn.create = function create(properties) {
        return new PlayerTurn(properties);
    };

    /**
     * Encodes the specified PlayerTurn message. Does not implicitly {@link PlayerTurn.verify|verify} messages.
     * @function encode
     * @memberof PlayerTurn
     * @static
     * @param {IPlayerTurn} message PlayerTurn message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    PlayerTurn.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        return writer;
    };

    /**
     * Encodes the specified PlayerTurn message, length delimited. Does not implicitly {@link PlayerTurn.verify|verify} messages.
     * @function encodeDelimited
     * @memberof PlayerTurn
     * @static
     * @param {IPlayerTurn} message PlayerTurn message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    PlayerTurn.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a PlayerTurn message from the specified reader or buffer.
     * @function decode
     * @memberof PlayerTurn
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {PlayerTurn} PlayerTurn
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    PlayerTurn.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.PlayerTurn();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a PlayerTurn message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof PlayerTurn
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {PlayerTurn} PlayerTurn
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    PlayerTurn.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a PlayerTurn message.
     * @function verify
     * @memberof PlayerTurn
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    PlayerTurn.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        return null;
    };

    /**
     * Creates a PlayerTurn message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof PlayerTurn
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {PlayerTurn} PlayerTurn
     */
    PlayerTurn.fromObject = function fromObject(object) {
        if (object instanceof $root.PlayerTurn)
            return object;
        return new $root.PlayerTurn();
    };

    /**
     * Creates a plain object from a PlayerTurn message. Also converts values to other types if specified.
     * @function toObject
     * @memberof PlayerTurn
     * @static
     * @param {PlayerTurn} message PlayerTurn
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    PlayerTurn.toObject = function toObject() {
        return {};
    };

    /**
     * Converts this PlayerTurn to JSON.
     * @function toJSON
     * @memberof PlayerTurn
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    PlayerTurn.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return PlayerTurn;
})();

$root.Suggestion = (function() {

    /**
     * Properties of a Suggestion.
     * @exports ISuggestion
     * @interface ISuggestion
     * @property {Character|null} [player] Suggestion player
     * @property {Room|null} [room] Suggestion room
     * @property {Character|null} [suspect] Suggestion suspect
     * @property {Weapon|null} [weapon] Suggestion weapon
     */

    /**
     * Constructs a new Suggestion.
     * @exports Suggestion
     * @classdesc Represents a Suggestion.
     * @implements ISuggestion
     * @constructor
     * @param {ISuggestion=} [properties] Properties to set
     */
    function Suggestion(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * Suggestion player.
     * @member {Character} player
     * @memberof Suggestion
     * @instance
     */
    Suggestion.prototype.player = 0;

    /**
     * Suggestion room.
     * @member {Room} room
     * @memberof Suggestion
     * @instance
     */
    Suggestion.prototype.room = 0;

    /**
     * Suggestion suspect.
     * @member {Character} suspect
     * @memberof Suggestion
     * @instance
     */
    Suggestion.prototype.suspect = 0;

    /**
     * Suggestion weapon.
     * @member {Weapon} weapon
     * @memberof Suggestion
     * @instance
     */
    Suggestion.prototype.weapon = 0;

    /**
     * Creates a new Suggestion instance using the specified properties.
     * @function create
     * @memberof Suggestion
     * @static
     * @param {ISuggestion=} [properties] Properties to set
     * @returns {Suggestion} Suggestion instance
     */
    Suggestion.create = function create(properties) {
        return new Suggestion(properties);
    };

    /**
     * Encodes the specified Suggestion message. Does not implicitly {@link Suggestion.verify|verify} messages.
     * @function encode
     * @memberof Suggestion
     * @static
     * @param {ISuggestion} message Suggestion message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Suggestion.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.player != null && Object.hasOwnProperty.call(message, "player"))
            writer.uint32(/* id 1, wireType 0 =*/8).int32(message.player);
        if (message.room != null && Object.hasOwnProperty.call(message, "room"))
            writer.uint32(/* id 2, wireType 0 =*/16).int32(message.room);
        if (message.suspect != null && Object.hasOwnProperty.call(message, "suspect"))
            writer.uint32(/* id 3, wireType 0 =*/24).int32(message.suspect);
        if (message.weapon != null && Object.hasOwnProperty.call(message, "weapon"))
            writer.uint32(/* id 4, wireType 0 =*/32).int32(message.weapon);
        return writer;
    };

    /**
     * Encodes the specified Suggestion message, length delimited. Does not implicitly {@link Suggestion.verify|verify} messages.
     * @function encodeDelimited
     * @memberof Suggestion
     * @static
     * @param {ISuggestion} message Suggestion message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Suggestion.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a Suggestion message from the specified reader or buffer.
     * @function decode
     * @memberof Suggestion
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {Suggestion} Suggestion
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Suggestion.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Suggestion();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.player = reader.int32();
                break;
            case 2:
                message.room = reader.int32();
                break;
            case 3:
                message.suspect = reader.int32();
                break;
            case 4:
                message.weapon = reader.int32();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a Suggestion message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof Suggestion
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {Suggestion} Suggestion
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Suggestion.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a Suggestion message.
     * @function verify
     * @memberof Suggestion
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    Suggestion.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.player != null && message.hasOwnProperty("player"))
            switch (message.player) {
            default:
                return "player: enum value expected";
            case 0:
            case 1:
            case 2:
            case 3:
            case 4:
            case 5:
                break;
            }
        if (message.room != null && message.hasOwnProperty("room"))
            switch (message.room) {
            default:
                return "room: enum value expected";
            case 0:
            case 1:
            case 2:
            case 3:
            case 4:
            case 5:
            case 6:
            case 7:
            case 8:
                break;
            }
        if (message.suspect != null && message.hasOwnProperty("suspect"))
            switch (message.suspect) {
            default:
                return "suspect: enum value expected";
            case 0:
            case 1:
            case 2:
            case 3:
            case 4:
            case 5:
                break;
            }
        if (message.weapon != null && message.hasOwnProperty("weapon"))
            switch (message.weapon) {
            default:
                return "weapon: enum value expected";
            case 0:
            case 1:
            case 2:
            case 3:
            case 4:
            case 5:
                break;
            }
        return null;
    };

    /**
     * Creates a Suggestion message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof Suggestion
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {Suggestion} Suggestion
     */
    Suggestion.fromObject = function fromObject(object) {
        if (object instanceof $root.Suggestion)
            return object;
        var message = new $root.Suggestion();
        switch (object.player) {
        case "YELLOW":
        case 0:
            message.player = 0;
            break;
        case "RED":
        case 1:
            message.player = 1;
            break;
        case "PURPLE":
        case 2:
            message.player = 2;
            break;
        case "GREEN":
        case 3:
            message.player = 3;
            break;
        case "WHITE":
        case 4:
            message.player = 4;
            break;
        case "BLUE":
        case 5:
            message.player = 5;
            break;
        }
        switch (object.room) {
        case "STUDY":
        case 0:
            message.room = 0;
            break;
        case "HALL":
        case 1:
            message.room = 1;
            break;
        case "LOUNGE":
        case 2:
            message.room = 2;
            break;
        case "LIBRARY":
        case 3:
            message.room = 3;
            break;
        case "BILLIARD":
        case 4:
            message.room = 4;
            break;
        case "DINING":
        case 5:
            message.room = 5;
            break;
        case "CONSERVATORY":
        case 6:
            message.room = 6;
            break;
        case "BALLROOM":
        case 7:
            message.room = 7;
            break;
        case "KITCHEN":
        case 8:
            message.room = 8;
            break;
        }
        switch (object.suspect) {
        case "YELLOW":
        case 0:
            message.suspect = 0;
            break;
        case "RED":
        case 1:
            message.suspect = 1;
            break;
        case "PURPLE":
        case 2:
            message.suspect = 2;
            break;
        case "GREEN":
        case 3:
            message.suspect = 3;
            break;
        case "WHITE":
        case 4:
            message.suspect = 4;
            break;
        case "BLUE":
        case 5:
            message.suspect = 5;
            break;
        }
        switch (object.weapon) {
        case "ROPE":
        case 0:
            message.weapon = 0;
            break;
        case "PIPE":
        case 1:
            message.weapon = 1;
            break;
        case "KNIFE":
        case 2:
            message.weapon = 2;
            break;
        case "WRENCH":
        case 3:
            message.weapon = 3;
            break;
        case "CANDLESTICK":
        case 4:
            message.weapon = 4;
            break;
        case "REVOLVER":
        case 5:
            message.weapon = 5;
            break;
        }
        return message;
    };

    /**
     * Creates a plain object from a Suggestion message. Also converts values to other types if specified.
     * @function toObject
     * @memberof Suggestion
     * @static
     * @param {Suggestion} message Suggestion
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    Suggestion.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.defaults) {
            object.player = options.enums === String ? "YELLOW" : 0;
            object.room = options.enums === String ? "STUDY" : 0;
            object.suspect = options.enums === String ? "YELLOW" : 0;
            object.weapon = options.enums === String ? "ROPE" : 0;
        }
        if (message.player != null && message.hasOwnProperty("player"))
            object.player = options.enums === String ? $root.Character[message.player] : message.player;
        if (message.room != null && message.hasOwnProperty("room"))
            object.room = options.enums === String ? $root.Room[message.room] : message.room;
        if (message.suspect != null && message.hasOwnProperty("suspect"))
            object.suspect = options.enums === String ? $root.Character[message.suspect] : message.suspect;
        if (message.weapon != null && message.hasOwnProperty("weapon"))
            object.weapon = options.enums === String ? $root.Weapon[message.weapon] : message.weapon;
        return object;
    };

    /**
     * Converts this Suggestion to JSON.
     * @function toJSON
     * @memberof Suggestion
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    Suggestion.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return Suggestion;
})();

$root.SuggestionQuery = (function() {

    /**
     * Properties of a SuggestionQuery.
     * @exports ISuggestionQuery
     * @interface ISuggestionQuery
     */

    /**
     * Constructs a new SuggestionQuery.
     * @exports SuggestionQuery
     * @classdesc Represents a SuggestionQuery.
     * @implements ISuggestionQuery
     * @constructor
     * @param {ISuggestionQuery=} [properties] Properties to set
     */
    function SuggestionQuery(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * Creates a new SuggestionQuery instance using the specified properties.
     * @function create
     * @memberof SuggestionQuery
     * @static
     * @param {ISuggestionQuery=} [properties] Properties to set
     * @returns {SuggestionQuery} SuggestionQuery instance
     */
    SuggestionQuery.create = function create(properties) {
        return new SuggestionQuery(properties);
    };

    /**
     * Encodes the specified SuggestionQuery message. Does not implicitly {@link SuggestionQuery.verify|verify} messages.
     * @function encode
     * @memberof SuggestionQuery
     * @static
     * @param {ISuggestionQuery} message SuggestionQuery message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    SuggestionQuery.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        return writer;
    };

    /**
     * Encodes the specified SuggestionQuery message, length delimited. Does not implicitly {@link SuggestionQuery.verify|verify} messages.
     * @function encodeDelimited
     * @memberof SuggestionQuery
     * @static
     * @param {ISuggestionQuery} message SuggestionQuery message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    SuggestionQuery.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a SuggestionQuery message from the specified reader or buffer.
     * @function decode
     * @memberof SuggestionQuery
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {SuggestionQuery} SuggestionQuery
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    SuggestionQuery.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.SuggestionQuery();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a SuggestionQuery message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof SuggestionQuery
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {SuggestionQuery} SuggestionQuery
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    SuggestionQuery.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a SuggestionQuery message.
     * @function verify
     * @memberof SuggestionQuery
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    SuggestionQuery.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        return null;
    };

    /**
     * Creates a SuggestionQuery message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof SuggestionQuery
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {SuggestionQuery} SuggestionQuery
     */
    SuggestionQuery.fromObject = function fromObject(object) {
        if (object instanceof $root.SuggestionQuery)
            return object;
        return new $root.SuggestionQuery();
    };

    /**
     * Creates a plain object from a SuggestionQuery message. Also converts values to other types if specified.
     * @function toObject
     * @memberof SuggestionQuery
     * @static
     * @param {SuggestionQuery} message SuggestionQuery
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    SuggestionQuery.toObject = function toObject() {
        return {};
    };

    /**
     * Converts this SuggestionQuery to JSON.
     * @function toJSON
     * @memberof SuggestionQuery
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    SuggestionQuery.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return SuggestionQuery;
})();

$root.SuggestionStatus = (function() {

    /**
     * Properties of a SuggestionStatus.
     * @exports ISuggestionStatus
     * @interface ISuggestionStatus
     * @property {Character|null} [character] SuggestionStatus character
     * @property {SuggestionStatus.Status|null} [status] SuggestionStatus status
     */

    /**
     * Constructs a new SuggestionStatus.
     * @exports SuggestionStatus
     * @classdesc Represents a SuggestionStatus.
     * @implements ISuggestionStatus
     * @constructor
     * @param {ISuggestionStatus=} [properties] Properties to set
     */
    function SuggestionStatus(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * SuggestionStatus character.
     * @member {Character} character
     * @memberof SuggestionStatus
     * @instance
     */
    SuggestionStatus.prototype.character = 0;

    /**
     * SuggestionStatus status.
     * @member {SuggestionStatus.Status} status
     * @memberof SuggestionStatus
     * @instance
     */
    SuggestionStatus.prototype.status = 0;

    /**
     * Creates a new SuggestionStatus instance using the specified properties.
     * @function create
     * @memberof SuggestionStatus
     * @static
     * @param {ISuggestionStatus=} [properties] Properties to set
     * @returns {SuggestionStatus} SuggestionStatus instance
     */
    SuggestionStatus.create = function create(properties) {
        return new SuggestionStatus(properties);
    };

    /**
     * Encodes the specified SuggestionStatus message. Does not implicitly {@link SuggestionStatus.verify|verify} messages.
     * @function encode
     * @memberof SuggestionStatus
     * @static
     * @param {ISuggestionStatus} message SuggestionStatus message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    SuggestionStatus.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.character != null && Object.hasOwnProperty.call(message, "character"))
            writer.uint32(/* id 1, wireType 0 =*/8).int32(message.character);
        if (message.status != null && Object.hasOwnProperty.call(message, "status"))
            writer.uint32(/* id 2, wireType 0 =*/16).int32(message.status);
        return writer;
    };

    /**
     * Encodes the specified SuggestionStatus message, length delimited. Does not implicitly {@link SuggestionStatus.verify|verify} messages.
     * @function encodeDelimited
     * @memberof SuggestionStatus
     * @static
     * @param {ISuggestionStatus} message SuggestionStatus message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    SuggestionStatus.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a SuggestionStatus message from the specified reader or buffer.
     * @function decode
     * @memberof SuggestionStatus
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {SuggestionStatus} SuggestionStatus
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    SuggestionStatus.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.SuggestionStatus();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.character = reader.int32();
                break;
            case 2:
                message.status = reader.int32();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a SuggestionStatus message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof SuggestionStatus
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {SuggestionStatus} SuggestionStatus
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    SuggestionStatus.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a SuggestionStatus message.
     * @function verify
     * @memberof SuggestionStatus
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    SuggestionStatus.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.character != null && message.hasOwnProperty("character"))
            switch (message.character) {
            default:
                return "character: enum value expected";
            case 0:
            case 1:
            case 2:
            case 3:
            case 4:
            case 5:
                break;
            }
        if (message.status != null && message.hasOwnProperty("status"))
            switch (message.status) {
            default:
                return "status: enum value expected";
            case 0:
            case 1:
                break;
            }
        return null;
    };

    /**
     * Creates a SuggestionStatus message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof SuggestionStatus
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {SuggestionStatus} SuggestionStatus
     */
    SuggestionStatus.fromObject = function fromObject(object) {
        if (object instanceof $root.SuggestionStatus)
            return object;
        var message = new $root.SuggestionStatus();
        switch (object.character) {
        case "YELLOW":
        case 0:
            message.character = 0;
            break;
        case "RED":
        case 1:
            message.character = 1;
            break;
        case "PURPLE":
        case 2:
            message.character = 2;
            break;
        case "GREEN":
        case 3:
            message.character = 3;
            break;
        case "WHITE":
        case 4:
            message.character = 4;
            break;
        case "BLUE":
        case 5:
            message.character = 5;
            break;
        }
        switch (object.status) {
        case "DENIED":
        case 0:
            message.status = 0;
            break;
        case "WITNESSED":
        case 1:
            message.status = 1;
            break;
        }
        return message;
    };

    /**
     * Creates a plain object from a SuggestionStatus message. Also converts values to other types if specified.
     * @function toObject
     * @memberof SuggestionStatus
     * @static
     * @param {SuggestionStatus} message SuggestionStatus
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    SuggestionStatus.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.defaults) {
            object.character = options.enums === String ? "YELLOW" : 0;
            object.status = options.enums === String ? "DENIED" : 0;
        }
        if (message.character != null && message.hasOwnProperty("character"))
            object.character = options.enums === String ? $root.Character[message.character] : message.character;
        if (message.status != null && message.hasOwnProperty("status"))
            object.status = options.enums === String ? $root.SuggestionStatus.Status[message.status] : message.status;
        return object;
    };

    /**
     * Converts this SuggestionStatus to JSON.
     * @function toJSON
     * @memberof SuggestionStatus
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    SuggestionStatus.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    /**
     * Status enum.
     * @name SuggestionStatus.Status
     * @enum {number}
     * @property {number} DENIED=0 DENIED value
     * @property {number} WITNESSED=1 WITNESSED value
     */
    SuggestionStatus.Status = (function() {
        var valuesById = {}, values = Object.create(valuesById);
        values[valuesById[0] = "DENIED"] = 0;
        values[valuesById[1] = "WITNESSED"] = 1;
        return values;
    })();

    return SuggestionStatus;
})();

/**
 * None enum.
 * @exports None
 * @enum {number}
 * @property {number} NONE=0 NONE value
 */
$root.None = (function() {
    var valuesById = {}, values = Object.create(valuesById);
    values[valuesById[0] = "NONE"] = 0;
    return values;
})();

$root.WitnessResponseItem = (function() {

    /**
     * Properties of a WitnessResponseItem.
     * @exports IWitnessResponseItem
     * @interface IWitnessResponseItem
     * @property {IWitnessItem|null} [item] WitnessResponseItem item
     * @property {None|null} [none] WitnessResponseItem none
     */

    /**
     * Constructs a new WitnessResponseItem.
     * @exports WitnessResponseItem
     * @classdesc Represents a WitnessResponseItem.
     * @implements IWitnessResponseItem
     * @constructor
     * @param {IWitnessResponseItem=} [properties] Properties to set
     */
    function WitnessResponseItem(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * WitnessResponseItem item.
     * @member {IWitnessItem|null|undefined} item
     * @memberof WitnessResponseItem
     * @instance
     */
    WitnessResponseItem.prototype.item = null;

    /**
     * WitnessResponseItem none.
     * @member {None} none
     * @memberof WitnessResponseItem
     * @instance
     */
    WitnessResponseItem.prototype.none = 0;

    // OneOf field names bound to virtual getters and setters
    var $oneOfFields;

    /**
     * WitnessResponseItem value.
     * @member {"item"|"none"|undefined} value
     * @memberof WitnessResponseItem
     * @instance
     */
    Object.defineProperty(WitnessResponseItem.prototype, "value", {
        get: $util.oneOfGetter($oneOfFields = ["item", "none"]),
        set: $util.oneOfSetter($oneOfFields)
    });

    /**
     * Creates a new WitnessResponseItem instance using the specified properties.
     * @function create
     * @memberof WitnessResponseItem
     * @static
     * @param {IWitnessResponseItem=} [properties] Properties to set
     * @returns {WitnessResponseItem} WitnessResponseItem instance
     */
    WitnessResponseItem.create = function create(properties) {
        return new WitnessResponseItem(properties);
    };

    /**
     * Encodes the specified WitnessResponseItem message. Does not implicitly {@link WitnessResponseItem.verify|verify} messages.
     * @function encode
     * @memberof WitnessResponseItem
     * @static
     * @param {IWitnessResponseItem} message WitnessResponseItem message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    WitnessResponseItem.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.item != null && Object.hasOwnProperty.call(message, "item"))
            $root.WitnessItem.encode(message.item, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
        if (message.none != null && Object.hasOwnProperty.call(message, "none"))
            writer.uint32(/* id 2, wireType 0 =*/16).int32(message.none);
        return writer;
    };

    /**
     * Encodes the specified WitnessResponseItem message, length delimited. Does not implicitly {@link WitnessResponseItem.verify|verify} messages.
     * @function encodeDelimited
     * @memberof WitnessResponseItem
     * @static
     * @param {IWitnessResponseItem} message WitnessResponseItem message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    WitnessResponseItem.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a WitnessResponseItem message from the specified reader or buffer.
     * @function decode
     * @memberof WitnessResponseItem
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {WitnessResponseItem} WitnessResponseItem
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    WitnessResponseItem.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.WitnessResponseItem();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.item = $root.WitnessItem.decode(reader, reader.uint32());
                break;
            case 2:
                message.none = reader.int32();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a WitnessResponseItem message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof WitnessResponseItem
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {WitnessResponseItem} WitnessResponseItem
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    WitnessResponseItem.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a WitnessResponseItem message.
     * @function verify
     * @memberof WitnessResponseItem
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    WitnessResponseItem.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        var properties = {};
        if (message.item != null && message.hasOwnProperty("item")) {
            properties.value = 1;
            {
                var error = $root.WitnessItem.verify(message.item);
                if (error)
                    return "item." + error;
            }
        }
        if (message.none != null && message.hasOwnProperty("none")) {
            if (properties.value === 1)
                return "value: multiple values";
            properties.value = 1;
            switch (message.none) {
            default:
                return "none: enum value expected";
            case 0:
                break;
            }
        }
        return null;
    };

    /**
     * Creates a WitnessResponseItem message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof WitnessResponseItem
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {WitnessResponseItem} WitnessResponseItem
     */
    WitnessResponseItem.fromObject = function fromObject(object) {
        if (object instanceof $root.WitnessResponseItem)
            return object;
        var message = new $root.WitnessResponseItem();
        if (object.item != null) {
            if (typeof object.item !== "object")
                throw TypeError(".WitnessResponseItem.item: object expected");
            message.item = $root.WitnessItem.fromObject(object.item);
        }
        switch (object.none) {
        case "NONE":
        case 0:
            message.none = 0;
            break;
        }
        return message;
    };

    /**
     * Creates a plain object from a WitnessResponseItem message. Also converts values to other types if specified.
     * @function toObject
     * @memberof WitnessResponseItem
     * @static
     * @param {WitnessResponseItem} message WitnessResponseItem
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    WitnessResponseItem.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (message.item != null && message.hasOwnProperty("item")) {
            object.item = $root.WitnessItem.toObject(message.item, options);
            if (options.oneofs)
                object.value = "item";
        }
        if (message.none != null && message.hasOwnProperty("none")) {
            object.none = options.enums === String ? $root.None[message.none] : message.none;
            if (options.oneofs)
                object.value = "none";
        }
        return object;
    };

    /**
     * Converts this WitnessResponseItem to JSON.
     * @function toJSON
     * @memberof WitnessResponseItem
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    WitnessResponseItem.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return WitnessResponseItem;
})();

$root.SuggestionWitness = (function() {

    /**
     * Properties of a SuggestionWitness.
     * @exports ISuggestionWitness
     * @interface ISuggestionWitness
     * @property {Character|null} [character] SuggestionWitness character
     * @property {IWitnessResponseItem|null} [item] SuggestionWitness item
     */

    /**
     * Constructs a new SuggestionWitness.
     * @exports SuggestionWitness
     * @classdesc Represents a SuggestionWitness.
     * @implements ISuggestionWitness
     * @constructor
     * @param {ISuggestionWitness=} [properties] Properties to set
     */
    function SuggestionWitness(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * SuggestionWitness character.
     * @member {Character} character
     * @memberof SuggestionWitness
     * @instance
     */
    SuggestionWitness.prototype.character = 0;

    /**
     * SuggestionWitness item.
     * @member {IWitnessResponseItem|null|undefined} item
     * @memberof SuggestionWitness
     * @instance
     */
    SuggestionWitness.prototype.item = null;

    /**
     * Creates a new SuggestionWitness instance using the specified properties.
     * @function create
     * @memberof SuggestionWitness
     * @static
     * @param {ISuggestionWitness=} [properties] Properties to set
     * @returns {SuggestionWitness} SuggestionWitness instance
     */
    SuggestionWitness.create = function create(properties) {
        return new SuggestionWitness(properties);
    };

    /**
     * Encodes the specified SuggestionWitness message. Does not implicitly {@link SuggestionWitness.verify|verify} messages.
     * @function encode
     * @memberof SuggestionWitness
     * @static
     * @param {ISuggestionWitness} message SuggestionWitness message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    SuggestionWitness.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.character != null && Object.hasOwnProperty.call(message, "character"))
            writer.uint32(/* id 1, wireType 0 =*/8).int32(message.character);
        if (message.item != null && Object.hasOwnProperty.call(message, "item"))
            $root.WitnessResponseItem.encode(message.item, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
        return writer;
    };

    /**
     * Encodes the specified SuggestionWitness message, length delimited. Does not implicitly {@link SuggestionWitness.verify|verify} messages.
     * @function encodeDelimited
     * @memberof SuggestionWitness
     * @static
     * @param {ISuggestionWitness} message SuggestionWitness message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    SuggestionWitness.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a SuggestionWitness message from the specified reader or buffer.
     * @function decode
     * @memberof SuggestionWitness
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {SuggestionWitness} SuggestionWitness
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    SuggestionWitness.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.SuggestionWitness();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.character = reader.int32();
                break;
            case 2:
                message.item = $root.WitnessResponseItem.decode(reader, reader.uint32());
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a SuggestionWitness message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof SuggestionWitness
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {SuggestionWitness} SuggestionWitness
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    SuggestionWitness.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a SuggestionWitness message.
     * @function verify
     * @memberof SuggestionWitness
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    SuggestionWitness.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.character != null && message.hasOwnProperty("character"))
            switch (message.character) {
            default:
                return "character: enum value expected";
            case 0:
            case 1:
            case 2:
            case 3:
            case 4:
            case 5:
                break;
            }
        if (message.item != null && message.hasOwnProperty("item")) {
            var error = $root.WitnessResponseItem.verify(message.item);
            if (error)
                return "item." + error;
        }
        return null;
    };

    /**
     * Creates a SuggestionWitness message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof SuggestionWitness
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {SuggestionWitness} SuggestionWitness
     */
    SuggestionWitness.fromObject = function fromObject(object) {
        if (object instanceof $root.SuggestionWitness)
            return object;
        var message = new $root.SuggestionWitness();
        switch (object.character) {
        case "YELLOW":
        case 0:
            message.character = 0;
            break;
        case "RED":
        case 1:
            message.character = 1;
            break;
        case "PURPLE":
        case 2:
            message.character = 2;
            break;
        case "GREEN":
        case 3:
            message.character = 3;
            break;
        case "WHITE":
        case 4:
            message.character = 4;
            break;
        case "BLUE":
        case 5:
            message.character = 5;
            break;
        }
        if (object.item != null) {
            if (typeof object.item !== "object")
                throw TypeError(".SuggestionWitness.item: object expected");
            message.item = $root.WitnessResponseItem.fromObject(object.item);
        }
        return message;
    };

    /**
     * Creates a plain object from a SuggestionWitness message. Also converts values to other types if specified.
     * @function toObject
     * @memberof SuggestionWitness
     * @static
     * @param {SuggestionWitness} message SuggestionWitness
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    SuggestionWitness.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.defaults) {
            object.character = options.enums === String ? "YELLOW" : 0;
            object.item = null;
        }
        if (message.character != null && message.hasOwnProperty("character"))
            object.character = options.enums === String ? $root.Character[message.character] : message.character;
        if (message.item != null && message.hasOwnProperty("item"))
            object.item = $root.WitnessResponseItem.toObject(message.item, options);
        return object;
    };

    /**
     * Converts this SuggestionWitness to JSON.
     * @function toJSON
     * @memberof SuggestionWitness
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    SuggestionWitness.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return SuggestionWitness;
})();

$root.Accusation = (function() {

    /**
     * Properties of an Accusation.
     * @exports IAccusation
     * @interface IAccusation
     * @property {Character|null} [player] Accusation player
     * @property {Room|null} [room] Accusation room
     * @property {Character|null} [suspect] Accusation suspect
     * @property {Weapon|null} [weapon] Accusation weapon
     */

    /**
     * Constructs a new Accusation.
     * @exports Accusation
     * @classdesc Represents an Accusation.
     * @implements IAccusation
     * @constructor
     * @param {IAccusation=} [properties] Properties to set
     */
    function Accusation(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * Accusation player.
     * @member {Character} player
     * @memberof Accusation
     * @instance
     */
    Accusation.prototype.player = 0;

    /**
     * Accusation room.
     * @member {Room} room
     * @memberof Accusation
     * @instance
     */
    Accusation.prototype.room = 0;

    /**
     * Accusation suspect.
     * @member {Character} suspect
     * @memberof Accusation
     * @instance
     */
    Accusation.prototype.suspect = 0;

    /**
     * Accusation weapon.
     * @member {Weapon} weapon
     * @memberof Accusation
     * @instance
     */
    Accusation.prototype.weapon = 0;

    /**
     * Creates a new Accusation instance using the specified properties.
     * @function create
     * @memberof Accusation
     * @static
     * @param {IAccusation=} [properties] Properties to set
     * @returns {Accusation} Accusation instance
     */
    Accusation.create = function create(properties) {
        return new Accusation(properties);
    };

    /**
     * Encodes the specified Accusation message. Does not implicitly {@link Accusation.verify|verify} messages.
     * @function encode
     * @memberof Accusation
     * @static
     * @param {IAccusation} message Accusation message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Accusation.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.player != null && Object.hasOwnProperty.call(message, "player"))
            writer.uint32(/* id 1, wireType 0 =*/8).int32(message.player);
        if (message.room != null && Object.hasOwnProperty.call(message, "room"))
            writer.uint32(/* id 2, wireType 0 =*/16).int32(message.room);
        if (message.suspect != null && Object.hasOwnProperty.call(message, "suspect"))
            writer.uint32(/* id 3, wireType 0 =*/24).int32(message.suspect);
        if (message.weapon != null && Object.hasOwnProperty.call(message, "weapon"))
            writer.uint32(/* id 4, wireType 0 =*/32).int32(message.weapon);
        return writer;
    };

    /**
     * Encodes the specified Accusation message, length delimited. Does not implicitly {@link Accusation.verify|verify} messages.
     * @function encodeDelimited
     * @memberof Accusation
     * @static
     * @param {IAccusation} message Accusation message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Accusation.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes an Accusation message from the specified reader or buffer.
     * @function decode
     * @memberof Accusation
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {Accusation} Accusation
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Accusation.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Accusation();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.player = reader.int32();
                break;
            case 2:
                message.room = reader.int32();
                break;
            case 3:
                message.suspect = reader.int32();
                break;
            case 4:
                message.weapon = reader.int32();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes an Accusation message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof Accusation
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {Accusation} Accusation
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Accusation.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies an Accusation message.
     * @function verify
     * @memberof Accusation
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    Accusation.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.player != null && message.hasOwnProperty("player"))
            switch (message.player) {
            default:
                return "player: enum value expected";
            case 0:
            case 1:
            case 2:
            case 3:
            case 4:
            case 5:
                break;
            }
        if (message.room != null && message.hasOwnProperty("room"))
            switch (message.room) {
            default:
                return "room: enum value expected";
            case 0:
            case 1:
            case 2:
            case 3:
            case 4:
            case 5:
            case 6:
            case 7:
            case 8:
                break;
            }
        if (message.suspect != null && message.hasOwnProperty("suspect"))
            switch (message.suspect) {
            default:
                return "suspect: enum value expected";
            case 0:
            case 1:
            case 2:
            case 3:
            case 4:
            case 5:
                break;
            }
        if (message.weapon != null && message.hasOwnProperty("weapon"))
            switch (message.weapon) {
            default:
                return "weapon: enum value expected";
            case 0:
            case 1:
            case 2:
            case 3:
            case 4:
            case 5:
                break;
            }
        return null;
    };

    /**
     * Creates an Accusation message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof Accusation
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {Accusation} Accusation
     */
    Accusation.fromObject = function fromObject(object) {
        if (object instanceof $root.Accusation)
            return object;
        var message = new $root.Accusation();
        switch (object.player) {
        case "YELLOW":
        case 0:
            message.player = 0;
            break;
        case "RED":
        case 1:
            message.player = 1;
            break;
        case "PURPLE":
        case 2:
            message.player = 2;
            break;
        case "GREEN":
        case 3:
            message.player = 3;
            break;
        case "WHITE":
        case 4:
            message.player = 4;
            break;
        case "BLUE":
        case 5:
            message.player = 5;
            break;
        }
        switch (object.room) {
        case "STUDY":
        case 0:
            message.room = 0;
            break;
        case "HALL":
        case 1:
            message.room = 1;
            break;
        case "LOUNGE":
        case 2:
            message.room = 2;
            break;
        case "LIBRARY":
        case 3:
            message.room = 3;
            break;
        case "BILLIARD":
        case 4:
            message.room = 4;
            break;
        case "DINING":
        case 5:
            message.room = 5;
            break;
        case "CONSERVATORY":
        case 6:
            message.room = 6;
            break;
        case "BALLROOM":
        case 7:
            message.room = 7;
            break;
        case "KITCHEN":
        case 8:
            message.room = 8;
            break;
        }
        switch (object.suspect) {
        case "YELLOW":
        case 0:
            message.suspect = 0;
            break;
        case "RED":
        case 1:
            message.suspect = 1;
            break;
        case "PURPLE":
        case 2:
            message.suspect = 2;
            break;
        case "GREEN":
        case 3:
            message.suspect = 3;
            break;
        case "WHITE":
        case 4:
            message.suspect = 4;
            break;
        case "BLUE":
        case 5:
            message.suspect = 5;
            break;
        }
        switch (object.weapon) {
        case "ROPE":
        case 0:
            message.weapon = 0;
            break;
        case "PIPE":
        case 1:
            message.weapon = 1;
            break;
        case "KNIFE":
        case 2:
            message.weapon = 2;
            break;
        case "WRENCH":
        case 3:
            message.weapon = 3;
            break;
        case "CANDLESTICK":
        case 4:
            message.weapon = 4;
            break;
        case "REVOLVER":
        case 5:
            message.weapon = 5;
            break;
        }
        return message;
    };

    /**
     * Creates a plain object from an Accusation message. Also converts values to other types if specified.
     * @function toObject
     * @memberof Accusation
     * @static
     * @param {Accusation} message Accusation
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    Accusation.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.defaults) {
            object.player = options.enums === String ? "YELLOW" : 0;
            object.room = options.enums === String ? "STUDY" : 0;
            object.suspect = options.enums === String ? "YELLOW" : 0;
            object.weapon = options.enums === String ? "ROPE" : 0;
        }
        if (message.player != null && message.hasOwnProperty("player"))
            object.player = options.enums === String ? $root.Character[message.player] : message.player;
        if (message.room != null && message.hasOwnProperty("room"))
            object.room = options.enums === String ? $root.Room[message.room] : message.room;
        if (message.suspect != null && message.hasOwnProperty("suspect"))
            object.suspect = options.enums === String ? $root.Character[message.suspect] : message.suspect;
        if (message.weapon != null && message.hasOwnProperty("weapon"))
            object.weapon = options.enums === String ? $root.Weapon[message.weapon] : message.weapon;
        return object;
    };

    /**
     * Converts this Accusation to JSON.
     * @function toJSON
     * @memberof Accusation
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    Accusation.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return Accusation;
})();

$root.Winner = (function() {

    /**
     * Properties of a Winner.
     * @exports IWinner
     * @interface IWinner
     * @property {Character|null} [player] Winner player
     */

    /**
     * Constructs a new Winner.
     * @exports Winner
     * @classdesc Represents a Winner.
     * @implements IWinner
     * @constructor
     * @param {IWinner=} [properties] Properties to set
     */
    function Winner(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * Winner player.
     * @member {Character} player
     * @memberof Winner
     * @instance
     */
    Winner.prototype.player = 0;

    /**
     * Creates a new Winner instance using the specified properties.
     * @function create
     * @memberof Winner
     * @static
     * @param {IWinner=} [properties] Properties to set
     * @returns {Winner} Winner instance
     */
    Winner.create = function create(properties) {
        return new Winner(properties);
    };

    /**
     * Encodes the specified Winner message. Does not implicitly {@link Winner.verify|verify} messages.
     * @function encode
     * @memberof Winner
     * @static
     * @param {IWinner} message Winner message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Winner.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.player != null && Object.hasOwnProperty.call(message, "player"))
            writer.uint32(/* id 1, wireType 0 =*/8).int32(message.player);
        return writer;
    };

    /**
     * Encodes the specified Winner message, length delimited. Does not implicitly {@link Winner.verify|verify} messages.
     * @function encodeDelimited
     * @memberof Winner
     * @static
     * @param {IWinner} message Winner message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Winner.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a Winner message from the specified reader or buffer.
     * @function decode
     * @memberof Winner
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {Winner} Winner
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Winner.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Winner();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.player = reader.int32();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a Winner message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof Winner
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {Winner} Winner
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Winner.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a Winner message.
     * @function verify
     * @memberof Winner
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    Winner.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.player != null && message.hasOwnProperty("player"))
            switch (message.player) {
            default:
                return "player: enum value expected";
            case 0:
            case 1:
            case 2:
            case 3:
            case 4:
            case 5:
                break;
            }
        return null;
    };

    /**
     * Creates a Winner message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof Winner
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {Winner} Winner
     */
    Winner.fromObject = function fromObject(object) {
        if (object instanceof $root.Winner)
            return object;
        var message = new $root.Winner();
        switch (object.player) {
        case "YELLOW":
        case 0:
            message.player = 0;
            break;
        case "RED":
        case 1:
            message.player = 1;
            break;
        case "PURPLE":
        case 2:
            message.player = 2;
            break;
        case "GREEN":
        case 3:
            message.player = 3;
            break;
        case "WHITE":
        case 4:
            message.player = 4;
            break;
        case "BLUE":
        case 5:
            message.player = 5;
            break;
        }
        return message;
    };

    /**
     * Creates a plain object from a Winner message. Also converts values to other types if specified.
     * @function toObject
     * @memberof Winner
     * @static
     * @param {Winner} message Winner
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    Winner.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.defaults)
            object.player = options.enums === String ? "YELLOW" : 0;
        if (message.player != null && message.hasOwnProperty("player"))
            object.player = options.enums === String ? $root.Character[message.player] : message.player;
        return object;
    };

    /**
     * Converts this Winner to JSON.
     * @function toJSON
     * @memberof Winner
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    Winner.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return Winner;
})();

$root.Disqualified = (function() {

    /**
     * Properties of a Disqualified.
     * @exports IDisqualified
     * @interface IDisqualified
     * @property {Character|null} [player] Disqualified player
     */

    /**
     * Constructs a new Disqualified.
     * @exports Disqualified
     * @classdesc Represents a Disqualified.
     * @implements IDisqualified
     * @constructor
     * @param {IDisqualified=} [properties] Properties to set
     */
    function Disqualified(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * Disqualified player.
     * @member {Character} player
     * @memberof Disqualified
     * @instance
     */
    Disqualified.prototype.player = 0;

    /**
     * Creates a new Disqualified instance using the specified properties.
     * @function create
     * @memberof Disqualified
     * @static
     * @param {IDisqualified=} [properties] Properties to set
     * @returns {Disqualified} Disqualified instance
     */
    Disqualified.create = function create(properties) {
        return new Disqualified(properties);
    };

    /**
     * Encodes the specified Disqualified message. Does not implicitly {@link Disqualified.verify|verify} messages.
     * @function encode
     * @memberof Disqualified
     * @static
     * @param {IDisqualified} message Disqualified message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Disqualified.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.player != null && Object.hasOwnProperty.call(message, "player"))
            writer.uint32(/* id 1, wireType 0 =*/8).int32(message.player);
        return writer;
    };

    /**
     * Encodes the specified Disqualified message, length delimited. Does not implicitly {@link Disqualified.verify|verify} messages.
     * @function encodeDelimited
     * @memberof Disqualified
     * @static
     * @param {IDisqualified} message Disqualified message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Disqualified.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a Disqualified message from the specified reader or buffer.
     * @function decode
     * @memberof Disqualified
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {Disqualified} Disqualified
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Disqualified.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Disqualified();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.player = reader.int32();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a Disqualified message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof Disqualified
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {Disqualified} Disqualified
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Disqualified.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a Disqualified message.
     * @function verify
     * @memberof Disqualified
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    Disqualified.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.player != null && message.hasOwnProperty("player"))
            switch (message.player) {
            default:
                return "player: enum value expected";
            case 0:
            case 1:
            case 2:
            case 3:
            case 4:
            case 5:
                break;
            }
        return null;
    };

    /**
     * Creates a Disqualified message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof Disqualified
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {Disqualified} Disqualified
     */
    Disqualified.fromObject = function fromObject(object) {
        if (object instanceof $root.Disqualified)
            return object;
        var message = new $root.Disqualified();
        switch (object.player) {
        case "YELLOW":
        case 0:
            message.player = 0;
            break;
        case "RED":
        case 1:
            message.player = 1;
            break;
        case "PURPLE":
        case 2:
            message.player = 2;
            break;
        case "GREEN":
        case 3:
            message.player = 3;
            break;
        case "WHITE":
        case 4:
            message.player = 4;
            break;
        case "BLUE":
        case 5:
            message.player = 5;
            break;
        }
        return message;
    };

    /**
     * Creates a plain object from a Disqualified message. Also converts values to other types if specified.
     * @function toObject
     * @memberof Disqualified
     * @static
     * @param {Disqualified} message Disqualified
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    Disqualified.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.defaults)
            object.player = options.enums === String ? "YELLOW" : 0;
        if (message.player != null && message.hasOwnProperty("player"))
            object.player = options.enums === String ? $root.Character[message.player] : message.player;
        return object;
    };

    /**
     * Converts this Disqualified to JSON.
     * @function toJSON
     * @memberof Disqualified
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    Disqualified.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return Disqualified;
})();

$root.Register = (function() {

    /**
     * Properties of a Register.
     * @exports IRegister
     * @interface IRegister
     * @property {Character|null} [character] Register character
     * @property {string|null} [displayName] Register displayName
     */

    /**
     * Constructs a new Register.
     * @exports Register
     * @classdesc Represents a Register.
     * @implements IRegister
     * @constructor
     * @param {IRegister=} [properties] Properties to set
     */
    function Register(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * Register character.
     * @member {Character} character
     * @memberof Register
     * @instance
     */
    Register.prototype.character = 0;

    /**
     * Register displayName.
     * @member {string} displayName
     * @memberof Register
     * @instance
     */
    Register.prototype.displayName = "";

    /**
     * Creates a new Register instance using the specified properties.
     * @function create
     * @memberof Register
     * @static
     * @param {IRegister=} [properties] Properties to set
     * @returns {Register} Register instance
     */
    Register.create = function create(properties) {
        return new Register(properties);
    };

    /**
     * Encodes the specified Register message. Does not implicitly {@link Register.verify|verify} messages.
     * @function encode
     * @memberof Register
     * @static
     * @param {IRegister} message Register message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Register.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.character != null && Object.hasOwnProperty.call(message, "character"))
            writer.uint32(/* id 1, wireType 0 =*/8).int32(message.character);
        if (message.displayName != null && Object.hasOwnProperty.call(message, "displayName"))
            writer.uint32(/* id 2, wireType 2 =*/18).string(message.displayName);
        return writer;
    };

    /**
     * Encodes the specified Register message, length delimited. Does not implicitly {@link Register.verify|verify} messages.
     * @function encodeDelimited
     * @memberof Register
     * @static
     * @param {IRegister} message Register message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Register.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a Register message from the specified reader or buffer.
     * @function decode
     * @memberof Register
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {Register} Register
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Register.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Register();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.character = reader.int32();
                break;
            case 2:
                message.displayName = reader.string();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a Register message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof Register
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {Register} Register
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Register.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a Register message.
     * @function verify
     * @memberof Register
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    Register.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.character != null && message.hasOwnProperty("character"))
            switch (message.character) {
            default:
                return "character: enum value expected";
            case 0:
            case 1:
            case 2:
            case 3:
            case 4:
            case 5:
                break;
            }
        if (message.displayName != null && message.hasOwnProperty("displayName"))
            if (!$util.isString(message.displayName))
                return "displayName: string expected";
        return null;
    };

    /**
     * Creates a Register message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof Register
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {Register} Register
     */
    Register.fromObject = function fromObject(object) {
        if (object instanceof $root.Register)
            return object;
        var message = new $root.Register();
        switch (object.character) {
        case "YELLOW":
        case 0:
            message.character = 0;
            break;
        case "RED":
        case 1:
            message.character = 1;
            break;
        case "PURPLE":
        case 2:
            message.character = 2;
            break;
        case "GREEN":
        case 3:
            message.character = 3;
            break;
        case "WHITE":
        case 4:
            message.character = 4;
            break;
        case "BLUE":
        case 5:
            message.character = 5;
            break;
        }
        if (object.displayName != null)
            message.displayName = String(object.displayName);
        return message;
    };

    /**
     * Creates a plain object from a Register message. Also converts values to other types if specified.
     * @function toObject
     * @memberof Register
     * @static
     * @param {Register} message Register
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    Register.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.defaults) {
            object.character = options.enums === String ? "YELLOW" : 0;
            object.displayName = "";
        }
        if (message.character != null && message.hasOwnProperty("character"))
            object.character = options.enums === String ? $root.Character[message.character] : message.character;
        if (message.displayName != null && message.hasOwnProperty("displayName"))
            object.displayName = message.displayName;
        return object;
    };

    /**
     * Converts this Register to JSON.
     * @function toJSON
     * @memberof Register
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    Register.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return Register;
})();

$root.Complete = (function() {

    /**
     * Properties of a Complete.
     * @exports IComplete
     * @interface IComplete
     */

    /**
     * Constructs a new Complete.
     * @exports Complete
     * @classdesc Represents a Complete.
     * @implements IComplete
     * @constructor
     * @param {IComplete=} [properties] Properties to set
     */
    function Complete(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * Creates a new Complete instance using the specified properties.
     * @function create
     * @memberof Complete
     * @static
     * @param {IComplete=} [properties] Properties to set
     * @returns {Complete} Complete instance
     */
    Complete.create = function create(properties) {
        return new Complete(properties);
    };

    /**
     * Encodes the specified Complete message. Does not implicitly {@link Complete.verify|verify} messages.
     * @function encode
     * @memberof Complete
     * @static
     * @param {IComplete} message Complete message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Complete.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        return writer;
    };

    /**
     * Encodes the specified Complete message, length delimited. Does not implicitly {@link Complete.verify|verify} messages.
     * @function encodeDelimited
     * @memberof Complete
     * @static
     * @param {IComplete} message Complete message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Complete.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a Complete message from the specified reader or buffer.
     * @function decode
     * @memberof Complete
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {Complete} Complete
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Complete.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Complete();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a Complete message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof Complete
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {Complete} Complete
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Complete.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a Complete message.
     * @function verify
     * @memberof Complete
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    Complete.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        return null;
    };

    /**
     * Creates a Complete message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof Complete
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {Complete} Complete
     */
    Complete.fromObject = function fromObject(object) {
        if (object instanceof $root.Complete)
            return object;
        return new $root.Complete();
    };

    /**
     * Creates a plain object from a Complete message. Also converts values to other types if specified.
     * @function toObject
     * @memberof Complete
     * @static
     * @param {Complete} message Complete
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    Complete.toObject = function toObject() {
        return {};
    };

    /**
     * Converts this Complete to JSON.
     * @function toJSON
     * @memberof Complete
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    Complete.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return Complete;
})();

$root.Move = (function() {

    /**
     * Properties of a Move.
     * @exports IMove
     * @interface IMove
     * @property {ILocation|null} [location] Move location
     */

    /**
     * Constructs a new Move.
     * @exports Move
     * @classdesc Represents a Move.
     * @implements IMove
     * @constructor
     * @param {IMove=} [properties] Properties to set
     */
    function Move(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * Move location.
     * @member {ILocation|null|undefined} location
     * @memberof Move
     * @instance
     */
    Move.prototype.location = null;

    /**
     * Creates a new Move instance using the specified properties.
     * @function create
     * @memberof Move
     * @static
     * @param {IMove=} [properties] Properties to set
     * @returns {Move} Move instance
     */
    Move.create = function create(properties) {
        return new Move(properties);
    };

    /**
     * Encodes the specified Move message. Does not implicitly {@link Move.verify|verify} messages.
     * @function encode
     * @memberof Move
     * @static
     * @param {IMove} message Move message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Move.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.location != null && Object.hasOwnProperty.call(message, "location"))
            $root.Location.encode(message.location, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
        return writer;
    };

    /**
     * Encodes the specified Move message, length delimited. Does not implicitly {@link Move.verify|verify} messages.
     * @function encodeDelimited
     * @memberof Move
     * @static
     * @param {IMove} message Move message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Move.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a Move message from the specified reader or buffer.
     * @function decode
     * @memberof Move
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {Move} Move
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Move.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Move();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.location = $root.Location.decode(reader, reader.uint32());
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a Move message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof Move
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {Move} Move
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Move.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a Move message.
     * @function verify
     * @memberof Move
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    Move.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.location != null && message.hasOwnProperty("location")) {
            var error = $root.Location.verify(message.location);
            if (error)
                return "location." + error;
        }
        return null;
    };

    /**
     * Creates a Move message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof Move
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {Move} Move
     */
    Move.fromObject = function fromObject(object) {
        if (object instanceof $root.Move)
            return object;
        var message = new $root.Move();
        if (object.location != null) {
            if (typeof object.location !== "object")
                throw TypeError(".Move.location: object expected");
            message.location = $root.Location.fromObject(object.location);
        }
        return message;
    };

    /**
     * Creates a plain object from a Move message. Also converts values to other types if specified.
     * @function toObject
     * @memberof Move
     * @static
     * @param {Move} message Move
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    Move.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.defaults)
            object.location = null;
        if (message.location != null && message.hasOwnProperty("location"))
            object.location = $root.Location.toObject(message.location, options);
        return object;
    };

    /**
     * Converts this Move to JSON.
     * @function toJSON
     * @memberof Move
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    Move.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return Move;
})();

$root.Suggest = (function() {

    /**
     * Properties of a Suggest.
     * @exports ISuggest
     * @interface ISuggest
     * @property {Room|null} [room] Suggest room
     * @property {Character|null} [suspect] Suggest suspect
     * @property {Weapon|null} [weapon] Suggest weapon
     */

    /**
     * Constructs a new Suggest.
     * @exports Suggest
     * @classdesc Represents a Suggest.
     * @implements ISuggest
     * @constructor
     * @param {ISuggest=} [properties] Properties to set
     */
    function Suggest(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * Suggest room.
     * @member {Room} room
     * @memberof Suggest
     * @instance
     */
    Suggest.prototype.room = 0;

    /**
     * Suggest suspect.
     * @member {Character} suspect
     * @memberof Suggest
     * @instance
     */
    Suggest.prototype.suspect = 0;

    /**
     * Suggest weapon.
     * @member {Weapon} weapon
     * @memberof Suggest
     * @instance
     */
    Suggest.prototype.weapon = 0;

    /**
     * Creates a new Suggest instance using the specified properties.
     * @function create
     * @memberof Suggest
     * @static
     * @param {ISuggest=} [properties] Properties to set
     * @returns {Suggest} Suggest instance
     */
    Suggest.create = function create(properties) {
        return new Suggest(properties);
    };

    /**
     * Encodes the specified Suggest message. Does not implicitly {@link Suggest.verify|verify} messages.
     * @function encode
     * @memberof Suggest
     * @static
     * @param {ISuggest} message Suggest message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Suggest.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.room != null && Object.hasOwnProperty.call(message, "room"))
            writer.uint32(/* id 1, wireType 0 =*/8).int32(message.room);
        if (message.suspect != null && Object.hasOwnProperty.call(message, "suspect"))
            writer.uint32(/* id 2, wireType 0 =*/16).int32(message.suspect);
        if (message.weapon != null && Object.hasOwnProperty.call(message, "weapon"))
            writer.uint32(/* id 3, wireType 0 =*/24).int32(message.weapon);
        return writer;
    };

    /**
     * Encodes the specified Suggest message, length delimited. Does not implicitly {@link Suggest.verify|verify} messages.
     * @function encodeDelimited
     * @memberof Suggest
     * @static
     * @param {ISuggest} message Suggest message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Suggest.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a Suggest message from the specified reader or buffer.
     * @function decode
     * @memberof Suggest
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {Suggest} Suggest
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Suggest.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Suggest();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.room = reader.int32();
                break;
            case 2:
                message.suspect = reader.int32();
                break;
            case 3:
                message.weapon = reader.int32();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a Suggest message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof Suggest
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {Suggest} Suggest
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Suggest.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a Suggest message.
     * @function verify
     * @memberof Suggest
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    Suggest.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.room != null && message.hasOwnProperty("room"))
            switch (message.room) {
            default:
                return "room: enum value expected";
            case 0:
            case 1:
            case 2:
            case 3:
            case 4:
            case 5:
            case 6:
            case 7:
            case 8:
                break;
            }
        if (message.suspect != null && message.hasOwnProperty("suspect"))
            switch (message.suspect) {
            default:
                return "suspect: enum value expected";
            case 0:
            case 1:
            case 2:
            case 3:
            case 4:
            case 5:
                break;
            }
        if (message.weapon != null && message.hasOwnProperty("weapon"))
            switch (message.weapon) {
            default:
                return "weapon: enum value expected";
            case 0:
            case 1:
            case 2:
            case 3:
            case 4:
            case 5:
                break;
            }
        return null;
    };

    /**
     * Creates a Suggest message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof Suggest
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {Suggest} Suggest
     */
    Suggest.fromObject = function fromObject(object) {
        if (object instanceof $root.Suggest)
            return object;
        var message = new $root.Suggest();
        switch (object.room) {
        case "STUDY":
        case 0:
            message.room = 0;
            break;
        case "HALL":
        case 1:
            message.room = 1;
            break;
        case "LOUNGE":
        case 2:
            message.room = 2;
            break;
        case "LIBRARY":
        case 3:
            message.room = 3;
            break;
        case "BILLIARD":
        case 4:
            message.room = 4;
            break;
        case "DINING":
        case 5:
            message.room = 5;
            break;
        case "CONSERVATORY":
        case 6:
            message.room = 6;
            break;
        case "BALLROOM":
        case 7:
            message.room = 7;
            break;
        case "KITCHEN":
        case 8:
            message.room = 8;
            break;
        }
        switch (object.suspect) {
        case "YELLOW":
        case 0:
            message.suspect = 0;
            break;
        case "RED":
        case 1:
            message.suspect = 1;
            break;
        case "PURPLE":
        case 2:
            message.suspect = 2;
            break;
        case "GREEN":
        case 3:
            message.suspect = 3;
            break;
        case "WHITE":
        case 4:
            message.suspect = 4;
            break;
        case "BLUE":
        case 5:
            message.suspect = 5;
            break;
        }
        switch (object.weapon) {
        case "ROPE":
        case 0:
            message.weapon = 0;
            break;
        case "PIPE":
        case 1:
            message.weapon = 1;
            break;
        case "KNIFE":
        case 2:
            message.weapon = 2;
            break;
        case "WRENCH":
        case 3:
            message.weapon = 3;
            break;
        case "CANDLESTICK":
        case 4:
            message.weapon = 4;
            break;
        case "REVOLVER":
        case 5:
            message.weapon = 5;
            break;
        }
        return message;
    };

    /**
     * Creates a plain object from a Suggest message. Also converts values to other types if specified.
     * @function toObject
     * @memberof Suggest
     * @static
     * @param {Suggest} message Suggest
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    Suggest.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.defaults) {
            object.room = options.enums === String ? "STUDY" : 0;
            object.suspect = options.enums === String ? "YELLOW" : 0;
            object.weapon = options.enums === String ? "ROPE" : 0;
        }
        if (message.room != null && message.hasOwnProperty("room"))
            object.room = options.enums === String ? $root.Room[message.room] : message.room;
        if (message.suspect != null && message.hasOwnProperty("suspect"))
            object.suspect = options.enums === String ? $root.Character[message.suspect] : message.suspect;
        if (message.weapon != null && message.hasOwnProperty("weapon"))
            object.weapon = options.enums === String ? $root.Weapon[message.weapon] : message.weapon;
        return object;
    };

    /**
     * Converts this Suggest to JSON.
     * @function toJSON
     * @memberof Suggest
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    Suggest.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return Suggest;
})();

$root.SuggestionResponse = (function() {

    /**
     * Properties of a SuggestionResponse.
     * @exports ISuggestionResponse
     * @interface ISuggestionResponse
     * @property {IWitnessResponseItem|null} [item] SuggestionResponse item
     */

    /**
     * Constructs a new SuggestionResponse.
     * @exports SuggestionResponse
     * @classdesc Represents a SuggestionResponse.
     * @implements ISuggestionResponse
     * @constructor
     * @param {ISuggestionResponse=} [properties] Properties to set
     */
    function SuggestionResponse(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * SuggestionResponse item.
     * @member {IWitnessResponseItem|null|undefined} item
     * @memberof SuggestionResponse
     * @instance
     */
    SuggestionResponse.prototype.item = null;

    /**
     * Creates a new SuggestionResponse instance using the specified properties.
     * @function create
     * @memberof SuggestionResponse
     * @static
     * @param {ISuggestionResponse=} [properties] Properties to set
     * @returns {SuggestionResponse} SuggestionResponse instance
     */
    SuggestionResponse.create = function create(properties) {
        return new SuggestionResponse(properties);
    };

    /**
     * Encodes the specified SuggestionResponse message. Does not implicitly {@link SuggestionResponse.verify|verify} messages.
     * @function encode
     * @memberof SuggestionResponse
     * @static
     * @param {ISuggestionResponse} message SuggestionResponse message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    SuggestionResponse.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.item != null && Object.hasOwnProperty.call(message, "item"))
            $root.WitnessResponseItem.encode(message.item, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
        return writer;
    };

    /**
     * Encodes the specified SuggestionResponse message, length delimited. Does not implicitly {@link SuggestionResponse.verify|verify} messages.
     * @function encodeDelimited
     * @memberof SuggestionResponse
     * @static
     * @param {ISuggestionResponse} message SuggestionResponse message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    SuggestionResponse.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a SuggestionResponse message from the specified reader or buffer.
     * @function decode
     * @memberof SuggestionResponse
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {SuggestionResponse} SuggestionResponse
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    SuggestionResponse.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.SuggestionResponse();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.item = $root.WitnessResponseItem.decode(reader, reader.uint32());
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a SuggestionResponse message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof SuggestionResponse
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {SuggestionResponse} SuggestionResponse
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    SuggestionResponse.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a SuggestionResponse message.
     * @function verify
     * @memberof SuggestionResponse
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    SuggestionResponse.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.item != null && message.hasOwnProperty("item")) {
            var error = $root.WitnessResponseItem.verify(message.item);
            if (error)
                return "item." + error;
        }
        return null;
    };

    /**
     * Creates a SuggestionResponse message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof SuggestionResponse
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {SuggestionResponse} SuggestionResponse
     */
    SuggestionResponse.fromObject = function fromObject(object) {
        if (object instanceof $root.SuggestionResponse)
            return object;
        var message = new $root.SuggestionResponse();
        if (object.item != null) {
            if (typeof object.item !== "object")
                throw TypeError(".SuggestionResponse.item: object expected");
            message.item = $root.WitnessResponseItem.fromObject(object.item);
        }
        return message;
    };

    /**
     * Creates a plain object from a SuggestionResponse message. Also converts values to other types if specified.
     * @function toObject
     * @memberof SuggestionResponse
     * @static
     * @param {SuggestionResponse} message SuggestionResponse
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    SuggestionResponse.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.defaults)
            object.item = null;
        if (message.item != null && message.hasOwnProperty("item"))
            object.item = $root.WitnessResponseItem.toObject(message.item, options);
        return object;
    };

    /**
     * Converts this SuggestionResponse to JSON.
     * @function toJSON
     * @memberof SuggestionResponse
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    SuggestionResponse.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return SuggestionResponse;
})();

$root.Accuse = (function() {

    /**
     * Properties of an Accuse.
     * @exports IAccuse
     * @interface IAccuse
     * @property {Room|null} [room] Accuse room
     * @property {Character|null} [suspect] Accuse suspect
     * @property {Weapon|null} [weapon] Accuse weapon
     */

    /**
     * Constructs a new Accuse.
     * @exports Accuse
     * @classdesc Represents an Accuse.
     * @implements IAccuse
     * @constructor
     * @param {IAccuse=} [properties] Properties to set
     */
    function Accuse(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * Accuse room.
     * @member {Room} room
     * @memberof Accuse
     * @instance
     */
    Accuse.prototype.room = 0;

    /**
     * Accuse suspect.
     * @member {Character} suspect
     * @memberof Accuse
     * @instance
     */
    Accuse.prototype.suspect = 0;

    /**
     * Accuse weapon.
     * @member {Weapon} weapon
     * @memberof Accuse
     * @instance
     */
    Accuse.prototype.weapon = 0;

    /**
     * Creates a new Accuse instance using the specified properties.
     * @function create
     * @memberof Accuse
     * @static
     * @param {IAccuse=} [properties] Properties to set
     * @returns {Accuse} Accuse instance
     */
    Accuse.create = function create(properties) {
        return new Accuse(properties);
    };

    /**
     * Encodes the specified Accuse message. Does not implicitly {@link Accuse.verify|verify} messages.
     * @function encode
     * @memberof Accuse
     * @static
     * @param {IAccuse} message Accuse message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Accuse.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.room != null && Object.hasOwnProperty.call(message, "room"))
            writer.uint32(/* id 1, wireType 0 =*/8).int32(message.room);
        if (message.suspect != null && Object.hasOwnProperty.call(message, "suspect"))
            writer.uint32(/* id 2, wireType 0 =*/16).int32(message.suspect);
        if (message.weapon != null && Object.hasOwnProperty.call(message, "weapon"))
            writer.uint32(/* id 3, wireType 0 =*/24).int32(message.weapon);
        return writer;
    };

    /**
     * Encodes the specified Accuse message, length delimited. Does not implicitly {@link Accuse.verify|verify} messages.
     * @function encodeDelimited
     * @memberof Accuse
     * @static
     * @param {IAccuse} message Accuse message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Accuse.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes an Accuse message from the specified reader or buffer.
     * @function decode
     * @memberof Accuse
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {Accuse} Accuse
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Accuse.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Accuse();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.room = reader.int32();
                break;
            case 2:
                message.suspect = reader.int32();
                break;
            case 3:
                message.weapon = reader.int32();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes an Accuse message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof Accuse
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {Accuse} Accuse
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Accuse.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies an Accuse message.
     * @function verify
     * @memberof Accuse
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    Accuse.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.room != null && message.hasOwnProperty("room"))
            switch (message.room) {
            default:
                return "room: enum value expected";
            case 0:
            case 1:
            case 2:
            case 3:
            case 4:
            case 5:
            case 6:
            case 7:
            case 8:
                break;
            }
        if (message.suspect != null && message.hasOwnProperty("suspect"))
            switch (message.suspect) {
            default:
                return "suspect: enum value expected";
            case 0:
            case 1:
            case 2:
            case 3:
            case 4:
            case 5:
                break;
            }
        if (message.weapon != null && message.hasOwnProperty("weapon"))
            switch (message.weapon) {
            default:
                return "weapon: enum value expected";
            case 0:
            case 1:
            case 2:
            case 3:
            case 4:
            case 5:
                break;
            }
        return null;
    };

    /**
     * Creates an Accuse message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof Accuse
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {Accuse} Accuse
     */
    Accuse.fromObject = function fromObject(object) {
        if (object instanceof $root.Accuse)
            return object;
        var message = new $root.Accuse();
        switch (object.room) {
        case "STUDY":
        case 0:
            message.room = 0;
            break;
        case "HALL":
        case 1:
            message.room = 1;
            break;
        case "LOUNGE":
        case 2:
            message.room = 2;
            break;
        case "LIBRARY":
        case 3:
            message.room = 3;
            break;
        case "BILLIARD":
        case 4:
            message.room = 4;
            break;
        case "DINING":
        case 5:
            message.room = 5;
            break;
        case "CONSERVATORY":
        case 6:
            message.room = 6;
            break;
        case "BALLROOM":
        case 7:
            message.room = 7;
            break;
        case "KITCHEN":
        case 8:
            message.room = 8;
            break;
        }
        switch (object.suspect) {
        case "YELLOW":
        case 0:
            message.suspect = 0;
            break;
        case "RED":
        case 1:
            message.suspect = 1;
            break;
        case "PURPLE":
        case 2:
            message.suspect = 2;
            break;
        case "GREEN":
        case 3:
            message.suspect = 3;
            break;
        case "WHITE":
        case 4:
            message.suspect = 4;
            break;
        case "BLUE":
        case 5:
            message.suspect = 5;
            break;
        }
        switch (object.weapon) {
        case "ROPE":
        case 0:
            message.weapon = 0;
            break;
        case "PIPE":
        case 1:
            message.weapon = 1;
            break;
        case "KNIFE":
        case 2:
            message.weapon = 2;
            break;
        case "WRENCH":
        case 3:
            message.weapon = 3;
            break;
        case "CANDLESTICK":
        case 4:
            message.weapon = 4;
            break;
        case "REVOLVER":
        case 5:
            message.weapon = 5;
            break;
        }
        return message;
    };

    /**
     * Creates a plain object from an Accuse message. Also converts values to other types if specified.
     * @function toObject
     * @memberof Accuse
     * @static
     * @param {Accuse} message Accuse
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    Accuse.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.defaults) {
            object.room = options.enums === String ? "STUDY" : 0;
            object.suspect = options.enums === String ? "YELLOW" : 0;
            object.weapon = options.enums === String ? "ROPE" : 0;
        }
        if (message.room != null && message.hasOwnProperty("room"))
            object.room = options.enums === String ? $root.Room[message.room] : message.room;
        if (message.suspect != null && message.hasOwnProperty("suspect"))
            object.suspect = options.enums === String ? $root.Character[message.suspect] : message.suspect;
        if (message.weapon != null && message.hasOwnProperty("weapon"))
            object.weapon = options.enums === String ? $root.Weapon[message.weapon] : message.weapon;
        return object;
    };

    /**
     * Converts this Accuse to JSON.
     * @function toJSON
     * @memberof Accuse
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    Accuse.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return Accuse;
})();

module.exports = $root;
