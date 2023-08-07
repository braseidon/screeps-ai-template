global.C = {
    USERNAME: 'ShutteR',
    SIGN_TEXT: 'Why fart and waste it when you can burp and taste it',
    OWNED_ROOM: 'owned room',
    EXTERNAL_ROOM: 'external room',
    HIGH_WAY: 'high way',
    CENTER_ROOM: 'center room',
    KEEPER_ROOM: 'keeper room',
    STATE: {
        IDLE_CREEPS: 'idleCreeps'
    },
    /*
    ========================================
    harvest energy from source and haul it
    ========================================

    source ----------> container/ground --------> storage
            harvester                    hauler
                                        ----------------------> spawns/extensions
                                         hauler(if no storage)
                                         ----------------------> keeper
                                         hauler(if no storage)
                                         ----------------------> controllerContainer
                                         hauler(if no storage)
                       link --------> spawns/extensions
                             filler
                            --------> StructureController
                             upgrader

    ========================================
    if storage present, do this pattern
    ========================================
    storage --------> structures
             builder
            --------> spawns/extensions ------------> Creeps
             filler                      spawnCreep
            --------> towers -------------> RoomObjects
             keeper           towerAction
            --------> controllerContainer/upgrader ---------> StructureController
             keeper                                 upgrader

    ========================================
    if no storage, fall back to this pattern
    ========================================

    controllerContainer ----------> structures
                         builder

    so keeper redistribute energy from storage or self to towers/upgraders(its container if present)
    */
    //=== Base role ===
    WORKER: 'worker',
    HARVESTER: 'harvester',
    HAULER: 'hauler',
    UPGRADER: 'upgrader',
    BUILDER: 'builder',
    WALLMAINTAINER: 'wallmaintainer',
    FILLER: 'filler',
    KEEPER: 'keeper',
    MINER: 'miner',
    //=== Defense role ===
    GUARDIAN: 'guardian', //honour rampart and fight invaders
    //=== Special role ===
    RECYCLER: 'recycler', //drive creep to put resources into storage and let spawn recycle self
    //=== Multiroom role ===
    SCOUT: 'scout', //travel between rooms and provide vision of the room it stayed
    RESERVER: 'reserver', //go to target room and reserve controller in that room
    REMOTE_WORKER: 'Rworker', //go to target room, get energy and haul it back
    REMOTE_HARVESTER: 'Rharvester', //go to target room and be a miner in that room
    REMOTE_HAULER: 'Rhauler', //travel and haul energy between rooms
    CLAIMER: 'claimer', //go to target room and claim controller in that room
    PIONEER: 'pioneer', //go to target room, build a spawn and upgrade controller until RCL 3
};

const DefaultConfig = require('config_default');
// Prefab objects
global.RoleObj = require('creeps_obj');

//Shorthand
global.Util = {
    Logger: require('util_logger'),
    Helpers: require('util_helpers'),
};