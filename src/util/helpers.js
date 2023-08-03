var helpers = {

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
    }
};

module.exports = helpers;