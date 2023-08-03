var mod = {

    /** @param {Creep} creep **/
    run: function(creep) {
        var creepRoom = creep.room.name;

        // Distribute energy sources
        if(!creep.memory.source){
            creep.say("src?");
            var sources = creep.room.find(FIND_SOURCES);
            var check=[];
                sources.forEach(function(srs){
                    var tmp = creep.room.find(FIND_MY_CREEPS, {
                        filter: (s) => s.memory.source == srs.id && s.memory.role == 'builder'
                    });

                    if(tmp == '' || tmp.length == 1){
                        creep.memory.source = srs.id;
                    }
                });
        }

        if(creep.memory.building && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.building = false;
            creep.say("⛏");
            // creep.say('🔄 harvest');
        }
        if(!creep.memory.building && creep.store.getFreeCapacity() == 0) {
            creep.memory.building = true;
            creep.say('🚧 build');
        }

        if(creep.memory.building) {
            var target = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES);
            if(target) {
                if(creep.build(target) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target, {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
        }
        else {
            var source = creep.pos.findClosestByPath(FIND_SOURCES, { filter: (s) => s.id == creep.memory.source });

            if(creep.harvest(source) == ERR_NOT_IN_RANGE) {
                creep.moveTo(source, {visualizePathStyle: {stroke: '#ffaa00'}});
            }
        }
    },
    // checks if the room needs to spawn a creep
    spawn: function(room) {
        var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder' && creep.room.name == room.name);
        console.log('Builders: ' + builders.length, room.name);

        if (builders.length < 2) {
            return true;
        }
    },
    // returns an object with the data to spawn a new creep
    spawnData: function(room) {
            let name = 'Builder' + Game.time;
            let body = [WORK, CARRY, MOVE, MOVE];
            let memory = {role: 'builder'};

            return {name, body, memory};
    }
};

module.exports = mod;