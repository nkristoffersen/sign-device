module.exports = (function() {
	var data = [];
	return {
		find: function(code) {
			var device = {};
			data.forEach(function(item) {
				if(item.code === code) {
					device = item;
				}
			});
			return device;
		},
		save: function(code) {
			data.push(code);
			return code;
		}
	};
}());
