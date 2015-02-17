module.exports = function (gateway) {
	return function (device){
		gateway.upsert(device);
	};
};
