module.exports = function (gateway) {
	return {
		activate: function(device) {
			if (gateway.findById(device.id)) {;
				device.code = null;
				return gateway.upsert(device);
			} else {
				return 'Unable to update device';
			}
		}
	};
};
