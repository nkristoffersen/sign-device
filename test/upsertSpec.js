/*
var assert = require('chai').assert,
		config = require('./config'),
		deviceGateway = require('./deviceGateway.js'),
    newDevice = require('../lib/newDevice')(deviceGateway),
		register = require('../lib/registerDevice')(deviceGateway);

describe('Register Device', function() {
	var device = {},
	    name = 'Billy',
      ownerId = 'F8si3NNi',
      showId = 'show_id_1234';
	beforeEach(function() {
		device  = newDevice.generate();
		device.ownerId = ownerId;
		device.showId = showId;
	});
	afterEach(function() {
		device = {}
	});
	it('Should find device by code, delete code, update and return device', function() {
		var 
		    result = register.activate(device),
		    savedDevice = deviceGateway.findById(result.id);
	  
	  console.log(JSON.stringify(result));

	  assert.isObject(result, 'Result is not an object');
		assert.match(result.id, idRegExp, 'Id is not valid');
		assert.isNull(result.code, 'Code not null');
		assert.strictEqual(result.ownerId, ownerId, 'Names do not match');
		assert.strictEqual(result.showId, showId, 'ShowiDs do not match');
		assert.deepEqual(result, savedDevice, 'Result does not match save');
	});
	it('Should add name if set', function() {
		device.name = name;

		var result = register.activate(device),
		    savedDevice = deviceGateway.findById(result.id);

		assert.strictEqual(result.name, name, 'Names do not match');
		assert.deepEqual(result, savedDevice, 'Result does not match save');
	});
});
*/
