'use strict';

module.exports = (function () {
	var tests = {
		isString: function (item) {
			return typeof item === 'string';
		},
		notEmptyString: function (item) {
			return item !== '';
		},
		minLength: function (item, l) {
			if (item) {
				return item.length >= l;
			} else {
				return false;
			}
		},
		isUndefined: function (item) {
			return !item;
		},
		exactLength: function (item, l) {
			if (item) {
				return item.length === l;
			} else {
				return false;
			}
		}
	},
	calculate = function (results) {
		return results.every(function(item) {
			return item;
		});
	};
	return { 
		token: function (token, cb) {
			var results = [
				tests['isString'](token),
				tests['notEmptyString'](token),
				tests['minLength'](token, 16)
			],
			result = calculate(results);
			return cb(!result);
		},
		device: function (device, options, cb) {
			var defaultTests = [
				tests['isString'](device.ownerId),
				tests['notEmptyString'](device.ownerId),
				tests['isString'](device.token),
				tests['notEmptyString'](device.token)
			],
			deviceIdTests = [],
			deviceCodeTests = [],
			noDeviceId,
			deviceCode,
			results,
			result;

			cb = arguments[arguments.length - 1];

			if (typeof options === 'object') {
				noDeviceId = options.noDeviceId;
				deviceCode = options.deviceCode;
			}

			if (!noDeviceId) {
				deviceIdTests = [
					tests['isString'](device.id),
					tests['notEmptyString'](device.id)
				];
			}

			if (deviceCode) {
				deviceCodeTests = [
					tests['isString'](device.code),
					tests['notEmptyString'](device.code),
					tests['exactLength'](device.code, 6)
				];
			} else {
				deviceCodeTests = [
					tests['isUndefined'](device.code)
				];
			}

			results = defaultTests.concat(deviceIdTests, deviceCodeTests);

			result = calculate(results);

			return cb(!result);
		},
		id: function (id, cb) {
			var results = [
				tests['isString'](id),
				tests['notEmptyString'](id)
			],
			result = calculate(results);
			return cb(!result);
		}
	};
}());
