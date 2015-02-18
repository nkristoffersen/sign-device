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
		device: function (device, cb) {
			var results = [
				tests['isString'](device.ownerId),
				tests['notEmptyString'](device.ownerId),
				tests['isString'](device.token),
				tests['notEmptyString'](device.token)
			],
			result = calculate(results);

			return cb(!result);
		}
	};
}());
