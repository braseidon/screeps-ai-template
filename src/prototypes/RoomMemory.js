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
        spawnQueue: {},
        isSetup: false,
    };
};

Room.prototype.memoryObj = function() {
    // return 'adasdasd';
    let roomSources = _.map(this.findSources(), source => source.id) || [];
    let roomSpawns = _.map(this.findMySpawns(), spawn => spawn.id) || [];
    // Logger.error(`Room sources: ${roomSources}, Spawns: ${roomSpawns}`);
    return {
        lastSeen: Game.time,
        energyAvailable: this.energyAvailable,
        energyCapacityAvailable: this.energyCapacityAvailable,
        sources: roomSources,
        spawns: roomSpawns,
        isSetup: true,
    };
};