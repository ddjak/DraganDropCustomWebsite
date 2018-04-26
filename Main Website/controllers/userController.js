var express = require('express');
var usersModel = require('../models/userModel.js');
var aesjs = require('aes-js');
var validator = require('validator');
var formidable = require('formidable');

var app = express();

var router = express.Router();

var createToken = function()
{
	var inputs = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
	var token = "";

	for (var i=0; i<10; i++)
	{
		var r = Math.floor(Math.random()*(inputs.length-1));
		token = token + inputs[r];
	}

	return token;
}

router.use(function(req, res, next) {

    // log each request to the console
    console.log(req.method, req.url);
    // continue doing what we were doing and go to the route
    next(); 
});

router.get("/", function(req, res) {
	res.render("view");
});

router.get("/contact", function(req, res) {
	res.render("contact");
});

router.get("/packages", function(req, res) {
	res.render("packages");
});

router.get("/services", function(req, res) {
	res.render("services");
});

router.get("/showcase", function(req, res) {
	res.render("showcase");
});

router.get("*", function(req, res) {
	res.render("pageNotFound");
});

router.post('/register', function(req, res)
{
	console.log("REGISTER IN CONTROL WORKS");
	usersModel.getEmail(req.body.email, function(result)
	{
		console.log("getEmail call...")

		if (result.length > 0)
		{
			console.log("getEmail call...")
			console.log(result.length)
			res.send("emailError");
			return;			
		}

		else if (req.body.name !== "" && validator.isEmail(req.body.email) && req.body.password !== "")
		{
			var key = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16 ];

			var password = req.body.password;
			var textBytes = aesjs.utils.utf8.toBytes(password);

			var aesCtr = new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(5));
			var encryptedBytes = aesCtr.encrypt(textBytes);

			var encryptedHex = aesjs.utils.hex.fromBytes(encryptedBytes);
			var token = createToken();

			console.log(encryptedHex);

			usersModel.createUser(req.body.name, req.body.email, encryptedHex, token, function(result)
			{
				res.send(
				{
					result: "created",
					token: token
				})
			})		
		}

		else if (!validator.isEmail(req.body.email))
		{
			res.send("invalidEmail")
		}

		else
		{
			res.send("tryAgain")
		}
	});

})

router.post("/login", function(req, res)
{
	console.log(req.body.email+" "+req.body.password)

	var key = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16 ];
	var textBytes = aesjs.utils.utf8.toBytes(req.body.password);
	var aesCtr = new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(5));
	var encryptedBytes = aesCtr.encrypt(textBytes);
	var encryptedHex = aesjs.utils.hex.fromBytes(encryptedBytes);

	usersModel.getUser(req.body.email, encryptedHex, function(result)
	{
		console.log(result)
		if (result[0] === undefined)
		{
			res.send("THERE WAS A HUGE ERROR!")
			return;
		}

		else
		{
			var token = createToken();
			console.log("id "+result[0].id)
			console.log("New token "+token)
			usersModel.updateToken(result[0].id, token, function(result)
			{
				res.send(token)
				return;
			})
		}
	})
})

router.post("/getpart", function(req, res) {
	console.log("---------------------------------------------")
	console.log(req.body)


	usersModel.getPart(req.body.qad_number, function(part) {
		console.log(part[0])

				if (part[0] === undefined) {
					res.send("No Part In Database");
					return;
				}

				else {
					qad_number = part[0].qad_number;
					customer_part_number = part[0].customer_part_number;
					description = part[0].description;
					type = part[0].type;
					site = part[0].site;
					date_entered = part[0].date_entered;
					entered_by = part[0].entered_by;

					var data = {
						qad_number: qad_number,
						customer_part_number: customer_part_number,
						description: description,
						type: type,
						site: site,
						date_entered: date_entered,
						entered_by: entered_by
					}

					res.send(data);
				}
	});
})

router.post("/submitpart", function(req, res) {

	console.log("In Controller Now")
	console.log(req.body)

	if (false) {
		console.log("Ummm...")
	}

	else {
		usersModel.findFromToken(token, function(user) {

			if (user[0] === undefined){
				res.send("nouser");
				return;
			}

			else {
				name = user[0].name;

		       	usersModel.addPart(qad_number, customer_part_number, name, /*file.name*/ function(result) {
		    		console.log(result)
		    	});
			}
	/*TODO: UPLOAD FILE WITH AJAX
	var form = new formidable.IncomingForm();

   	form.parse(req);	
   
    form.on('fileBegin', function (name, file){
    	
    	file.path = "T:\\TEST\\" + file.name;
      	console.log("Placing in : " + file.path);
	
   	});

    form.on('file', function (name, file){
        console.log('Uploaded ' + file.name);
    });*/

    //res.sendFile("T:\\TEST" + file.name);
		})
	}
})

router.post("/getinfo", function(req, res)
{
	var name = "";
	//TODO: var parts = [] ? show parts to display for user
	
	console.log(req.body)
	//TODO: Find all stuff associated with specific user
	usersModel.findFromToken(req.body.token, function(user)
	{
		if (user[0] === undefined){
			res.send("nouser");
			return;
		}

		else {
			//coins = user[0].coins;
			//level = user[0].level;
			name = user[0].name;

			var data = {
				name: name
			}

			res.send(data);
		}
	})
})

module.exports = router;