var shortId = require('shortid');

module.exports = function () {
	return {
		code: shortId.generate()
	};
};
