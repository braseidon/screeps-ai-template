let mod = new RoleObj(C.HARVESTER);
module.exports = mod;

mod.settings = {
    bodyString: 'WWM',
    minPop: 2,
    minEnergy: 0,
    perSource: 1,
};

/** @param {Creep} creep **/
mod.run = function(creep) {
    if (creep.memory.routing.targetId !== undefined) {
        let source = Game.getObjectById(creep.memory.routing.targetId);

        if(creep.harvest(source) == ERR_NOT_IN_RANGE) {
            creep.moveTo(source);
        }
    }

    // Logger.debug(`Creep ${creep.name} needs a source to harvest`);
    // let sources = creep.room.findSources();

    // sources.forEach(function(source) {
    //     let matches = creep.room.find(FIND_MY_CREEPS, { filter: (c) =>
    //         c.memory.routing.targetId == source.id &&
    //         c.memory.role == mod.roleName });

    //     Logger.debug(`Source matching ${matches.legth} for id ${source.id}`);
    //     if (matches == '' || matches.length == 0) {
    //         c.memory.routing.targetId = source.id;
    //     }
    // });
    // var sources = creep.room.find(FIND_SOURCES);
};

// Max harvesters needed is equal to the number of sources
mod.getCreepJobs = function(room) {
    let sources = room.memory.sources;
    // Logger.debug(`harvester.js Room ${room.name} has ${sources.length} sources ${JSON.stringify(sources)}`);

    let jobs = [];

    sources.forEach(source => {
        // Push jobs based on this.settings.perSource (1 to start)
        let perSource = (sources.length * this.settings.perSource);
        // Logger.debug(`PerSource: ${perSource}`);

        for (let x = 1;x < perSource;x++) {
            jobs.push(this.spawnData(room.name, source));
        }
        // Logger.debug(`sourceid ${source}`);
        // sourceCreeps = room.find(FIND_MY_CREEPS, {
        //     filter: (object) => object.memory &&
        //         object.memory.role === this.roleName &&
        //         object.memory.routing.targetId == source.id,
        // });
    });
    // Logger.debug(`harvester jobs: ${this.jobs.length}, data: ${JSON.stringify(jobs)}`);
    this.jobs = jobs;

    return this.jobs;
};

// Max harvesters needed is equal to the number of sources
// mod.getCreepJobs = function(room) {
//     let numSources = room.findSources().length;
//     Logger.trace(`Room ${room.name} has ${numSources} sources`);

//     return numSources;
// };