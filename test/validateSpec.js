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

		console.log('typeof error', typeof error);
		assert.notOk(error, 'Valid token returns error');
	});
	it('Should return error if token is blank', function() {
		var token = '',
				error = validate.token(token, cb);

		assert.isString(error, 'Blank token validated');
	});
	it('Should return error if token is omitted', function() {
		var	token = undefined,
				error = validate.token(token, cb);

		assert.isString(error, 'Omitted token validated');
	});
	it('Should reject if token < 16 char', function() {
		var	token = '1jskrff0fcp3a23',
				error = validate.token(token, cb);

		assert.isString(error, 'Short token validated');
	});
});

describe('Validate Device', function () {
	var device,
			cb;
	beforeEach(function() {
		device = JSON.parse(JSON.stringify(config.exampleDevice));
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
		console.log('error', error);
		assert.isString(error, 'No device validated');
	});
	it('Should reject if no device id', function() {
		device.id = undefined;
		var error = validate.device(device, cb);
		assert.isString(error, 'No device id validated');
	});
	it('Should reject if device id is empty string', function() {
		device.id = '';
		var error = validate.device(device, cb);
		assert.isString(error, 'Blank device id validated');
	});
	it('Should reject if no ownerId', function() {
		device.ownerId = undefined;
		var error = validate.device(device, cb);
		assert.isString(error, 'No ownerId validated');
	});
	it('Should reject if ownerId is empty string', function() {
		device.ownerId = '';
		var error = validate.device(device, cb);
		assert.isString(error, 'Blank ownerId validated');
	});
	it('Should reject if code', function() {
		device.code = 'aaaaaaa';
		var error = validate.device(device, cb);
		assert.isString(error, 'With code is validated');
	});
	it('Should reject if no token', function() {
		device.token = undefined;
		var error = validate.device(device, cb);
		assert.isString(error, 'No token is validated');
	});
	it('Should reject if token is empty string', function() {
		device.token = '';
		var error = validate.device(device, cb);
		assert.isString(error, 'Blank token is validated');
	});
});
describe('Validate Device when deviceCode is true', function() {
	var device,
			cb;
	beforeEach(function() {
		device = JSON.parse(JSON.stringify(config.exampleDevice));
		device.code = 'aaaaaa';
		cb = function(error){
			return error;
		};
	});
	it('Should accept valid code', function() {
		var error = validate.device(device, {deviceCode: true}, cb);
		assert.notOk(error, 'Valid code is rejected');
	});
	it('Should reject if code is omitted', function() {
		device.code = undefined;
		var error = validate.device(device, {deviceCode: true}, cb);
		assert.isString(error, 'No code is validated');
	});
	it('Should reject if code is empty string', function() {
		device.code = '';
		var error = validate.device(device, {deviceCode: true}, cb);
		assert.isString(error, 'Blank code is validated');
	});
	it('Should reject if code.length !== 6', function() {
		device.code = 'aaaaa';
		var error = validate.device(device, {deviceCode: true}, cb);
		assert.isString(error, 'Short code is validated');
	});
});
describe('Validate Device when noDeviceId is true', function() {
	var device,
			cb;
	beforeEach(function() {
		device = JSON.parse(JSON.stringify(config.exampleDevice));
		device.id = undefined;
		cb = function(error){
			return error;
		};
	});
	it('Should accept device without id', function() {
		var error = validate.device(device, {noDeviceId: true}, cb);
		assert.notOk(error, 'Device with id is rejected');
	});
});
describe('Validate Id', function() {
	var id,
			cb;
	beforeEach(function() {
		id = JSON.parse(JSON.stringify(config.exampleDevice.id));
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
		assert.isString(error, 'Valid id is rejected');
	});
	it('Should reject a blank id', function() {
		id = '';
		var error = validate.id(id, cb);
		assert.isString(error, 'Valid id is rejected');
	});
});
