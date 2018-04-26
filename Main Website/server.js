var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
var routes = require("./controllers/userController.js");

var app = express();
var PORT = process.env.PORT || 8080;

// Sets up the Express app to handle data parsing
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

app.engine('.html', require('ejs').__express);
app.set("view engine", "html");

app.use(express.static(__dirname + '/public'));

app.use("/", routes);

app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});