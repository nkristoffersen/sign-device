var validate = require('./validateDevice');

module.exports = function (gateway) {
	return  function(device) {
		var foundDevice = gateway.findByCode(device.code),
			callback = function(error) {
				if (foundDevice && !error) {
					device.code = null;
					device.id = foundDevice.id;
					return gateway.upsert(device);
				} else {
					return undefined;
				}
			};
		return validate.device(device, {noDeviceId: true, deviceCode: true}, callback);
	};
};
