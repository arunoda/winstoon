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

	Very Simple Wrapper Over winston logger
	---------------------------------------

	which provides two main functionalities which winston does not offer
	* sprintf like message text usage
	* create loggers by giving a name (which attached as a metaTag)
	* host meta tag also added

	Usage
	=====
	var winston = require('winston');
	var logger = require('winstoon').createLogger(sample, winston);

	logger.info('new user registered: %s', user.name, {userId: user.id});

 */

var sprintf = require('sprintf').sprintf;
var util = require('util');

exports.createLogger = function(name, winston) {
	if(!winston) {
		winston = require('winston');	
	}

	return new ModLogger(name, winston);
};

/**
*/
function ModLogger(name, winston) {

		var self = this;

		//Copy cat all the methods of winston
		for(var index in winston) {
			this[index] = function() {
				winston[index].call(winston, arguments);
			};
		}
		

		var logLevels = ['info', 'debug', 'error', 'warn', 'fatal'];

		//adding log levels as methods
		logLevels.forEach(function(level) {
			self[level] = function() {
				self.log(level, arguments);
			}; 
		});

		this.log = function(level, args) {

			if(args.length > 0) {
				var message = args[0];
				var tags = null;
				var sprintfFields = null;

				if(args.length == 2) {
					if(typeof(args[1]) == 'object') {
						tags = args[1]; //when tag provides as the second arg
					} else {
						sprintfFields =[args[1]];
					}
				} else if(args.length > 2) {
					var last = args[args.length -1];
					if(typeof(last) == 'object') {
						tags = last; //when tags provided as the last argument
						sprintfFields = splice(args, 1, args.length - 2); 
					} else {
						sprintfFields = splice(args, 1, args.length - 1); //when all the keys are sprintf keys
					}
				}

				//applly actual log

				//if sprintf needs to be apply
				if(sprintfFields) {
					sprintfFields.unshift(message);
					try{
						message = sprintf.apply(this, sprintfFields);
					} catch(err) {
						throw new Error('formatting fails in the message: (' + err.toString() + ')');
					}
				}

				//modify tags to add additional properties
				if(!tags) {
					tags = {};
				} 
				tags.context = name;
				tags.host = require('os').hostname();

				winston.log(level, message, tags);

			} else {
				throw new Error("log message required");	
			}	
		};
}

/**
implements the slice
*/
function splice(obj, start, limit) {
	var out = [];
	var currIndex = 0;
	for(var index in obj) {
		
		if(currIndex >= start && currIndex < start + limit) {
			out.push(obj[index]);	
		}

		++currIndex;
	}

	return out;
}
