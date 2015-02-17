var shortId = require('shortid'),
		uuid = require('node-uuid');

module.exports = function (gateway) {
	return function (token) {
		var code = shortId.generate().slice(0,6);

		data = gateway.save({
			code: code,
			token: token
		});

		return data;
	};
};
