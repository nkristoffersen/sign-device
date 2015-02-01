var assert = require('chai').assert,
    newDevice = require('../lib/newDevice');

describe('New Device', function() {
	it('Should return a new device object', function () {
		var result = newDevice();

		assert.isObject(result, 'Result is not an object');
		assert.isString(result.code, 'Result.code is not a string');
		assert.match(result.code, /^(\w|\d|-|_){7,14}$/, 'Code is invalid shortid');
	});
});
