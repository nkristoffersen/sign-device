module.exports = function (gateway) {
	return function (device){
		return gateway.upsert(device);
	};
};
