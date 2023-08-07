Room.prototype.memoryReset = function memoryReset() {
    this.memory.name = this.name;
    this.memory.lastSeen = 0;
    this.memory.energyAvailable = 0;
    this.memory.energyCapacityAvailable = 0;
    this.memory.sources = this.find(FIND_SOURCES);
    this.memory.isSetup = false;
};

Room.prototype.memoryUpdate = function memoryUpdate() {
    this.memory.lastSeen = Game.time;
    this.memory.energyAvailable = this.energyAvailable;
    this.memory.energyCapacityAvailable = this.energyCapacityAvailable;
    this.memory.sources = this.find(FIND_SOURCES);
    this.memory.isSetup = true;
};