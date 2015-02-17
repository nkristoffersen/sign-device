var	uuid = require('node-uuid');

module.exports = (function() {
	var data = [],
      findDevice = function(key, id) {
				var device;
				data.forEach(function(item) {
					if(item[key] === id) {
						device = item;
					}
				});
				return device;
			},
	    sanitize = function(json) {
				return JSON.parse(JSON.stringify(json));
			};

	return {
		findByCode: function(code) {
			return sanitize(findDevice('code', code));
		},
    findById: function(id) {
			return sanitize(findDevice('id', id));
		},
		save: function(device) {
			device.id = uuid.v4();
			data.push(device);
			return sanitize(findDevice('id', device.id));
		},
		upsert: function(device) {
			var index;
			data.forEach(function(item, i) {
				if(item.id === device.id) {
					index = i;
          data[i] = device;
				}
			});
			return sanitize(data[index]);
		}
	};
}());
