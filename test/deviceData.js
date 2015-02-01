module.exports = function(gateway) {
	var data = [];
	return {
		find: function() {
			return data;
		}
	}
};
