var mod = {};
module.exports = mod;

mod.setupPath = function() {

};

mod.docsExamples = function() {
    let creep = Game.creeps.John;

    let goals = _.map(creep.room.find(FIND_SOURCES), function(source) {
        // We can't actually walk on sources-- set `range` to 1
        // so we path next to it.
        return { pos: source.pos, range: 1 };
    });

    let ret = PathFinder.search(
        creep.pos, goals,
        {
            // We need to set the defaults costs higher so that we
            // can set the road cost lower in `roomCallback`
            plainCost: 2,
            swampCost: 10,

            roomCallback: function(roomName) {

                let room = Game.rooms[roomName];
                // In this example `room` will always exist, but since
                // PathFinder supports searches which span multiple rooms
                // you should be careful!
                if (!room) return;
                let costs = new PathFinder.CostMatrix;

                room.find(FIND_STRUCTURES).forEach(function(struct) {
                    if (struct.structureType === STRUCTURE_ROAD) {
                        // Favor roads over plain tiles
                        costs.set(struct.pos.x, struct.pos.y, 1);
                    } else if (struct.structureType !== STRUCTURE_CONTAINER &&
                                         (struct.structureType !== STRUCTURE_RAMPART ||
                                            !struct.my)) {
                        // Can't walk through non-walkable buildings
                        costs.set(struct.pos.x, struct.pos.y, 0xff);
                    }
                });

                // Avoid creeps in the room
                room.find(FIND_CREEPS).forEach(function(creep) {
                    costs.set(creep.pos.x, creep.pos.y, 0xff);
                });

                return costs;
            },
        }
    );

    let pos = ret.path[0];
    creep.move(creep.pos.getDirectionTo(pos));

    //////////////////

    const path = creep.room.findPath(creep.pos, targetPos);
    creep.move(path[0].direction);

    ///////////////////

    PathFinder.use(true);
    const path = creep.room.findPath(creep.pos, targetPos, {
        costCallback: function(roomName, costMatrix) {
            if(roomName == 'W1N5') {
                // set anotherCreep's location as walkable
                costMatrix.set(anotherCreep.pos.x, anotherCreep.pos.y, 0);
                // set flag location as an obstacle
                costMatrix.set(flag.pos.x, flag.pos.y, 255);
                // increase cost for (25,20) location to 50
                costMatrix.set(25, 20, 50);
            }
        }
    });

    /////////////////////

    let path = creep.room.findPath(creep.pos, targetPos, {maxOps: 200});
    if( !path.length || !targetPos.isEqualTo(path[path.length - 1]) ) {
        path = creep.room.findPath(creep.pos, targetPos, {
            maxOps: 1000, ignoreDestructibleStructures: true
        });
    }
    if( path.length ) {
        creep.move(path[0].direction);
    }

    ////////////////

    const path = spawn.pos.findPathTo(source);
    Memory.path = Room.serializePath(path);
    creep.moveByPath(Memory.path);

    const path = Room.deserializePath(Memory.path);
    creep.moveByPath(path);
};