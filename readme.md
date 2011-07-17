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
### Add transports
This needs to done at once on your source and applies to all

	winstoon.add(winstoon.transports.Console);

#### Other transports available
winstoon inherits all the tranports available at [winston](https://github.com/indexzero/winston)

### Format message like sprintf
	logger.info('new user registered: %s', 'arunoda');

### added a special 2 metas (hostname and context)
	logger.info('new user registered: %s', 'arunoda');
	//output == 5 Jun 08:18:14 - info: new user registered: arunoda context=sample,host=arunoda-laptop

### set root log level
It's very important to switch from the different log levels at different stage of the application.
You can choose your root log level as follows

	winstoon.setRootLevel('debug'); //only show logs levels higher than info

log level priorities can be found here

* fatal
* error
* info
* debug
* log

Test
=====
	nodeunit tests
