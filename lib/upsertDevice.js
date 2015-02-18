var validate = require('./validateDevice');

module.exports = function (gateway) {
	return function (device) {
		var callback = function(error) {
			if (error) {
				return undefined;
			} else {
				return gateway.upsert(device);
			}
		};
		return validate.device(device, callback);
	};
};
