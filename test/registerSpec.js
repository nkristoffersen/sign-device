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
	    id,
	    name,
      ownerId,
	    token,
      showId;
	beforeEach(function() {
		deviceGateway.setDefault('register', function (data) {
			device = data.request;
			id = data.id;
			name = data.name;
			ownerId = data.ownerId;
			token = data.token;
			showId = data.showId;
		});
	});
	afterEach(function() {
		device = {};
	});
	it('Should find device by code, delete code, update and return device', function() {
		var savedDevice, result, error;

		register(device, function (e, r) {
			error = e;
			result = r;
		});
		
		savedDevice = deviceGateway.findById(id, function(e,d){return d});
		
		assert.isObject(result, 'Result is not an object');
		assert.match(result.id, idRegExp, 'Id is not valid');
		assert.isNull(result.code, 'Code not null');
		assert.strictEqual(result.ownerId, ownerId, 'Names do not match');
		assert.strictEqual(result.showId, showId, 'ShowiDs do not match');
		assert.deepEqual(result, savedDevice, 'Result does not match save');
	});
	it('Should add name if set', function() {
		var savedDevice, result, error;

		device.name = name;

		register(device, function (e, r) {
			error = e;
			result = r;
		});

		savedDevice = deviceGateway.findById(result.id, function(e,d){return d});

		assert.isUndefined(error, 'Returned an error');
		assert.strictEqual(result.name, name, 'Names do not match');
		assert.deepEqual(result, savedDevice, 'Result does not match save');
	});
	it('Should reject if no code', function() {
		var savedDevice, result, error;

		device.code = undefined;

		register(device, function (e, r) {
			error = e;
			result = r;
		});

		assert.isDefined(error, 'No error');
		assert.isUndefined(result, 'No code is saved');
	});
	it('Should reject if code is empty string', function() {
		var savedDevice, result, error;

		device.code = '';

		register(device, function (e, r) {
			error = e;
			result = r;
		});

		assert.isDefined(error, 'No error');
		assert.isUndefined(result, 'No code is saved');
	});
	it('Should change lower case code to upper case and accept', function() {
		var savedDevice, result, error;

		device.code = device.code.toLowerCase();
		console.log('lower code', device.code);

		register(device, function (e, r) {
			error = e;
			result = r;
		});

		assert.isDefined(result, 'Lower case code is not saved');
		assert.isUndefined(error, 'Returns error');
	});
});
