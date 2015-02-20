'use strict';

var assert = require('chai').assert,
		config = require('./config'),
		deviceGateway = require(config.gateway),
    newDevice = require(config.newDevice)(deviceGateway),
		register = require(config.register)(deviceGateway),
		upsert = require(config.upsert)(deviceGateway);

describe('Upsert Device', function() {
	var device = {},
			name;
	beforeEach(function() {
		deviceGateway.setDefault('upsert', function (data) {
			device = data.device;
			name = data.name;
		});
	});
	afterEach(function() {
		device = {};
	});
	it('Should update device name', function() {
		var newName = 'Timmy',
		  result = {},
			error;
	  device.name = newName;
		upsert(device, function (e, r) {
			result = r;
			error = e;
		});
		  
		assert.isUndefined(error, 'Error is defined');
		assert.notStrictEqual(result.name, name, 'Name not updated');
		assert.strictEqual(result.name, newName, 'Names do not match');
	});
});
