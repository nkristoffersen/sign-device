'use strict';

var validate = require('./validateDevice');

module.exports = function (gateway) {
	return function (options) {
		var id,
		callback = function(error) {
			if (error) {
				return undefined;
			} else {
				return gateway.findById(id);
			}
		};
		if (options) {
			id = options.id;
		}
		return validate.id(id, callback);
	};
};
