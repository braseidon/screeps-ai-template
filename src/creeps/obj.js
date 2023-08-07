// const template = require('creeps_template');

let mod = function(roleName) {
    this.roleName = roleName;
    this.commonRoleConfig = {
        bofore: [],
        after: []
    };
    this.defaultMemory = {
        bodyString: '', // MWC
        bodyCost: 0,
        pop: 0,
        minEnergy: 0,
        routing: {
            targetId: '',
            targetRoom: '',
        },
        slug: '',
        // inStack: [Action.Back, Action.Harvest],
        // inStack: [],
        //aka link-mining, container-mining and drop-mining
        // outStack: [Action.PutToLink, Action.Put, Action.Drop],
        // outStack: [],
        // param: ['controller.level', 'energyAvailable'],
        // minPop: 4,
        // amount: {
        //     1: [2, 1, 1],
        //     2: {
        //         0: [2, 1, 1],
        //         550: [4, 3, 1],
        //         750: [2, 1, 1],
        //     },
        // },
        // maxLayoutAmount: 6,
    };
    this.mergedSettings = {};

    //Util function
    this.loop0 = function(creep, useOut) {
        // if(useOut) {
        //     const stack = this.roleConfig.outStack;
        //     //If can't process previous action then invoke next
        //     for(let i=0; i<stack.length; i++) {
        //         if(stack[i].loop(creep)) return;
        //     }
        // }
        // else {
        //     const stack = this.roleConfig.inStack;
        //     for(let i=0; i<stack.length; i++) {
        //         if(stack[i].loop(creep)) return;
        //     }
        // }
        // _.forEach(this.commonRoleConfig.after, action=>action.loop(creep));
    };

    //Default behaviour, can be override
    this.run = function(creep) {
        //Check active carry part
        // const useOut = creep.getActiveBodyparts(CARRY) == 0 ? false : _.sum(creep.carry) == creep.carryCapacity;
        // this.loop0(creep, useOut);
    };

    // Returns true if this creep needs to spawn another
    this.getSpawnRequests = function(room) {
        var creeps = _.filter(Game.creeps, (creep) => creep.memory.role == this.roleName && creep.room.name == room.name);
        // console.log(JSON.stringify(this.settings));
        let popNeeded = this.getPopNeeded(room);

        Logger.info(`Creep Type: ${this.roleName} | Current: ${creeps.length} | Needed: ${popNeeded} | Min Energy: ${this.settings.minEnergy}`);


        if (popNeeded !== false) {
            // If we have less than the population needed and enough energy capacity
            if (creeps.length < popNeeded &&
                room.energyCapacityAvailable >= this.settings.minEnergy) {
                return true;
            }
            //
            return false;
        }

        Logger.warning(`${this.roleName} role object returning false for this.getPopNeeded()`);
        return false;
    };

    // Get needed creep population total
    // Meant to be extended
    this.getPopNeeded = function(room) {
        let pop = this.settings.pop;

    };

    // The slug to identify this creep in the room/queue memory
    this.getSpawnSlug = function(targetRoom, targetId) {
        return _.join([this.roleName, this.targetRoom, this.targetId], '-');
    };

    // returns an object with the data to spawn a new creep
    this.spawnDataOld = function() {
        let name = this.roleName + Game.time;
        let body = this.settings.bodyString;
        let memory = {
            role: this.roleName,
            // time: Game.time,
            routing: {
                targetRoom: this.settings.targetRoom,
                targetId: this.settings.targetId,
            }
        };

        return {name, body, memory};
    };

    // To be run on each extension
    this.updateSettings = function() {
        Logger.trace(`Creep Role ${this.roleName} update settings, default: ${JSON.stringify(this.defaultMemory)}`);
        // settings = this.settings;
        if (typeof(this.settings) !== 'object') {
            Logger.error(`Role ${this.roleName} updateSettings() function called with this.settings as a non-object`);
            return this.defaultMemory;
        }
        this.settings = _.defaults(this.settings, this.defaultMemory);

        Logger.trace(`Creep Role ${this.roleName} update settings, merged: ${JSON.stringify(this.settings)}`);
    };
};

module.exports = mod;
