module.exports = function (gateway) {
	return {
		activate: function(device) {
			var device = gateway.findById(device.id);
			device.code = null;
			gateway.upsert(device);
			return device;
		}
	};
};
