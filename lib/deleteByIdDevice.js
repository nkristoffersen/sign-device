'use strict';

var validate = require('./validateDevice');

module.exports = function (gateway) {
	return function (id) {
		var callback = function(error) {
			if (error) {
				return undefined;
			} else {
				return gateway.deleteById(id);
			}
		};
		return validate.id(id, callback);
	};
};
