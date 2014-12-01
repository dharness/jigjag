/*
This file represents the web servics.
users of this API will make REST requests to this service
*/

//================================Routes===========================================//

module.exports = function(app, Parse) {

    //..Register New User
    app.get('/reroute/:username/:tagnum', function(req, res) {
        var username = req.params.username;
        var tagnum = req.params.tagnum;


        var query = new Parse.Query(Parse.User);
        query.equalTo("username", username); // find all the women
        query.find({
            success: function(user) {
                console.log('here');
                res.redirect(user[0].attributes.tag1);
            }
        });


    });


    //..Logout User
    app.get('/logout/:username', function(req, res) {});

    //..Get User's Data
    app.get('/data/:username', function(req, res) {});

    //..Update User's Data
    app.get('/update/:username', function(req, res) {});

}