'use strict';

module.exports = function (gateway) {
	var Factory,
		deleteByIdDevice = require('./lib/deleteByIdDevice')(gateway),
		findDevice = require('./lib/findDevice')(gateway),
		newDevice = require('./lib/newDevice')(gateway),
		registerDevice = require('./lib/registerDevice')(gateway),
		upsertDevice = require('./lib/upsertDevice')(gateway);

	Factory = function(action) {
		return function(options, cb) {
			return action(options, cb);
		};
	};

	return {
		newDevice: new Factory(newDevice),
		registerDevice: new Factory(registerDevice),
		findDevice: new Factory(findDevice),
		upsertDevice: new Factory(upsertDevice),
		deleteByIdDevice: new Factory(deleteByIdDevice)
	};
};
