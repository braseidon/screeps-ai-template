Room.prototype.inQueue = function(creepMemory) {
  this.memory.queue = this.memory.queue || [];
  for (const item of this.memory.queue) {
    if (this.isSameCreep(creepMemory, item)) {
      return true;
    }
  }
  return false;
};

Room.prototype.findMySpawns = function() {
    return this.find(FIND_MY_SPAWNS);
};

Room.prototype.findQueueCreepsBySlug = function(slug) {
    return _.filter(this.memory.spawnQueue, (c) => c.memory.routing.slug == slug);
};

Room.prototype.findRoomCreepsBySlug = function(slug) {
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