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

RoomPosition.prototype.getOpenPositions() = function getOpenPositions() {
    let nearbyPositions = this.getNearbyPositions();

    const terrain = Game.map.getRoomTerrain(this.roomName);
    switch(terrain.get(10, 15)) {
        case TERRAIN_MASK_WALL:
            break;
        case TERRAIN_MASK_SWAMP:
            break;
        case 0:
            break;
    }

    // _.filter();
};