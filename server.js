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


// var user = new Parse.User();
// user.set("username", "dharness");
// user.set("password", "dharness");
// user.set("email", "dharness@uwo.ca");
// user.set("phone", "519-402-1420");

// user.signUp(null, {
//     success: function(user) {
//         console.log('usr :' + user);
//     },
//     error: function(user, error) {
//         console.log("Error: " + error.code + " " + error.message);
//     }
// });

// DATBASE CRUMS ======================================


app.use(bodyParser.json()); // get information from html forms
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.static(__dirname + '/public'));



// routes ======================================================================
require('./app/routes.js')(app, Parse); // load our routes and pass in our app and fully configured passport

// launch ======================================================================
app.listen(port);
console.log('The magic happens on port ' + port);