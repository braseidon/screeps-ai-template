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
    let getCreepJobs = [];

    _.forEach(creepTypes, (type) => {
        let creepType = creepLogic[type];
        let jobs = creepType.getCreepJobs(room);
        // Logger.error(`jobs: ${jobs.length}, data: `);
        getCreepJobs.push(jobs);

        Logger.error(`${type} :: jobs: ${jobs.length}, taken: ?, available: ?, data: ${JSON.stringify(jobs)}`);

        // let slugs = [];
        // let openJobs = [];
        // getCreepJobs.forEach((j) => {
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
    });

    Logger.error(`Jobs Arr ${getCreepJobs.length}`);

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

// The slug to identify this creep in the room/queue memory
// mod.creepSlug = function(roleName, targetRoomName, targetId) {
//     return _.join([roleName, targetRoomName, targetId], '-');
// };

mod.checkJobBeforeQueueing = function(room, slug) { // roleName, targetRoomName, targetId
    // let type = creepTypes[roleName];
    // let slug = type.creepSlug(targetRoomName, targetId);
    // let room = Game.rooms[targetRoomName];
    // let roomCreeps = room.findRoomCreepsBySlug(slug);
    // let queueCreeps = room.findQueueCreepsBySlug(slug);
    if (room.findRoomCreepsBySlug(slug) || room.findQueueCreepsBySlug(slug)) {
        return false;
    }

    let arrConcat = _.concat(roomCreeps, queueCreeps);
    Logger.error(`All creeps found: ${arrConcat.length}, data: ${JSON.stringify(arrConcat)}`);

    if(arr.concat.length < 1) {
        return false;
    }

    return arrConcat;
};