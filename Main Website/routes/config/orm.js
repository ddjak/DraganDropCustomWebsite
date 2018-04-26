var connection = require('../config/connection.js');

var orm = {
	//general display all items from specified table
	selectAll: function(table, cb) {
		var query = "SELECT * FROM "+table;
		var thing = connection.query(query, function(err, result) {
			if(err){throw err};
			cb(result);
		});
	},

	//get an "id" from table "users" where email is input
	selectEmail: function(email, cb) {
		connection.query("SELECT id FROM users WHERE email=?", [email], function(err, result) {
			if(err){throw err}
			cb(result)
		})
	},

	//get "id" from table users where email AND password are inputs
	findUser: function(email, password, cb) {
		connection.query("SELECT id FROM users WHERE email=? AND password=?", [email,  password], function(err, result) {
			if(err){throw err}
			cb(result)
		})
	},

	//update table users by token input and id input
	updateToken: function(id, token, cb) {
		connection.query("UPDATE users SET token = ? WHERE id = ?", [token, id], function(err, result) {
			if(err){throw err}
			cb(result)
		})
	},

	//creates new user with name, email, password, and token
	create: function(table, name, email, password, token, cb) {
		connection.query('INSERT INTO '+table+'(name, email, password, token) VALUES (?, ?, ?, ?);', [name, email, password, token], function(err, result) {
			if (err){throw err};
			cb(result);
		});
	},

	//find all users with certain id
	findFromId: function(table, id, cb) {
		connection.query("SELECT * FROM "+table+" WHERE id=?", [id], function(err, result) {
			if(err){throw err}
			cb(result)
		})
	},

	//find anything with a token
	findFromToken: function(table, token, cb) {
		connection.query("SELECT * FROM "+table+" WHERE token=?", [token], function(err, result)
		{
			if(err){throw err}
			cb(result)
		})
	},

	addPart: function(table, qad_number, customer_part_number, entered_by, cb) {
		connection.query("INSERT INTO "+ table + "(qad_number, customer_part_number, date_entered, entered_by) VALUES (?, ?, CURDATE(), ?);", [qad_number, customer_part_number, entered_by], function(err, result) {
			if (err){throw err}
			cb(result)
		})
	},

	getPart: function(table, qad_number, cb) {
		connection.query("SELECT * FROM "+table+" WHERE (qad_number) = (?);", [qad_number], function(err, result) {
			if (err){throw err}
				cb(result)
		})
	},

	updatePart: function(table, qad_number, customer_part_number, entered_by, cb) {
		connection.query("UPDATE parts SET qad_number = ?, customer_part_number = ?, date_entered, entered_by = ?, WHERE id = ?;", [qad_number, customer_part_number, entered_by, id], function(err, result) {
			if (err) {throw err}
				cb(result)
		})
	},
/*
	addExcel: function(table, bom, cb) {
		connection.query("INSERT INTO " + table + "(bom) VALUES (?);", [art], function(err, result) {
			if (err){throw err}
			cb(result)
		})
	},

	//TODO: updatePart and removePart need to be added

/*
	addRiddleCorrect: function(table, userId, riddleId, cb)
	{
		connection.query('INSERT INTO '+table+'(user, riddle) VALUES (?,?);', [userId, riddleId], function(err, result)
		{
			if(err){throw err}
			cb(result)
		})
	},

	getRiddlesWithLevelNotSeen: function(table, userId, level, cb)
	{
		connection.query('select riddles.id, riddles.text, riddles.correct, riddles.wrong from riddles where level=? and riddles.id not in (select riddle from riddles_correct where ? = riddles_correct.user);', [level, userId], function(err, result)
		{
			if(err){throw err}
			cb(result)
		})
	},

	updateUser: function(id, coins, level, cb)
	{
		connection.query('UPDATE users SET coins = ?, level = ? WHERE id = ?;', [coins, level, id], function(err, result)
		{
			if(err){throw err};
			cb(result);
		});
	},*/

	populateTable: function(cb)
	{
		connection.query("SELECT qad_number, customer_part_number, entered_by, date_entered, art, bom, schedule_b, hts, eccn, nafta_qualified, nafta_rvc FROM parts ORDER BY qad_number DESC", function(err, result)
		{
			if(err){throw err}
			cb(result)
		})
	}/*

	updateRiddlePercent: function(id, column, cb)
	{
		connection.query("UPDATE riddles SET "+column+" = "+column+" + 1 WHERE id = ?;", [id], function(err, result)
		{
			if(err){throw err}
			cb(result)
		})
	}*/
};

module.exports = orm;
