// The slug to identify this creep in the room/queue memory
// mod.creepSlug = function(roleName, targetRoomName, targetId) {
//     return _.join([roleName, targetRoomName, targetId], '-');
// };

Room.prototype.getAllCreepsBySlug = function(slug) { // roleName, targetRoomName, targetId
    // let type = creepTypes[roleName];
    // let slug = type.creepSlug(targetRoomName, targetId);
    // let room = Game.rooms[targetRoomName];
    const roomCreeps = this.creepsInRoomBySlug(slug) || [];
    const queueCreeps = this.creepsInQueueBySlug(slug) || [];
    if (roomCreeps.length === 0 && queueCreeps.length === 0) {
        Logger.debug(`No creeps found in room/queue for slug "${slug}"`);
        return [];
    }

    let allCreeps = _.concat(roomCreeps, queueCreeps);
    Logger.error(`All creeps found: ${allCreeps.length}, data: ${JSON.stringify(allCreeps)}`);

    if(arr.concat.length < 1) {
        return false;
    }

    return allCreeps;
};

Room.prototype.inQueue = function(spawnData) {
    this.memory.queue = this.memory.queue || [];
    for (const item of this.memory.queue) {
        if (this.isSameCreep(spawnData, item)) {
            return true;
        }
    }
    return false;
};

Room.prototype.findMySpawns = function() {
    return this.find(FIND_MY_SPAWNS);
};

Room.prototype.creepsInQueueBySlug = function(slug) {
    return _.filter(this.memory.spawnQueue, (c) => c.memory.routing.slug == slug);
};

Room.prototype.creepsInRoomBySlug = function(slug) {
    return this.find(FIND_MY_CREEPS, {
        filter: function(creep) {
            return creep.memory.routing.slug == slug;
        }
    });
};

Room.prototype.findMyCreepsTargetId = function(targetId) {
    return this.find(FIND_MY_CREEPS, {
        filter: function(creep) {
            return creep.memory.routing.targetId == targetId &&
                creep.memory.routing.targetRoom == this.name;
        }
    });
};

Room.prototype.findMyCreepsOfRole = function(role) {
    return this.find(FIND_MY_CREEPS, {
        filter: (object) => object.memory && object.memory.role === role,
    });
};

Room.prototype.findMyCreeps = function() {
    return this.find(FIND_MY_CREEPS);
};

Room.prototype.findSources = function() {
    return this.find(FIND_SOURCES);
};

Room.prototype.findMinerals = function() {
    return this.find(FIND_MINERALS);
};

Room.prototype.findMyStructures = function() {
    return this.find(FIND_MY_STRUCTURES);
};

Room.prototype.findConstructionSites = function() {
    return this.find(FIND_CONSTRUCTION_SITES);
};

Room.prototype.suicideAllCreeps = function() {
    // let creeps = this.findMyCreeps();
    let creeps = Game.creeps;
    Logger.fatal(`suciding ${creeps.length} creeps`);
    for(let creep in creeps) {
        Game.creeps[creep].suicide();
    }
};