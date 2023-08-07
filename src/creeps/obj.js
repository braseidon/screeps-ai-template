// const template = require('creeps_template');

var mod = function(name) {
    this.roleName = name;
    this.commonRoleConfig = {
        bofore: [],
        after: []
    };
    this.settings = {
        param: ['controller.level', 'energyAvailable'],
        bodyString: '', // MWC
        // inStack: [Action.Back, Action.Harvest],
        inStack: [],
        //aka link-mining, container-mining and drop-mining
        // outStack: [Action.PutToLink, Action.Put, Action.Drop],
        outStack: [],
        pop: 0,
        minEnergy: 0,
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
    this.needsSpawn = function(room) {
        var creeps = _.filter(Game.creeps, (creep) => creep.memory.role == this.roleName && creep.room.name == room.name);
        let capacity = room.energyCapacityAvailable;

        // If we have less than the population needed and enough energy capacity
        if (creeps.length < this.settings.pop &&
            capacity >= this.settings.minEnergy) {
            return true;
        }
        //
        return false;
    };

    // returns an object with the data to spawn a new creep
    this.spawnData = function() {
        let name = this.roleName + Game.time;
        let body = this.settings.bodyString;
        let memory = {
            role: this.roleName,
            time: Game.time,
        };

        return {name, body, memory};
    };
};

module.exports = mod;
