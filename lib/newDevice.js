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
					return gateway.save({
							code: code,
							token: token
						},
						cb);
				}
			};

		return validate.token(token, callback);
	};
};
