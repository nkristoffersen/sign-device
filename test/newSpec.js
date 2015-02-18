var assert = require('chai').assert,
		config = require('./config'),
		codeRegExp = RegExp(config.codeRegExp),
		idRegExp = RegExp(config.idRegExp),
		deviceGateway = require(config.gateway),
    newDevice = require(config.newDevice)(deviceGateway);

describe('New Device', function() {
	it('Should return and save a new device object', function() {
		var token = config.token,
		    result = newDevice(token),
		    savedDevice = deviceGateway.findByCode(result.code);

		assert.isObject(result, 'Result is not an object');
		assert.match(result.code, codeRegExp, 'Code is invalid shortid');
		assert.match(result.id, idRegExp, 'Id is invalid');
		assert.strictEqual(result.token, token, 'Tokens do not match');
		assert.deepEqual(result, savedDevice, 'Result does not match save');
	});
});
