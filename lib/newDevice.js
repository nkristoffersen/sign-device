var shortId = require('shortid'),
		uuid = require('node-uuid');

module.exports = function (gateway) {
	return {
    generate: function () {
			var code = shortId.generate().slice(0,6),
					id   = uuid.v4();

	    data = gateway.save({
				code: code,
				id: id
			});

			return data;
		}
	};
};
