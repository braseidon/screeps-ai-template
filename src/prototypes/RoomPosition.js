RoomPosition.prototype.getNearbyPositions = function getNearbyPositions() {
    //
    var positions = [];

    let startX = this.x - 1 || 1;
    let startY = this.y - 1 || 1;

    for(x = startX; x <= this.x; x++) {
        for(y = startY; y <= this.y; y++) {
            positions.push(new RoomPosition(x, y, this.roomName));
        }
    }

    return positions;
};

// const found = Game.flags.Flag1.pos.lookFor(LOOK_CREEPS);
// if(found.length && found[0].getActiveBodyparts(ATTACK) == 0) {
//     creep.moveTo(found[0]);
// }

RoomPosition.prototype.getOpenPositions = function getOpenPositions() {
    let nearbyPositions = this.getNearbyPositions();

    let terrain = Game.map.getRoomTerrain(this.roomName);

    let walkablepositions = _.filter(nearbyPositions, function(pos){
        return terrain.get(pos.x, pos.y) !== TERRAIN_MASK_WALL;
    });

    let freePositions = _.filter(walkablepositions, function(pos){
        return !pos.get(LOOK_CREEPS).length;
    });

    return freePositions;
};