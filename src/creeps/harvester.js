let mod = new RoleObj(C.HARVESTER);
module.exports = mod;

mod.settings = {
    bodyString: 'WWM',
    pop: 2,
    minEnergy: 0,
};

/** @param {Creep} creep **/
mod.run = function(creep) {
    var sources = creep.room.find(FIND_SOURCES);

    if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
        creep.moveTo(sources[0]);
    }
};