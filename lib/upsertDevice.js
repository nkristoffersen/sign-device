'use strict';

var validate = require('./validateDevice');

module.exports = function (gateway) {
	return function (device, cb) {
		var callback = function(error) {
			if (error) {
				return cb(error);
			} else {
				return cb(undefined, gateway.upsert(device));
			}
		};
		return validate.device(device, callback);
	};
};
