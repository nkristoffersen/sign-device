var	uuid = require('node-uuid');

module.exports = (function() {
	var data = [],
      findDevice = function(key, id) {
				var device;
				data.forEach(function(item) {
					if(item[key] === id) {
						device = JSON.parse(JSON.stringify(item));
					}
				});
				return device;
			};

	return {
		findByCode: function(code) {
			return findDevice('code', code);
		},
    findById: function(id) {
			return findDevice('id', id);
		},
		save: function(code) {
			code.id = uuid.v4();
			data.push(code);
			return code;
		},
		upsert: function(device) {
			data.forEach(function(item, i) {
				if(item.id === device.id) {
          data[i] = device;
				}
			});
		}
	};
}());
