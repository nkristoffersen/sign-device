'use strict';

var validate = require('./validateDevice');

module.exports = function (gateway) {
	return function (id, cb) {
		var callback = function(error) {
			if (error) {
				return cb(error);
			}
			gateway.deleteById(id, cb);
		};
		return validate.id(id, callback);
	};
};
