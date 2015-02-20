'use strict';

var assert = require('chai').assert,
		config = require('./config'),
		deviceGateway = require(config.gateway),
    newDevice = require(config.newDevice)(deviceGateway),
		register = require(config.register)(deviceGateway),
		find = require(config.find)(deviceGateway);

describe('Find Device', function() {
	var device = {},
			id,
			token;
	beforeEach(function() {
		deviceGateway.setDefault('find', function (data) {
			id = data.id;
			token = data.token;
			device = data.device;
		});
	});
	it('Should find device by id', function() {
		var result, error;
		
		find({id: id}, function(e, r) {
			result = r;
			error = e;
		});
		assert.isUndefined(error, 'Error is defined');
		assert.deepEqual(result, device, 'Find return correct match');
	});
	it('Should find device by token', function () {
		var result, error;

		find({token: token}, function(e, r) {
			result = r;
			error = e;
		});
		assert.isUndefined(error, 'Error is defined');
		assert.deepEqual(result, device, 'Find no return correct match');
	});
});
