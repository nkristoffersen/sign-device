'use strict';

var assert = require('chai').assert,
		config = require('./config'),
		deviceGateway = require(config.gateway),
		boundary = require(config.boundary)(deviceGateway);

describe('Boundary Functions', function() {
	var device,
		unregistered,
		id,
		token;
	beforeEach(function() {
		device = JSON.parse(JSON.stringify(config.exampleDevice));
		unregistered = JSON.parse(JSON.stringify(config.exampleUnregisteredDevice));
		id = device.id;
		token = config.token;
	});
	it('newDevice should create a new device', function() {
		boundary.newDevice(token, function(error, data) {
			assert.isDefined(data, 'Data undefined');
			assert.isUndefined(error, 'Error defined');
		});
	});
	it('newDevice should return error', function() {
		boundary.newDevice(undefined, function(error, data) {
			assert.isUndefined(data, 'Data defined');
			assert.isDefined(error, 'Error undefined');
		});
	});
	it('registerDevice should register device', function() {
		console.log('unreg', unregistered);
		boundary.registerDevice(unregistered, function(error, data) {
			console.log('data ', data);
			assert.isDefined(data, 'Data undefined');
			assert.isUndefined(error, 'Error defined');
		});
	});
	it('registerDevice should return error', function() {
		boundary.registerDevice(undefined, function(error, data) {
			assert.isUndefined(data, 'Data defined');
			assert.isDefined(error, 'Error undefined');
		});
	});
});
