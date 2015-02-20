'use strict';

var validate = require('./validateDevice');

module.exports = function (gateway) {
	return function (options, cb) {
		var id,
		callback = function(error) {
			if (error) {
				return cb(error);
			} else {
				return cb(undefined, gateway.findById(id));
			}
		};
		if (options) {
			id = options.id;
		}
		return validate.id(id, callback);
	};
};
