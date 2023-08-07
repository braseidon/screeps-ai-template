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
        let getSpawnRequests = creepType.getSpawnRequests(room);
        // let needsSpawn = creepType.needsSpawn(room);
        Logger.debug(`Need ${type}? ${getSpawnRequests.length < 1}`);

        if (! getSpawnRequests || getSpawnRequests.length < 1) {
            return false;
        }

        // get the data for spawning a new creep of creepTypeNeeded

        Logger.debug(`getSpawnRequests count: ${getSpawnRequests.length}, data: ${getSpawnRequests}`);
        // let spawnData = mod.spawnData(creepType);
        Logger.error(`Spawning.js Data - name: ${spawnData.name}, body: ${spawnData.body}, cost: ${spawnData.cost}, memory: ${JSON.stringify(spawnData.memory)}`);

        if (spawnData && 1 == 2) {
            // find the first or 0th spawn in the room
            let spawn = room.find(FIND_MY_SPAWNS)[0];
            let result = spawn.spawnCreep(spawnData.body, spawnData.name, {memory: spawnData.memory});

            Logger.debug('Spawning: ' + creepType + ' | body: ' + spawnBody + ' | result: ' + result);
        }

        return needsSpawn;
    });
};

mod.checkIfCreepNeeded = function(room, name, body, memory) {
    //
};

// returns an object with the data to spawn a new creep
mod.spawnData = function(creepType) {
    // Logger.debug(`mod.spawnData() ---- ${creepType.settings.bodyString}`);
    let name = creepType.roleName + Game.time;
    let bObj = mod.stringToBodyData(creepType.settings.bodyString);
    let body = bObj.body;
    let cost = bObj.cost;
    // let cost = mod.bodyCost(body);
    let memory = {
        role: creepType.roleName,
        bodyString: creepType.settings.bodyString,
        bodyCost: cost,
        // time: Game.time,
        routing: {
            targetRoom: creepType.settings.targetRoom,
            targetId: creepType.settings.targetId,
        },
    };
    // Logger.debug(`spawnData() memory ---- ${JSON.stringify(memory)}`);
    return {
        name: name,
        body: body,
        cost: cost,
        memory: memory,
    };
};

/**
   * from string format of creep parts String (tooAngel config format) to creep parts array (screeps format)
   *
   * @param {string} stringParts creep parts String
   * @return {undefined|string[]} creep parts array
   */
mod.stringToBodyData = function(stringParts) {
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
            Logger.error('stringToBodyData illegal partChar : ' + part);
        }
        // Logger.warning(`New part: ${part}`);
        arrayParts.push(part);
    }
    // Logger.warning(`stringToBodyData - ${JSON.stringify(arrayParts)} - typeof ${typeof(arrayParts)}`);
    let bodyData = {};
    bodyData.body = arrayParts;
    bodyData.cost = mod.bodyCost(arrayParts);
    return bodyData;
};

mod.bodyCost = function(bodyArray) {
    let cost = 0;
    _.each(bodyArray,
        (p) => {
            cost += BODYPART_COST[p];
        },
    );
    return cost;
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