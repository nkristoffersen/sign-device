'use strict';

module.exports = function (gateway) {
	var Factory,
		deleteDeviceById = require('deleteDeviceById')(gateway),
		findDevice = require('findDevice')(gateway),
		newDevice = require('newDevice')(gateway),
		registerDevice = require('registerDevice')(gateway),
		upsertDevice = require('upsertDevice')(gateway);

	Factory = function(action) {
		return function(options, cb) {
			var data = action(options);
			if (data) {
				return cb(undefined, data);
			} else {
				return cb(true);
			}
		};
	};

	return {
		newDevice: new Factory(newDevice),
		registerDevice: new Factory(registerDevice),
		findDevice: new Factory(findDevice),
		upsertDevice: new Factory(upsertDevice),
		deleteDeviceById: new Factory(deleteDeviceById)
	};
};
