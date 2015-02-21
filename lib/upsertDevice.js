'use strict';

var validate = require('./validateDevice');

module.exports = function (gateway) {
	return function (device, cb) {
		var callback = function(error) {
			if (error) {
				return cb(error);
			} else {
				gateway.upsert(device, cb);
			}
		};
		return validate.device(device, callback);
	};
};
