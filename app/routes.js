//================================Routes===========================================//

// ====================================================== //
//                   Celestial Data                       //
// ====================================================== //
var currentUser;

module.exports = function(app, Parse) {

    // 1. -- OK -- Used
    //..Reoute a user to their tag
    app.get('/router/:username/:secret/:tagnum', function(req, res) {
        var username = req.params.username;
        var password = req.params.secret;
        var tagnum = req.params.tagnum;

        Parse.User.logIn(username, password);

        var query = new Parse.Query(Parse.User);
        query.equalTo("username", username); // find all the women
        query.find({
            success: function(user) {

                if (tagnum == 1) {
                    res.redirect(user[0].attributes.tag1);

                } else if (tagnum == 2) {
                    res.redirect(user[0].attributes.tag2);

                } else if (tagnum == 3) {
                    res.redirect(user[0].attributes.tag2);

                } else if (tagnum == 4) {
                    res.redirect(user[0].attributes.tag2);
                }

            }
        });
    });



    // 2. -- OK -- Used
    //edit the tag of a user
    app.put('/addtag/:username/:secret/:tagnum', function(req, res) {
        var username = req.params.username;
        var password = req.params.secret;
        var tagnum = req.params.tagnum;
        var url = req.body.url;

        console.log(req.body.url);

        //use external parse API to validate user
        Parse.User.logIn(username, password, {
            success: function(user) {
                console.log('logged in');
                var user = Parse.User.current();

                if (tagnum == 1) {
                    user.set('tag1', url);

                } else if (tagnum == 2) {
                    user.set('tag2', url);

                } else if (tagnum == 3) {
                    user.set('tag3', url);

                } else if (tagnum == 4) {
                    user.set('tag4', url);
                }
                user.save();
                Parse.User.logOut();
                res.send('200 OK');

            },
            error: function(user, error) { //user login infor was probably wrong
                console.log('error');
            }
        });

    });


    // 3.  -- OK -- Used
    //remove all the tags from a user
    app.put('/router/removeall/:username/:secret', function(req, res) {

        //get the passed in values
        var username = req.params.username;
        var password = req.params.secret;

        console.log('username ' + username + ' password ' + password);


        //use external parse API to validate user
        Parse.User.logIn(username, password, {
            success: function(user) {
                console.log('logged in');

                var user = Parse.User.current();

                console.log(user);
                user.set('tag1', '');
                user.set('tag2', '');
                user.set('tag3', '');
                user.set('tag4', '');
                user.save();

                Parse.User.logOut();
                res.send('200 OK');

            },
            error: function(user, error) { //user login infor was probably wrong
                console.log('error');
            }
        });

    });

    // 4. -- OK -- Used
    //set all the tags of a user to the same thing
    app.put('/addtag/:username/:secret', function(req, res) {
        var username = req.params.username;
        var password = req.params.secret;
        var tagnum = req.params.tagnum;
        var url = req.body.url;

        //use external parse API to validate user
        Parse.User.logIn(username, password, {
            success: function(user) {
                console.log('logged in');

                var user = Parse.User.current();
                user.set('tag1', url);
                user.set('tag2', url);
                user.set('tag3', url);
                user.set('tag4', url);
                user.save();
                Parse.User.logOut();

                res.send('200 OK');

            },
            error: function(user, error) { //user login infor was probably wrong
                console.log('error');
            }
        });

    });

    // 5. -- OK -- Used
    // get the route associated with a tag number as a string
    app.get('/router/:username/:secret/:tagnum', function(req, res) {
        var username = req.params.username;
        var password = req.params.secret;
        var tagnum = req.params.tagnum;

        //use external parse API to validate user
        Parse.User.logIn(username, password, {
            success: function(user) {
                console.log('logged in');
                var user = Parse.User.current();

                if (tagnum == 1) {
                    res.send(user.get('tag1'));

                } else if (tagnum == 2) {
                    res.send(user.get('tag2'));

                } else if (tagnum == 3) {
                    res.send(user.get('tag3'));

                } else if (tagnum == 4) {
                    res.send(user.get('tag4'));
                } else {
                    res.send('ERROR');
                }

                Parse.User.logOut();
            },
            error: function(user, error) { //user login infor was probably wrong
                console.log('error');
            }
        });

    });


    // 6. -- OK -- Used
    //remove a user account
    app.delete('/remove/:username/:secret', function(req, res) {
        var username = req.params.username;
        var password = req.params.secret;

        //use external parse API to validate user
        Parse.User.logIn(username, password, {
            success: function(user) {
                console.log('logged in');
                var user = Parse.User.current();
                user.destroy();
                res.send('200 OK');
            },
            error: function(user, error) { //user login infor was probably wrong
                console.log('error');
            }
        });

    });



    // 7. -- OK -- Used 
    // Create a user account
    app.post('/add/:username/:secret', function(req, res) {

        var username = req.params.username;
        var password = req.params.secret;
        var email = req.body.email;

        //create a new user using values from the fields
        var user = new Parse.User();
        user.set("username", username);
        user.set("password", password);
        user.set("email", email);
        user.save(null, {
            success: function(gameScore) {
                res.send('200 OK');
            },
            error: function() {
                res.send(false);
            }
        });

    });


    // 8. -- OK --
    // route directly to cat
    app.get('/router/cat', function(req, res) {

        var query = new Parse.Query(Parse.User);
        query.equalTo("username", username); // find all the women
        query.find({
            success: function(user) {

                res.redirect('http://www.faillol.com/wp-content/uploads/2012/12/MUST-WATCH-Hilarious-Cat-WINFAIL-Compilation-2012.jpg');

            }
        });
    });

    // 9. -- OK -- 
    // Pull a user's account info
    app.get('/user/info/:username/:secret', function(req, res) {

        var username = req.params.username;
        var password = req.params.secret;

        Parse.User.logIn(username, password, {
            success: function(user) {
                console.log(Parse.User.current());
                res.send(Parse.User.current());
            },
            error: function(user, error) { //user login infor was probably wrong
                console.log('error');
                res.send('900 NOTOK');
            }
        });


    });


}