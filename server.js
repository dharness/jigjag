// server.js

// set up ======================================================================
// get all the tools we need
var express = require('express');
var app = express();
var port = process.env.PORT || 80;
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var Parse = require('parse').Parse; //use parse for logins

// Connect to my parse app =====================================================
Parse.initialize("gzFQPPrc51Uc10qhHb5Y4G9det5rRhb9GiA76E13", "uVhwBjbYgTVlG1hoTBYMpg69SzwwdsEzCgwOJh4j");

app.use(bodyParser.json()); // get information from html forms
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.static(__dirname + '/public'));



// routes ======================================================================
require('./app/routes.js')(app, Parse); // lload the routes and pass in Parse

// launch ======================================================================
app.listen(port);
console.log('The magic happens on port ' + port);