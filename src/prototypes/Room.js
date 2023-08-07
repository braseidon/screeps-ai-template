Room.prototype.inQueue = function(creepMemory) {
  this.memory.queue = this.memory.queue || [];
  for (const item of this.memory.queue) {
    if (this.isSameCreep(creepMemory, item)) {
      return true;
    }
  }
  return false;
};

Room.prototype.memoryUpdate = function() {
    Logger.trace('Room Prototype: Update');
    _.assign(this.memory, this.memoryObj());
};

Room.prototype.memoryReset = function() {
    Logger.debug('Room Prototype: Reset');

    console.log(JSON.stringify(this.memoryObj()));
    this.memory = _.defaults(this.memoryObj(), this.memoryObjDefault());
};

Room.prototype.memoryCleanKeys = function() {
    //
    let reference = _.defaults(this.memoryObj(), this.memoryObjDefault());
};

Room.prototype.memoryObjDefault = function() {
    return {
        name: this.name,
        lastSeen: 0,
        energyAvailable: 0,
        energyCapacityAvailable: 0,
        sources: [],
        spawns: [],
        spawnQueue: [],
        isSetup: false,
    };
};

Room.prototype.memoryObj = function() {
    // return 'adasdasd';
    // let sources = this.find(FIND_SOURCES);
    return {
        lastSeen: Game.time,
        energyAvailable: this.energyAvailable,
        energyCapacityAvailable: this.energyCapacityAvailable,
        sources: _.map(this.findSources(), source => source.id) || [],
        spawns: _.map(this.findMySpawns(), spawn => spawn.id) || [],
        isSetup: true,
    };
};

Room.prototype.suicideAllCreeps = function() {
    // let creeps = this.findMyCreeps();
    let creeps = Game.creeps;
    Logger.fatal(`suciding ${creeps.length} creeps`);
    for(let creep in creeps) {
        Game.creeps[creep].suicide();
    }
};

Room.prototype.findMySpawns = function() {
    return this.find(FIND_MY_SPAWNS);
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