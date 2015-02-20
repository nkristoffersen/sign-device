'use strict';

var shortId = require('shortid'),
		validate = require('./validateDevice');

module.exports = function (gateway) {
	return function (token, cb) {
		var code = shortId.generate().slice(0,6),
			data,
			callback = function(error) {
				if (error) {
					return cb(error);
				} else {
					data = gateway.save({
						code: code,
						token: token
					});

					return cb(undefined, data);
				}
			};

		return validate.token(token, callback);
	};
};
