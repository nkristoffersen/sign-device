var assert = require('chai').assert,
		config = require('./config'),
		deviceGateway = require(config.gateway),
    newDevice = require(config.newDevice)(deviceGateway),
		register = require(config.register)(deviceGateway),
		upsert = require(config.upsert)(deviceGateway);

describe('Upsert Device', function() {
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
	  console.log('Register Device: ', JSON.stringify(device));
	});
	afterEach(function() {
		device = {};
	});
	it('Should update device name', function() {
		var newName = 'Timmy',
		  result = {};
	  device.name = newName;
		result = upsert(device);
		console.log(JSON.stringify(result));
		  
		assert.notStrictEqual(result.name, config.name, 'Name not updated');
	});
});
