let creepLogic = require("creeps_index");
let creepTypes = _.keys(creepLogic);

var mod = {};
module.exports = mod;

mod.run = function(room) {
    Logger.section('Spawning Manager');

    // Get all the creeps in the room
   let creeps = room.findMyCreeps();
   Logger.info(`Current creeps: ${creeps.length} | Roles to check for spawn: ${creepTypes}`);

    // find creep types that returns true for the .spawn() function
    let creepTypeNeeded = _.find(creepTypes, function(type) {
        let creepType = creepLogic[type];
        let needsSpawn = creepType.needsSpawn(room);
        Logger.debug(`Need ${type}? ${needsSpawn}`);

        if (! needsSpawn) {
            return false;
        }

        // get the data for spawning a new creep of creepTypeNeeded
        let creepSpawnData = creepType && creepType.spawnData(room);
        Logger.debug('New creep spawndata: ', JSON.stringify(creepSpawnData));

        if (creepSpawnData) {
            // find the first or 0th spawn in the room
            let spawn = room.find(FIND_MY_SPAWNS)[0];
            let spawnBody = mod.stringToParts(creepSpawnData.body);
            let result = spawn.spawnCreep(spawnBody, creepSpawnData.name, {memory: creepSpawnData.memory});

            Logger.debug('Spawning: ' + creepType + ' | body: ' + spawnBody + ' | result: ' + result);
        }

        return needsSpawn;
    });
};

// returns an object with the data to spawn a new creep
mod.spawnData = function() {
    let name = this.roleName + Game.time;
    let body = this.settings.bodyString;
    let memory = {
        role: this.roleName,
        // time: Game.time,
        routing: {
            targetRoom: this.settings.targetRoom,
            targetId: this.settings.targetId,
        }
    };

    return {
        name: name,
        body: body,
        memory
    };
};

/**
   * from string format of creep parts String (tooAngel config format) to creep parts array (screeps format)
   *
   * @param {string} stringParts creep parts String
   * @return {undefined|string[]} creep parts array
   */
mod.stringToParts = function(stringParts) {
    if (!stringParts || typeof (stringParts) !== 'string') {
        return undefined;
    }
    const arrayParts = [];
    for (const partChar of stringParts) {
        let part;
        switch (partChar) {
        case 'M':
            part = MOVE;
            break;
        case 'C':
            part = CARRY;
            break;
        case 'A':
            part = ATTACK;
            break;
        case 'W':
            part = WORK;
            break;
        case 'R':
            part = RANGED_ATTACK;
            break;
        case 'T':
            part = TOUGH;
            break;
        case 'H':
            part = HEAL;
            break;
        case 'K':
            part = CLAIM;
            break;
        default:
            // should never enter
            part = MOVE;
            console.error('stringToParts illegal partChar : ' + part);
        }
        arrayParts.push(part);
    }
    return arrayParts;
};

/**
 * Creep part data
 *
 * @class
 */
class CreepPartData {
  /**
   * constructor
   */
  constructor() {
    this.fail = false;
    this.cost = 0;
    this.parts = [];
    this.len = 0;
  }
}