var validate = require('./validateDevice');

module.exports = function (gateway) {
	return  function(device) {
		var callback = function(error) {
			if (error) {
				return undefined;
			}
			var foundDevice = gateway.findByCode(device.code);
			if (foundDevice) {
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
