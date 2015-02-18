'use strict';

var assert = require('chai').assert,
		config = require('./config'),
		deviceGateway = require(config.gateway),
    newDevice = require(config.newDevice)(deviceGateway),
		register = require(config.register)(deviceGateway),
		deleteById = require(config.deleteById)(deviceGateway);

describe('DeleteById Device', function() {
	var device = {};
	beforeEach(function() {
		var token = config.token,
		  tempDevice = newDevice(token);
		device = register({
			code: tempDevice.code,
			token: tempDevice.token,
			id: tempDevice.id,
			ownerId: config.ownerId,
			showId: config.showId,
			name: config.name
		});
	});
	afterEach(function() {
		device = {};
	});
	it('Should delete device', function() {
		deleteById(device.id);
		var found = deviceGateway.findById(device.id);
		assert(found === undefined, 'Found deleted result');
	});
});
