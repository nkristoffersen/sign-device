'use strict';

var assert = require('chai').assert,
		config = require('./config'),
		idRegExp = RegExp(config.idRegExp),
		deviceGateway = require(config.gateway),
    newDevice = require(config.newDevice)(deviceGateway),
		register = require(config.register)(deviceGateway),
		sanitize = function(data) {
			return JSON.parse(JSON.stringify(data));
		};

describe('Register Device', function() {
	var device = {},
			devices = [
				sanitize(config.registeredDevice), 
				sanitize(config.unregisteredDevice)],
	    id = sanitize(config.unregisteredDevice.id),
	    name = sanitize(config.name),
      ownerId = sanitize(config.appReqDevice.ownerId),
	    token = sanitize(config.unregisteredDevice.token),
      showId = sanitize(config.appReqDevice.showId);
	beforeEach(function() {
		device  = sanitize(config.appReqDevice);
		deviceGateway.setDefault(sanitize(devices));
	});
	afterEach(function() {
		device = {};
	});
	it('Should find device by code, delete code, update and return device', function() {
		var 
		    result = register(device),
		    savedDevice = deviceGateway.findById(id);
	  
	  assert.isObject(result, 'Result is not an object');
		assert.match(result.id, idRegExp, 'Id is not valid');
		assert.isNull(result.code, 'Code not null');
		assert.strictEqual(result.ownerId, ownerId, 'Names do not match');
		assert.strictEqual(result.showId, showId, 'ShowiDs do not match');
		assert.deepEqual(result, savedDevice, 'Result does not match save');
	});
	it('Should add name if set', function() {
		device.name = name;

		var result = register(device),
		    savedDevice = deviceGateway.findById(result.id);

		assert.strictEqual(result.name, name, 'Names do not match');
		assert.deepEqual(result, savedDevice, 'Result does not match save');
	});
	it('Should reject if no code', function() {
		device.code = undefined;

		var result = register(device);

		assert.isUndefined(result, 'No code is saved');
	});
	it('Should reject if code is empty string', function() {
		device.code = '';

		var result = register(device);

		assert.isUndefined(result, 'No code is saved');
	});
});
