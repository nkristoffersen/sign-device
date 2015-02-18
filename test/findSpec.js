'use strict';

var assert = require('chai').assert,
		config = require('./config'),
		deviceGateway = require(config.gateway),
    newDevice = require(config.newDevice)(deviceGateway),
		register = require(config.register)(deviceGateway),
		find = require(config.find)(deviceGateway);

describe('Find Device', function() {
	var device = {},
			id;
	beforeEach(function() {
		deviceGateway.setDefault([config.exampleDevice]);
		id = config.exampleDevice.id;
	});
	it('Should find device by id', function() {
		var result = find({id: id});
		assert.deepEqual(result, config.exampleDevice, 'Find return correct match');
	});
});
