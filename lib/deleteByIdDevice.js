module.exports = function (gateway) {
	return function (id) {
		var data = gateway.deleteById(id);
	};
};
