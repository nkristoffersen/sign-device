'use strict';

var assert = require('chai').assert,
		config = require('./config'),
		validate = require('../lib/validateDevice.js');

describe('Validate Token', function() {
	var token,
			cb;
	beforeEach(function() {
		token = config.token;
		cb = function(error){
			return error;
		};
	});
	it('Should accept valid token', function() {
		var error = validate.token(token, cb);

		assert.notOk(error, 'Valid token returns error');
	});
	it('Should return error if token is blank', function() {
		var token = '',
				error = validate.token(token, cb);

		assert.ok(error, 'Blank token validated');
	});
	it('Should return error if token is omitted', function() {
		var	token = undefined,
				error = validate.token(token, cb);

		assert.ok(error, 'Omitted token validated');
	});
	it('Should reject if token < 16 char', function() {
		var	token = '1jskrff0fcp3a23',
				error = validate.token(token, cb);

		assert.ok(error, 'Short token validated');
	});
});

describe('Validate Device', function () {
	var device,
			cb;
	beforeEach(function() {
		device = JSON.parse(JSON.stringify(config.registeredDevice));
		cb = function(error){
			return error;
		};
	});
	it('Should accept valid device', function() {
		var error = validate.device(device, cb);
		assert.notOk(error, 'Valid device returns error');
	});
	it('Should reject no device', function() {
		var error = validate.device(undefined, cb);
		assert.ok(error, 'No device validated');
	});
	it('Should reject if no device id', function() {
		device.id = undefined;
		var error = validate.device(device, cb);
		assert.ok(error, 'No device id validated');
	});
	it('Should reject if device id is empty string', function() {
		device.id = '';
		var error = validate.device(device, cb);
		assert.ok(error, 'Blank device id validated');
	});
	it('Should reject if no ownerId', function() {
		device.ownerId = undefined;
		var error = validate.device(device, cb);
		assert.ok(error, 'No ownerId validated');
	});
	it('Should reject if ownerId is empty string', function() {
		device.ownerId = '';
		var error = validate.device(device, cb);
		assert.ok(error, 'Blank ownerId validated');
	});
	it('Should reject if code', function() {
		device.code = 'aaaaaaa';
		var error = validate.device(device, cb);
		assert.ok(error, 'With code is validated');
	});
	it('Should reject if no token', function() {
		device.token = undefined;
		var error = validate.device(device, cb);
		assert.ok(error, 'No token is validated');
	});
	it('Should reject if token is empty string', function() {
		device.token = '';
		var error = validate.device(device, cb);
		assert.ok(error, 'Blank token is validated');
	});
});
describe('Validate Device when registerDevice is true', function() {
	var device,
			cb;
	beforeEach(function() {
		device = JSON.parse(JSON.stringify(config.registeredDevice));
		device.code = 'aaaaaa';
		delete device.id;
		delete device.token;
		cb = function(error){
			return error;
		};
	});
	it('Should accept valid register device', function() {
		var error = validate.device(device, {registerDevice: true}, cb);
		assert.notOk(error, 'Valid register device is rejected');
	});
	it('Should reject if code is omitted', function() {
		device.code = undefined;
		var error = validate.device(device, {registerDevice: true}, cb);
		assert.ok(error, 'No code is validated');
	});
	it('Should reject if code is empty string', function() {
		device.code = '';
		var error = validate.device(device, {registerDevice: true}, cb);
		assert.ok(error, 'Blank code is validated');
	});
	it('Should reject if code.length !== 6', function() {
		device.code = 'aaaaa';
		var error = validate.device(device, {registerDevice: true}, cb);
		assert.ok(error, 'Short code is validated');
	});
	it('Should reject if token present', function() {
		device.token = 'vaaaaafdt5tg7ye4r';
		var error = validate.device(device, {registerDevice: true}, cb);
		assert.ok(error, 'Token is validated');
	});
});
describe('Validate Id', function() {
	var id,
			cb;
	beforeEach(function() {
		id = JSON.parse(JSON.stringify(config.id));
		cb = function(error){
			return error;
		};
	});
	it('Should accept a valid id', function() {
		var error = validate.id(id, cb);
		assert.notOk(error, 'Valid id is rejected');
	});
	it('Should reject if id omitted', function() {
		id = undefined;
		var error = validate.id(id, cb);
		assert.ok(error, 'Valid id is rejected');
	});
	it('Should reject a blank id', function() {
		id = '';
		var error = validate.id(id, cb);
		assert.ok(error, 'Valid id is rejected');
	});
});
