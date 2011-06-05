Very Simple Wrapper Over winston logger
---------------------------------------

which provides few functionalities which winston does not offer

* sprintf like message text usage
* create loggers by giving a name (which attached as a metaTag)
* host meta tag also added

Install
=======
	npm install winstoon

Usage
=====
	var winston = require('winston');
	var logger = require('winstoon').createLogger('sample', winston);

### Format message like sprintf
	logger.info('new user registered: %s', 'arunoda');

### added a special 2 metas (hostname and context)
	logger.info('new user registered: %s', 'arunoda');
	//output == 5 Jun 08:18:14 - info: new user registered: arunoda context=sample,host=arunoda-laptop

Test
=====
	nodeunit tests
