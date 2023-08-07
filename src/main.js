const _global = require('global');
const _roomvisual = require('lib_RoomVisual');
let creepLogic = require('creeps_index');
// const {Roles} = require('creeps_template');
let roomLogic = require('room_index');
let prototypes = require('prototypes_index');
let pixels = require('util_pixels');
global.tickLimit = cpuLimit();
global.load = Math.round(Game.cpu.getUsed());

module.exports.loop = function () {
    // make a list of all of our rooms
    Memory.myRooms = _(Game.rooms).filter(r => r.controller && r.controller.level > 0 && r.controller.my).map((r) => r.name).value();
    // Memory.myRooms = roomList;
    // console.log(JSON.stringify(Memory.myRooms));
    // check memory for each room
    Memory.time = Game.time;
    Memory.tickLimit = global.tickLimit;
    Memory.load = global.load;

    for (const roomName of Memory.myRooms) {
        if (Game.rooms[roomName].memory == undefined) {
            Game.rooms[roomName].memoryReset();
        } else {
            Game.rooms[roomName].memoryUpdate();
        }
    }

    // run spawn logic for each room in our empire
    _.forEach(Game.myRooms, r => roomLogic.spawning.spawnCreeps(r));
    
    // run each creep role see /creeps/index.js
    for(let name in Game.creeps) {
        let creep = Game.creeps[name];

        let role = creep.memory.role;
        if (creepLogic[role]) {
            creepLogic[role].run(creep);
        }
    }

    // free up memory if creep no longer exists
    for(let name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }

    // Pixels
    // pixels.generate();
};

/**
 * cleanRooms
 *
 * Deletes old rooms from Memory
 */
function cleanRooms() {
  if (Game.time % 300 === 0) {
    for (const name of Object.keys(Memory.rooms)) {
      // TODO lastSeen moved to global.data - so we should check this, also Memory.rooms should only exist for myRooms
      if (!Memory.rooms[name].lastSeen && Object.keys(Memory.rooms[name]).length > 0) {
        debugLog('memory', `Deleting ${name} from memory no 'lastSeen' value, keys: ${JSON.stringify(Object.keys(Memory.rooms[name]))}`);
        delete Memory.rooms[name];
        continue;
      }
      if (Memory.rooms[name].lastSeen < Game.time - config.room.lastSeenThreshold && Memory.myRooms.indexOf(name) < 0) {
        debugLog('memory', `Deleting ${name} from memory older than ${config.room.lastSeenThreshold}`);
        delete Memory.rooms[name];
      }
      if (Memory.myRooms.indexOf(name) < 0) {
        debugLog('memory', `Deleting ${name} from memory, no myRoom ${JSON.stringify(Memory.rooms[name])}`);
        delete Memory.rooms[name];
      }
    }
  }
}

/**
 * cpuLimit
 * sigmoid on Game.cpu.limit + Game.cpu.bucket
 *
 * @return {number}
 */
function cpuLimit() {
    // https://en.wikipedia.org/wiki/Sigmoid_function
    const sigmoid = (x) => 1 + Math.tanh((2 * x) - 1);
    return _.ceil(Game.cpu.limit * sigmoid(Game.cpu.bucket / 10000));
}