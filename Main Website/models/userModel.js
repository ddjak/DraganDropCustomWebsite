var orm = require("../routes/config/orm.js");

var user =
{
	all: function(cb)
	{
		orm.selectAll("users", function(result)
		{
			cb(result);
		});
	},

	getEmail: function(email, cb)
	{
		orm.selectEmail(email, function(result)
		{
			cb(result);
		});
	},

	getUser: function(email, password, cb)
	{
		orm.findUser(email, password, function(result)
		{
			cb(result)
		})
	},

	updateToken: function(id, token, cb)
	{
		orm.updateToken(id, token, function(result)
		{
			cb(result)
		})
	},

	createUser: function(name, email, password, token, cb)
	{
		orm.create("users", name, email, password, token, function(result)
		{
			cb(result)
		});
	},

	findFromToken: function(token, cb)
	{
		orm.findFromToken("users", token, function(result)
		{
			cb(result)
		});
	},
	
	addPart: function(qad_number, customer_part_number, entered_by, cb) {
		orm.addPart("parts", qad_number, customer_part_number, entered_by, function(result) {
			cb(result);
		});
	},

	getPart: function(qad_number, cb) {
		orm.getPart("parts", qad_number, function(result) {
			cb(result)
		})
	},

	updatePart: function(qad_number, customer_part_number, entered_by, cb) {
		orm.updatePart("parts", qad_number, customer_part_number, entered_by, function(result) {
			cb(result)
		})
	},

	removePart: function(qad_number, cb) {
		orm.removePart("parts", qad_number, function(result) {
			cb(result)
		})
	},

	//TODO: updatePart and removePart need to be added
/*
	getUser: function(cb) {
		orm.getUser(function(result) {
			cb(result)
		})
	}

	updateUser: function(id, coins, cb)
	{
		orm.updateUser(id, coins, function(result)
		{
			cb(result)
		})
	},*/

	populateTable: function(cb)
	{
		orm.populateTable(function(result)
		{
			cb(result)
		})
	}
};

module.exports = user;