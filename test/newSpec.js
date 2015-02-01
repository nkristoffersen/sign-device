var assert = require('chai').assert,
		deviceGateway = require('./deviceGateway.js'),
    newDevice = require('../lib/newDevice')(deviceGateway);

describe('New Device', function() {
	it('Should return and save a new device object', function() {
		var result = newDevice.generate(),
		    savedDevice = deviceGateway.find(result.code);

		assert.isObject(result, 'Result is not an object');
		assert.match(result.code, /^(\w|\d|-|_){6}$/, 'Code is invalid shortid');
		assert.match(result.id, /^.{8}-(.{4}-){3}.{12}$/, 'Id is invalid');
		assert.deepEqual(result, savedDevice, 'Result does not match save');
	});
});
