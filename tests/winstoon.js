/**

	The MIT License
	
	Copyright (c) 2011 Arunoda Susiripala
	
	Permission is hereby granted, free of charge, to any person obtaining a copy
	of this software and associated documentation files (the "Software"), to deal
	in the Software without restriction, including without limitation the rights
	to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	copies of the Software, and to permit persons to whom the Software is
	furnished to do so, subject to the following conditions:
	
	The above copyright notice and this permission notice shall be included in
	all copies or substantial portions of the Software.
	
	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
	THE SOFTWARE.

 */

var winstoon = require('winstoon');
var winston = require('winston');

exports.testSprintfOnly = function(test) {
	var logger_ = new (winston.Logger)( { transports: [ new (winston.transports.Console)()] });
	var logger = winstoon.createLogger('a', logger_);

	logger_.on('log', function(transport, level, msg, meta) {
		test.equal('info', level);
		test.equal(msg, 'hello dude: 100');
	})

	logger.info('hello dude: %s', '100');

	test.done();	
};

exports.testMessageOnly = function(test) {
	
	var logger_ = new (winston.Logger)( { transports: [ new (winston.transports.Console)()] });
	var logger = winstoon.createLogger('a', logger_);
		
	logger_.on('log', function(transport, level, msg, meta) {
		test.equal('info', level);
		test.equal(msg, 'hello dude');
	})

	logger.info('hello dude');

	test.done();	
};

exports.testMetaOnly = function(test) {
	var logger_ = new (winston.Logger)( { transports: [ new (winston.transports.Console)()] });
	var logger = winstoon.createLogger('a', logger_);
		
	logger_.on('log', function(transport, level, msg, meta) {
		test.equal('info', level);
		test.equal(msg, 'hello dude');
		console.log(meta);
		test.equal('hello', meta.tag);
	})

	logger.info('hello dude', {tag: 'hello'});

	test.done();	
};


exports.testLengthySprintf = function(test) {
	var logger_ = new (winston.Logger)( { transports: [ new (winston.transports.Console)()] });
	var logger = winstoon.createLogger('a', logger_);

	logger_.on('log', function(transport, level, msg, meta) {
		test.equal('info', level);
		test.equal(msg, 'hello dude: arunoda susiripala. age: 23');
	})

	logger.info('hello dude: %s %s. age: %d', 'arunoda', 'susiripala', 23);

	test.done();	
};

exports.testLengthySprintfAAndTags = function(test) {
	var logger_ = new (winston.Logger)( { transports: [ new (winston.transports.Console)()] });
	var logger = winstoon.createLogger('a', logger_);

	logger_.on('log', function(transport, level, msg, meta) {
		test.equal('info', level);
		test.equal(msg, 'hello dude: arunoda susiripala. age: 23');
		test.equal(meta.tag, 'hi');
	})

	logger.info('hello dude: %s %s. age: %d', 'arunoda', 'susiripala', 23, {tag: "hi"});

	test.done();	
};

exports.testNoArgs = function(test) {
	var logger_ = new (winston.Logger)( { transports: [ new (winston.transports.Console)()] });
	var logger = winstoon.createLogger('a', logger_);

	test.throws(function() {
		logger.info();
	});

	test.done();
};

exports.testLessArgsForSprintf = function(test) {
	var logger_ = new (winston.Logger)( { transports: [ new (winston.transports.Console)()] });
	var logger = winstoon.createLogger('a', logger_);

	test.throws(function() {
		logger.info('hello dude: %s %s. age: %d', 'ar', 'su');
	});

	test.done();
};

exports.testNormal = function(test) {
	
	var logger = winstoon.createLogger('test');
	logger.error('fatal error occured when registering user: %s', 'arunoda');
	for(var index in logger) {
		console.log(index);
	}
	test.done();
};

exports.testAdditionalMeta = function(test) {
	
	test.expect(4);
	var logger_ = new (winston.Logger)( { transports: [ new (winston.transports.Console)()] });
	var logger = winstoon.createLogger('amps', logger_);

	logger_.on('log', function(transport, level, msg, meta) {
		test.equal('info', level);
		test.equal(msg, 'hello dude: arunoda susiripala. age: 23');
		test.equal(meta.host, require('os').hostname());
		test.equal(meta.context, 'amps');
	})

	logger.info('hello dude: %s %s. age: %d', 'arunoda', 'susiripala', 23);

	test.done();
}


