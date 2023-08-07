var mod = {};
module.exports = mod;

mod.run = function(room) {
    // Logger.section(`Room Memory '${room.name}' Initializing`);
    // let room = Game.rooms[roomName];

    if (! room.memory.isSetup || room.memory.isSetup == false) {
        Logger.debug(`Room Memory: ${room.name} - resetting`);
        room.memoryReset();
    } else {
        Logger.trace(`Memory for room ${room.name}: true`);
        room.memoryUpdate();
    }
};