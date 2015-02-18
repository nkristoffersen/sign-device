var shortId = require('shortid'),
		validate = require('./validateDevice');

module.exports = function (gateway) {
	return function (token) {
		var code = shortId.generate().slice(0,6),
			callback = function(error) {
				if (error) {
					return undefined;
				} else {
					data = gateway.save({
						code: code,
						token: token
					});

					return data;
				}
			};

		return validate.token(token, callback);
	};
};
