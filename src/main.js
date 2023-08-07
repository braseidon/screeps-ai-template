const _global = require('global');
const _roomvisual = require('lib_RoomVisual');
// const {Roles} = require('creeps_template');
let RoomManager = require('room_index');
let prototypes = require('prototypes_index');
let pixels = require('util_pixels');

module.exports.loop = function () {
    // make a list of all of our rooms
    Memory.myRooms = _(Game.rooms).filter(r => r.controller && r.controller.level > 0 && r.controller.my).map((r) => r.name).value();
    // Memory.myRooms = roomList;
    // Logger.debug(JSON.stringify(Game.rooms));
    // check memory for each room
    Memory.time = Game.time;

    // run logic for each room in our empire
    _.forEach(Memory.myRooms, function(roomName) {
        let room = Game.rooms[roomName];
        // Logger.info(JSON.stringify(room));

        try { RoomManager.memory.run(room); } catch (e) { Logger.fatal("*ERROR* Memory Manager loop\n" + e.stack); }
        try { RoomManager.creeps.run(room); } catch (e) { Logger.fatal("*ERROR* with Creeps Manager loop\n" + e.stack); }
        try { RoomManager.spawning.run(room); } catch (e) { Logger.fatal("*ERROR* with Spawning Manager loop\n" + e.stack); }
    });

    // free up memory if creep no longer exists
    for(let name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            Logger.debug('Clearing non-existing creep memory:', name);
        }
    }

    // Pixels
    // pixels.generate();

    // CPU Info
    const cpuLimit = Game.cpu.limit;
    const currentCPUUsed = Game.cpu.getUsed();
    const currentIdleCPU = cpuLimit - currentCPUUsed;
    Memory.stats = {
        cpu_limit: cpuLimit,
        cpu_used: currentCPUUsed,
        cpu_idle: currentIdleCPU,
    };
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