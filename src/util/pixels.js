/**
 * pixels
 */
let mod = {
    generate: function() {
        const pixelEnabled = true;

        if(pixelEnabled === true) {
            if(typeof PIXEL !== 'undefined') {
                if(Game.cpu.bucket >= PIXEL_CPU_COST) {
                    Game.cpu.generatePixel();
                }
            }
        }
    }
};

module.exports = mod;