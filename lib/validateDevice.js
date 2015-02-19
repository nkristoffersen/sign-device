'use strict';

module.exports = (function () {
	var message = '',
	evaluate = function(test, m) {
		if (test) {
			return true;
		} else {
			message += m;
			return false;
		}
	},
	tests = {
		isString: function (item) {
			return evaluate(typeof item === 'string', '--Not a string');
		},
		notEmptyString: function (item) {
			return evaluate(item !== '', '--Empty string');
		},
		minLength: function (item, l) {
			return evaluate(item && item.length >= l, '--Under min length');
		},
		exactLength: function (item, l) {
			return evaluate(item && item.length === l, '--Not exact length');
		},
		isDefined: function (item) {
			return evaluate(!!item, '--Undefined');
		},
		isUndefined: function (item) {
			return evaluate(!item, '--Defined');
		}
	},
	calculate = function (results) {
		return results.every(function(item) {
			return item;
		});
	};
	return { 
		token: function (token, cb) {
			message = '';
			var results = [
				tests['isString'](token),
				tests['notEmptyString'](token),
				tests['minLength'](token, 16)
			],
			result = calculate(results);
			return cb(message);
		},
		device: function (device, options, cb) {
			message = '';
			var defaultTests = [],
			deviceIdTests = [],
			deviceCodeTests = [],
			noDeviceId,
			deviceCode,
			results,
			result;

			cb = arguments[arguments.length - 1];

			if(!tests['isDefined'](device)) {
				console.log('message', message);
				return cb(message);
			}

			defaultTests = [
				tests['isString'](device.ownerId),
				tests['notEmptyString'](device.ownerId),
				tests['isString'](device.token),
				tests['notEmptyString'](device.token)
			];

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

			return cb(message);
		},
		id: function (id, cb) {
			message = '';
			var results = [
				tests['isString'](id),
				tests['notEmptyString'](id)
			],
			result = calculate(results);
			return cb(message);
		}
	};
}());
