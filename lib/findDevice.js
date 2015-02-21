'use strict';

var validate = require('./validateDevice');

module.exports = function (gateway) {
	return function (options, cb) {
		var id, action, callback;

		callback = function(error) {
			if (error) {
				return cb(error);
			} else {
				action(id, cb);
			}
		};

		if (options && options.id) {
			id = options.id;
			action = gateway.findById;
			return validate.id(id, callback);
		} else if (options && options.token) {
			id = options.token;
			action = gateway.findByToken;
			return validate.token(id, callback);
		} else if (options && options.ownerId) {
			id = options.ownerId;
			action = gateway.findByOwnerId;
			return validate.id(id, callback);
		} else {
			return cb('Unable to find');
		}
	};
};
