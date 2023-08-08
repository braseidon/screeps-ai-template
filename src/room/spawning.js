let creepLogic = require("creeps_index");
let creepTypes = _.keys(creepLogic);

var mod = {};
module.exports = mod;

mod.run = function(room) {
    Logger.section('Spawning Manager');

    // Get all the creeps in the room
    let creeps = room.findMyCreeps();
    Logger.info(`Current creeps: ${creeps.length} | Roles to check for spawn: ${creepTypes}`);

    // Get all Roles' jobs, and check each job for openings
    let creepSpawnRequests = [];

    // Loop all the creep roles, getting an array of job requests for each one
    _.forEach(creepTypes, (type) => {
        let creepType = creepLogic[type];
        let jobs = creepType.getCreepJobs(room);
        // Logger.error(`jobs: ${jobs.length}, data: `);
        creepSpawnRequests.push(...jobs);
        let slugsArr = _(jobs).map((job) => job.memory.routing.slug);
        Logger.error(`${type} :: jobs: ${jobs.length}, taken: ?, available: ?, data: ${slugsArr}`);
    });
        // let slugs = [];
        // let openJobs = [];
        // creepSpawnRequests.forEach((j) => {
        //     if(_.has(j, 'memory.routing.slug')) {
        //         let slug = j.memory.routing.slug;
        //         Logger.debug(`${slug}`);
        //         slugs.push(slug);

        //         let openJob = mod.checkJobBeforeQueueing(room, slug);
        //         if(openJob !== false) {
        //             openJobs.push()
        //         }
        //     }
        // });
        // let getOpenJobs = mod.checkJobBeforeQueueing(room, slug);


    if (creepSpawnRequests.length > 0) {
        let spawn = Game.getObjectById(room.spawns[0]);
        let creepSpawn = creepSpawnRequests[0];
        Logger.error(`first spawn in queue: ${JSON.stringify(creepSpawn)}`);
    }

    // _.forEach(creepSpawnRequests, (spawnRequest) => {

    // });

    // Logger.error(`creepSpawnRequests length: ${creepSpawnRequests.length}, data: ${JSON.stringify(creepSpawnRequests)}`);

    // find creep types that returns true for the .spawn() function
    if(1 == 2) {
        let creepTypeNeeded = _.find(creepTypes, function(type) {
            let creepType = creepLogic[type];
            let getSpawnRequests = creepType.getCreepJobs(room);
            // let needsSpawn = creepType.needsSpawn(room);
            Logger.debug(`Need ${type}? ${getSpawnRequests.length > 0}`);

            if (! getSpawnRequests || getSpawnRequests.length < 1) {
                return false;
            }

            // get the data for spawning a new creep of creepTypeNeeded


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
    }
};

mod.queue = function(slug) {
    //
};

mod.spawn = function(room) {
    if (room.memory.queue)
};