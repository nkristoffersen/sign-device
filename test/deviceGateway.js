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
		findByCode: function(code, callback) {
			return callback(undefined, sanitize(findDevice('code', code)));
		},
    findById: function(id, callback) {
			return callback(undefined, sanitize(findDevice('id', id)));
		},
    findByToken: function(id, callback) {
			return callback(undefined, sanitize(findDevice('token', id)));
		},
    findByOwnerId: function(ownerId, callback) {
			var results = [];
			data.forEach(function(entry) {
				if(entry.ownerId === ownerId) {
					results.push(entry);
				}
			});
			console.log('results', results);
			return callback(undefined, results);
		},
		save: function(device, callback) {
			device.id = uuid.v4();
			data.push(device);
			return callback(undefined, sanitize(findDevice('id', device.id)));
		},
		upsert: function(device, callback) {
			var index;
			data.forEach(function(item, i) {
				if(item.id === device.id) {
					index = i;
          data[i] = device;
				}
			});
			return callback(undefined, sanitize(data[index]));
		},
		deleteById: function(id, callback) {
			var index;
			data.forEach(function(item, i) {
				if(item.id === id) {
					index = i;
				}
			});
			if (index !== undefined) {
				return callback(undefined, data.splice(index, 1));
			} else {
				return callback('unable to delete device');
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
					token: config.registeredDevice.token,
					ownerId: config.registeredDevice.ownerId,
					device: config.registeredDevice,
					devices: [config.registeredDevice]
				},
				index: {
					id: config.registeredDevice.id,
					token: config.token,
					registered: config.registeredDevice,
					request: config.appReqDevice
				}
			};
			return cb(sanitize(actions[action]));
		}
	};
}());
