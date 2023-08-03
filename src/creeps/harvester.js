var mod = {

    /** @param {Creep} creep **/
    run: function(creep) {
        // var creepRoom = creep.room.name;
        // Distribute energy sources
        if(!creep.memory.source){
            creep.say("src?");
            var sources = creep.room.find(FIND_SOURCES);
            // var check=[];
            sources.forEach(function(srs){
                var tmp = creep.room.find(FIND_MY_CREEPS, {filter: (s) => s.memory.source == srs.id && s.memory.role == 'harvester'})
                if(tmp == '' || tmp.length == 1){
                    creep.memory.source = srs.id;
                }
            });
        }

        // Mine energy
        if(creep.store.getFreeCapacity() > 0) {
            var source = creep.pos.findClosestByPath(FIND_SOURCES, { filter: (s) => s.id == creep.memory.source });
            creep.say("⛏");
            // var sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(source) == ERR_NOT_IN_RANGE) {
                creep.moveTo(source, {visualizePathStyle: {stroke: '#ffaa00'}});
            }
        }
        else {
            // here is the sayHello() prototype
            creep.sayHello();
            
            // Find structure to dump energy into
            // var targets = creep.room.find(FIND_STRUCTURES, {
            //         filter: (structure) => {
            //             return (structure.structureType == STRUCTURE_EXTENSION ||
            //                     structure.structureType == STRUCTURE_SPAWN ||
            //                     structure.structureType == STRUCTURE_TOWER) &&
            //                     structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
            //         }
            // });
            var target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType === STRUCTURE_LINK ||
                        structure.structureType === STRUCTURE_SPAWN ||
                        structure.structureType === STRUCTURE_EXTENSION ||
                        structure.structureType === STRUCTURE_TOWER)
                        && structure.store.getUsedCapacity([RESOURCE_ENERGY]) < structure.store.getCapacity([RESOURCE_ENERGY]);
                    }
            });

            // console.log(JSON.stringify(target));

            if(target) {
                if(creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target, {visualizePathStyle: {stroke: '#ffffff'}});
                    creep.say('⚡ ' + target.structureType);
                    // console.log('energy to ' + targets[0].structureType);
                }
            }
        }
    },
    // checks if the room needs to spawn a creep
    spawn: function(room) {
        var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester' && creep.room.name == room.name);
        console.log('Harvesters: ' + harvesters.length, room.name);

        if (harvesters.length < 6) {
            return true;
        }
    },
    // returns an object with the data to spawn a new creep
    spawnData: function(room) {
            let name = 'Harvester' + Game.time;
            let body = [WORK, CARRY, MOVE, MOVE];
            let memory = {role: 'harvester'};
        
            return {name, body, memory};
    }
};

module.exports = mod;