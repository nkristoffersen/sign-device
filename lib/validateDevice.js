'use strict';

module.exports = (function () {
	var evaluate = function(test, name, message) {
		if (test) {
			return undefined;
		} else {
			return name + ' is ' + message;
		}
	},
	newMessage = function (messages) {
		var message = [];
		messages.forEach(function(entry) {
			if (entry) {
				message.push(entry);
			}
		});
		return message.join('---');
	},
	tests = {
		isString: function (item, name) {
			return evaluate(typeof item === 'string', name, 'not a string');
		},
		notEmptyString: function (item, name) {
			return evaluate(item !== '', name, 'empty string');
		},
		minLength: function (item, l, name) {
			return evaluate(item && item.length >= l, name, 'under min length ' + l);
		},
		exactLength: function (item, l, name) {
			return evaluate(item && item.length === l, name, 'not exact length '+ l);
		},
		isDefined: function (item, name) {
			return evaluate(!!item, name, 'undefined');
		},
		isUndefined: function (item, name) {
			return evaluate(!item, name, 'defined');
		}
	};
	return { 
		token: function (token, cb) {
			var results = [
				tests['isString'](token, 'token'),
				tests['notEmptyString'](token, 'token'),
				tests['minLength'](token, 16, 'token')
			];
			return cb(newMessage(results));
		},
		device: function (device, options, cb) {
			var defaultTests = [],
			deviceIdTests = [],
			deviceCodeTests = [],
			deviceTokenTests = [],
			noDeviceId,
			deviceCode,
			deviceToken,
			results;

			cb = arguments[arguments.length - 1];

			if(!device) {
				return cb('No device');
			}

			defaultTests = [
				tests['isString'](device.ownerId, 'ownerId'),
				tests['notEmptyString'](device.ownerId, 'ownerId'),
			];

			if (typeof options === 'object') {
				noDeviceId = options.noDeviceId;
				deviceCode = options.deviceCode;
				deviceToken = options.deviceToken;
			}

			if (!noDeviceId) {
				deviceIdTests = [
					tests['isString'](device.id, 'deviceId'),
					tests['notEmptyString'](device.id, 'deviceId')
				];
			}

			if (deviceCode) {
				deviceCodeTests = [
					tests['isString'](device.code, 'deviceCode'),
					tests['notEmptyString'](device.code, 'deviceCode'),
					tests['exactLength'](device.code, 6, 'deviceCode')
				];
			} else {
				deviceCodeTests = [
					tests['isUndefined'](device.code, 'deviceCode')
				];
			}

			if (deviceToken) {
				deviceTokenTests = [
					tests['isString'](device.token, 'deviceToken'),
					tests['notEmptyString'](device.token, 'deviceToken')
				];
			}
			results = defaultTests.concat(deviceIdTests, deviceCodeTests, deviceTokenTests);

			return cb(newMessage(results));
		},
		id: function (id, cb) {
			var results = [
				tests['isString'](id, 'id'),
				tests['notEmptyString'](id, 'id')
			];
			return cb(newMessage(results));
		}
	};
}());
