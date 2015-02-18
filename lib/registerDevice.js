module.exports = function (gateway) {
	return  function(device) {
		var foundDevice = gateway.findByCode(device.code);
		if (foundDevice) {
			device.code = null;
			device.id = foundDevice.id;
			return gateway.upsert(device);
		} else {
			return 'Unable to update device';
		}
	};
};
