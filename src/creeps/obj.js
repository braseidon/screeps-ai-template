// const template = require('creeps_template');

let mod = function(roleName) {
    this.roleName = roleName;
    this.defaultMemory = {
        bodyString: '', // MWC
        bodyCost: 0,
        minPop: 0,
        minEnergy: 0,
        spawned: false,
        routing: {
            targetId: '',
            targetRoom: '',
            slug: '',
        },
    };
    this.mergedSettings = {};
    this.jobs = [];

    //Default behaviour, can be override
    this.run = function(creep) {
        //Check active carry part
        // const useOut = creep.getActiveBodyparts(CARRY) == 0 ? false : _.sum(creep.carry) == creep.carryCapacity;
        // this.loop0(creep, useOut);
    };

    // Returns true if this creep needs to spawn another
    this.getSpawnRequests = function(room) {
        var creeps = _.filter(Game.creeps, (creep) => creep.memory.role == this.roleName && creep.room.name == room.name);
        // console.log(JSON.stringify(this.settings));
        let popNeeded = this.getCreepJobs(room);

        Logger.info(`obj.js Creep Type: ${this.roleName} | Current: ${creeps.length} | Needed: ${popNeeded.length} | Min Energy: ${this.settings.minEnergy}`);

        if (popNeeded !== false) {
            // If we have less than the population needed and enough energy capacity
            if (creeps.length < popNeeded &&
                room.energyCapacityAvailable >= this.settings.minEnergy) {
                return true;
            }
            //
            return false;
        }

        Logger.warning(`${this.roleName} role object returning false for this.getCreepJobs()`);
        return false;
    };

    // Get needed creep population total
    // Meant to be extended
    this.getCreepJobs = function(room) {
        let minPop = this.settings.minPop;
        let jobs = [];

        if (minPop > 0) {
            for (let x = 0;x < minPop;x++) {
                // let newJob = {role: this.roleName, 'routing': { targetRoom: room.name, targetId: 'asdasd', slug: 'slug' }};
                jobs.push(this.spawnData(room.name));
            }
        }

        // Logger.debug(`getCreepJobs count: ${jobs.length}, data: ${jobs}`);
        this.jobs = jobs;
        return jobs;
    };

    // returns an object with the data to spawn a new creep
    this.spawnData = function(targetRoomName, targetId) {
        // Logger.debug(`mod.spawnData() ---- ${this.settings.bodyString}`);
        let name = this.roleName + Game.time;
        let bObj = Helpers.bodyStringToArr(this.settings.bodyString);
        let body = bObj.body;
        let cost = bObj.cost;
        targetRoomName = targetRoomName || this.settings.routing.targetRoom;
        targetId = targetId || this.settings.routing.targetId;
        // let cost = mod.bodyCost(body);
        let memory = {
            role: this.roleName,
            bodyString: this.settings.bodyString,
            bodyCost: cost,
            spawned: false,
            born: Game.time,
            routing: {
                targetRoom: targetRoomName,
                targetId: targetId,
                slug: this.creepSlug(targetRoomName, targetId),
            },
        };
        // Logger.debug(`spawnData() memory ---- ${JSON.stringify(memory)}`);
        return {
            name: name,
            body: body,
            memory: memory,
        };
    };

    // The slug to identify this creep in the room/queue memory
    this.creepSlug = function(targetRoomName, targetId) {
        let arr = [this.roleName, targetRoomName, targetId];
        // Logger.debug(`Slug: ${arr.join('-')}`);
        return arr.join('-');
    };

    // To be run on each extension
    this.updateSettings = function() {
        Logger.trace(`Creep Role ${this.roleName} update settings, default: ${JSON.stringify(this.defaultMemory)}`);
        // settings = this.settings;
        if (typeof(this.settings) !== 'object') {
            Logger.error(`Role ${this.roleName} updateSettings() function called with this.settings as a non-object`);
            return this.defaultMemory;
        }
        this.settings = _.defaults(this.settings, this.defaultMemory);

        Logger.trace(`Creep Role ${this.roleName} update settings, merged: ${JSON.stringify(this.settings)}`);
    };
};

module.exports = mod;
