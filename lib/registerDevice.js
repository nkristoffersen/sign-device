var validate = require('./validateDevice');

module.exports = function (gateway) {
	return  function(device, cb) {
		var callback = function(error) {
			if (error) {
				return cb(error);
			}
			gateway.findByCode(device.code, function(error, foundDevice) {
				if (foundDevice) {
					device.code = null;
					device.id = foundDevice.id;
					return gateway.upsert(device, cb);
				} else {
					return cb('Unable to register device');
				}
			});
		};
		return validate.device(device, {registerDevice: true}, callback);
	};
};
