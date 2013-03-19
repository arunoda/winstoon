var assert      = require('assert');
var winstoon    = require('../');
winstoon.add(winstoon.transports.Console);

suite('winstoon', function() {
    
    test('message only', function(done) {

        var loggerName = 'the-name';
        var message = 'hello message';

        var _logger = {
            log: function(level, _message, tags) {
                
                assert.equal(level, 'info');
                assert.equal(_message, message);
                assert.deepEqual(tags, { context: loggerName });
                done();
            }
        }

        var wLogger = new winstoon(loggerName, _logger);
        wLogger.info(message);
    });

    test('message with tags', function(done) {

        var loggerName = 'the-name';
        var message = 'hello message';

        var _logger = {
            log: function(level, _message, tags) {
                
                assert.equal(level, 'info');
                assert.equal(_message, message);
                assert.deepEqual(tags, { context: loggerName, tag: 'aaa' });
                done();
            }
        }

        var wLogger = new winstoon(loggerName, _logger);
        wLogger.info(message, { tag: 'aaa' });
    });

    test('message with common tags', function(done) {

        var loggerName = 'the-name';
        var message = 'hello message';
        var host = 'host..';

        var _logger = {
            log: function(level, _message, tags) {
                
                assert.equal(level, 'info');
                assert.equal(_message, message);
                assert.deepEqual(tags, { tag: 'aaa', host: host });
                done();
            }
        }

        var wLogger = new winstoon({ host: host }, _logger);
        wLogger.info(message, { tag: 'aaa' });
    });

    test('module function construction', function(done) {

        var loggerName = 'the-name';
        var message = 'hello message';
        var host = 'host..';

        var _logger = {
            log: function(level, _message, tags) {
                
                assert.equal(level, 'info');
                assert.equal(_message, message);
                assert.deepEqual(tags, { tag: 'aaa', host: host });
                done();
            }
        }

        var wLogger = winstoon({ host: host }, _logger);
        wLogger.info(message, { tag: 'aaa' });
    });

    test('.createLogger() function construction', function(done) {

        var loggerName = 'the-name';
        var message = 'hello message';
        var host = 'host..';

        var _logger = {
            log: function(level, _message, tags) {
                
                assert.equal(level, 'info');
                assert.equal(_message, message);
                assert.deepEqual(tags, { tag: 'aaa', host: host });
                done();
            }
        }

        var wLogger = winstoon.createLogger({ host: host }, _logger);
        wLogger.info(message, { tag: 'aaa' });
    });

    test('log levels and root log level', function(done) {

        var loggerName = 'the-name';
        var message = 'hello message';
        var host = 'host..';

        var _logger = {
            log: function(level, _message, tags) {
                
                assert.ifError(new Error('invalid log receiving'));
            }
        }

        var wLogger = winstoon({ host: host }, _logger);
        winstoon.setRootLevel('warn');
        wLogger.info(message, { tag: 'aaa' });

        setTimeout(done, 50);
    });
});
