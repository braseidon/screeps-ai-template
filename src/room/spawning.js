let creepLogic = require("creeps_index");
let creepTypes = _.keys(creepLogic);

var mod = {};
module.exports = mod;

mod.spawnCreeps = function(room) {
    // lists all the creep types to console
    _.forEach(creepTypes, type => console.log(type));

    // find a creep type that returns true for the .spawn() function
    let creepTypeNeeded = _.find(creepTypes, function(type) {
        let needsSpawn = creepLogic[type].needsSpawn(room);
        console.log(this.roleName + ' | count: ' + creeps.length + ' | needed: ' + needsSpawn);

        return needsSpawn;
    });

    // get the data for spawning a new creep of creepTypeNeeded
    let creepSpawnData = creepLogic[creepTypeNeeded] && creepLogic[creepTypeNeeded].spawnData(room);
    console.log('New creep spawndata: ', JSON.stringify(creepSpawnData));

    if (creepSpawnData) {
        // find the first or 0th spawn in the room
        let spawn = room.find(FIND_MY_SPAWNS)[0];
        let spawnBody = mod.stringToParts(creepSpawnData.body);
        let result = spawn.spawnCreep(spawnBody, creepSpawnData.name, {memory: creepSpawnData.memory});
    
        console.log('Spawning: ' + creepTypeNeeded + ' | body: ' + spawnBody + ' | result: ' + result);
    }
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
