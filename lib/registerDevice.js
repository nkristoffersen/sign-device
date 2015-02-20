var validate = require('./validateDevice');

module.exports = function (gateway) {
	return  function(device, cb) {
		var callback = function(error) {
			if (error) {
				return cb(error);
			}
			var foundDevice = gateway.findByCode(device.code);
			if (foundDevice) {
				device.code = null;
				device.id = foundDevice.id;
				return cb(undefined, gateway.upsert(device));
			} else {
				return cb('Unable to register device');
			}
		};
		return validate.device(device, {registerDevice: true}, callback);
	};
};
