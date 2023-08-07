let creepLogic = require('creeps_index');
let creepTypes = _.keys(creepLogic);

var mod = {};
module.exports = mod;

mod.run = function(room) {
    Logger.section('Creeps Manager');
    // Run through each Creep Type and initiate their settings
    _.forEach(creepTypes, role => creepLogic[role].updateSettings());

    let creeps = room.findMyCreeps();

    Logger.debug(`Creeps currently in room ${room.name}: ${creeps.length}`);

    // run each creep role see /creeps/index.js
    for(let name in creeps) {
        let creep = creeps[name];
        Logger.trace(`Selected creep: ${creep.name}`);
        let role = creep.memory.role;

        if (creepLogic[role]) {
            creepLogic[role].run(creep);
        }
    }
};