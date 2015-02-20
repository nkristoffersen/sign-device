'use strict';

var validate = require('./validateDevice');

module.exports = function (gateway) {
	return function (id, cb) {
		var callback = function(error) {
			if (error) {
				return cb(error);
			} else {
				return cb(undefined, gateway.deleteById(id));
			}
		};
		return validate.id(id, callback);
	};
};
