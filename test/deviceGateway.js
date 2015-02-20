'use strict';

var	uuid = require('node-uuid'),
		config = require('./config.json');

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
				if (json) {
					return JSON.parse(JSON.stringify(json));
				} else {
					return json;
				}
			},
			defaultData = [
				config.registeredDevice,
				config.unregisteredDevice
			];


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
		},
		deleteById: function(id) {
			var index;
			data.forEach(function(item, i) {
				if(item.id === id) {
					index = i;
				}
			});
			if (index !== undefined) {
				return data.splice(index, 1);
			} else {
				return false;
			}
		},
		setDefault: function(action, cb) {
			data = sanitize(defaultData);
			var actions = {
				register: {
					id: config.unregisteredDevice.id,
					name: config.name,
					ownerId: config.appReqDevice.ownerId,
					token: config.unregisteredDevice.token,
					showId: config.appReqDevice.showId,
					request: config.appReqDevice
				},
				upsert: {
					name: config.name,
					device: config.registeredDevice
				},
				deleteById: {
					id: config.registeredDevice.id,
					device: config.registeredDevice
				},
				find: {
					id: config.registeredDevice.id,
					device: config.registeredDevice
				}
			};
			return cb(sanitize(actions[action]));
		}
	};
}());
