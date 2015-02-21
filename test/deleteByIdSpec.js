'use strict';

var assert = require('chai').assert,
		config = require('./config'),
		deviceGateway = require(config.gateway),
    newDevice = require(config.newDevice)(deviceGateway),
		register = require(config.register)(deviceGateway),
		deleteById = require(config.deleteById)(deviceGateway);

describe('DeleteById Device', function() {
	var device = {},
			id;
	beforeEach(function() {
		deviceGateway.setDefault('deleteById', function (data) {
			id = data.id;
			device = data.device;
		});
	});
	afterEach(function() {
		device = {};
	});
	it('Should delete device', function() {
		var result, error, found;

		deleteById(device.id, function (e, r) {
			result = r;
			error = e
		});

		found = deviceGateway.findById(id, function(e,d){return d});
		assert.isUndefined(error, 'Error is defined');
		assert.lengthOf(result, 1, 'Result length is not 1');
		assert(found === undefined, 'Found deleted result');
	});
});
