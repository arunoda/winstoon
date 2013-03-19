var util = require('util');
var winston = require('winston');

var globalLogger = new (winston.Logger)({});

var logLevels = ['fatal', 'error', 'warn', 'info', 'debug', 'log'];
var invertedLogLevels = getInvertedObject(logLevels);
var rootLogLevel = {name: 'log', index: 6};

module.exports = ModLogger;

function ModLogger(name, logger) {

        if(!(this instanceof ModLogger)) {
            return new ModLogger(name, logger || globalLogger);
        }

        var self = this;
        var commonTags;

        if(typeof(name) == 'string') {
            commonTags = {
                context: name
            };
        } else if(typeof(name) == 'object') {
            commonTags = name;
        } else {
            throw new Error('first argument should be either String or an Object');
        }

        logLevels.forEach(function(level) {

            self[level] = function(message, tags) {
                self.log(level, message, tags);
            }
        });

        this.log = function(level, message, tags) {

            var tags = tags || {};
            copyFieldsInfo(tags, commonTags);

            var currLevelIndex = invertedLogLevels[level];
            if(currLevelIndex <= rootLogLevel.index) {
                logger.log(level, message, tags);
            }
        };

        this.on = function() {
            logger.on.apply(logger, arguments); 
        };
}

ModLogger.createLogger = function(name, logger) {
    
    return new ModLogger(name, logger || globalLogger);
};

ModLogger.add = function() {
    
    return globalLogger.add.apply(globalLogger, arguments); 
};

ModLogger.setRootLevel = function(level) {
    
    rootLogLevel = {
        name: level,
        index: invertedLogLevels[level]
    };
};

ModLogger.transports = winston.transports;

function copyFieldsInfo(destination, source) {

    for(var key in source) {
        destination[key] = source[key];
    }
}

function getInvertedObject(obj) {

    var inverted = {};
    for(var key in obj) {
        inverted[obj[key]] = key;
    }

    return inverted;
}