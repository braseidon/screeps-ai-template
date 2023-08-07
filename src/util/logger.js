const LogLevel = {
    'trace': 1, //Something happens very often, message goes here is only for observation
    'debug': 2,
    'info': 3,
    'warning': 4,
    'error': 5,
    'fatal': 6,
    'nil': 7
};

function Logger() {
    this.logLevel = Memory.logLevel || 2;
    this.setLogLevel = function(level) {
        Memory.logLevel = level;
        this.logLevel = level;
    };
    this.trace = function(message) {
        if(this.logLevel <= LogLevel['trace']) {
            console.log('[TRACE] '+message);
        }
    };
    this.debug = function(message) {
        if(this.logLevel <= LogLevel['debug']) {
            console.log(`<font color="grey">[DEBUG] ${message}</font>`);
        }
    };
    this.info = function(message) {
        if(this.logLevel <= LogLevel['info']) {
            console.log(`<font color="green">[INFO] ${message}</font>`);
        }
    };
    this.warning = function(message) {
        if(this.logLevel <= LogLevel['warning']) {
            console.log(`<font color="yellow">[WARNING] ${message}</font>`);
        }
    };
    this.error = function(message) {
        if(this.logLevel <= LogLevel['error']) {
            console.log(`<font color="orange">[ERROR] ${message}</font>`);
        }
    };
    this.fatal = function(message) {
        if(this.logLevel <= LogLevel['fatal']) {
            console.log(`<font color="red">[FATAL] ${message}</font>`);
        }
    };
    this.nil = function(message) {
        if(this.logLevel <= LogLevel['nil']) {
            //Do nothing
        }
    };

    this.section = function(message) {
        if(this.logLevel <= LogLevel['info']) {
            this.info('---------------------------------------------------');
            this.info(message);
            this.info('---------------------------------------------------');
        }
    };
};

module.exports = new Logger();
