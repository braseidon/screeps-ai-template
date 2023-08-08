var mod = {

    /**
     * Check the total energy cost of a creep's bodies
     *
     * @param  {Creep} creep
     * @return {int}
     */
    bodyCost: function(creep) {
        let cost = 0;
        for(var i in creep.body) {
            // _.forEach(creep.body, function(part) { cost += BODYPART_COST[part[type]]});
            cost += BODYPART_COST[creep.body[i]['type']];
            // console.log();
        }
        // return body.reduce(function (cost, part) {
        //     return cost + BODYPART_COST[part];
        // }, 0);
        return cost;
    },

    /**
       * from string format of creep parts String (tooAngel config format) to creep parts array (screeps format)
       *
       * @param {string} stringParts creep parts String
       * @return {undefined|string[]} creep parts array
       */
    bodyStringToArr: function(stringParts) {
        if (!stringParts || typeof (stringParts) !== 'string') {
            return undefined;
        }
        const arrayParts = [];
        for (const partChar of stringParts) {
            let part;
            switch (partChar) {
            case 'M':
                part = MOVE;
                break;
            case 'C':
                part = CARRY;
                break;
            case 'A':
                part = ATTACK;
                break;
            case 'W':
                part = WORK;
                break;
            case 'R':
                part = RANGED_ATTACK;
                break;
            case 'T':
                part = TOUGH;
                break;
            case 'H':
                part = HEAL;
                break;
            case 'K':
                part = CLAIM;
                break;
            default:
                // should never enter
                part = MOVE;
                Logger.error('bodyStringToArr illegal partChar : ' + part);
            }
            // Logger.warning(`New part: ${part}`);
            arrayParts.push(part);
        }
        // Logger.warning(`bodyStringToArr - ${JSON.stringify(arrayParts)} - typeof ${typeof(arrayParts)}`);
        let bodyData = {};
        bodyData.body = arrayParts;
        bodyData.cost = mod.bodyCost(arrayParts);
        return bodyData;
    },

    bodyCost: function(bodyArray) {
        let cost = 0;
        _.each(bodyArray,
            (p) => {
                cost += BODYPART_COST[p];
            },
        );
        return cost;
    },

    /**
     * Creep part data
     *
     * @class
     */
    // class CreepPartData {
    //   constructor() {
    //     this.fail = false;
    //     this.cost = 0;
    //     this.parts = [];
    //     this.len = 0;
    //   }
};

module.exports = mod;