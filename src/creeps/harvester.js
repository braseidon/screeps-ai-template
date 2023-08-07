let mod = new RoleObj(C.HARVESTER);
module.exports = mod;

mod.settings = {
    bodyString: 'WWM',
    pop: 2,
    minEnergy: 0,
};

/** @param {Creep} creep **/
mod.run = function(creep) {
    // Logger.debug(`Harvest pop: ${this.settings.pop}`);

    if (creep.memory.routing.targetId !== undefined) {
        Logger.debug(`Creep ${creep.name} needs a source to harvest`);
        let sources = creep.room.findSources();

        sources.forEach(function(source) {
            let matches = creep.room.find(FIND_MY_CREEPS, { filter: (c) =>
                c.memory.routing.targetId == source.id &&
                c.memory.role == mod.roleName });

            Logger.debug(`Source matching ${matches.legth} for id ${source.id}`);
            if (matches == '' || matches.length == 0) {
                c.memory.routing.targetId = source.id;
            }
        });

    }
    var sources = creep.room.find(FIND_SOURCES);

    if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
        creep.moveTo(sources[0]);
    }
};

// Max harvesters needed is equal to the number of sources
mod.getPopNeeded = function(room) {
    let popNeeded = [];
    let sources = room.memory.sources;
    Logger.debug(`Room ${room.name} has ${sources.length} sources ${JSON.stringify(sources)}`);

    let creepsNeeded = [];
    let sourceCreeps = [];

    sources.forEach(source => {
        // Logger.debug(`sourceid ${source}`);
        sourceCreeps = room.find(FIND_MY_CREEPS, {
            filter: (object) => object.memory &&
                object.memory.role === this.roleName &&
                object.memory.routing.targetId == source.id,
        });
    });

    return sources;
};

// Max harvesters needed is equal to the number of sources
// mod.getPopNeeded = function(room) {
//     let numSources = room.findSources().length;
//     Logger.trace(`Room ${room.name} has ${numSources} sources`);

//     return numSources;
// };