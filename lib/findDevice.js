module.exports = function (gateway) {
	return function (options) {
		var id;
		if (options) {
			id = options.id;
		}
		return gateway.findById(id);
	};
};
