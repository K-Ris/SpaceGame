var express = require('express');
var router = express.Router();
var mongoose = require('mongoose')

var db = mongoose.connection;

/* GET home page. */
router.all('/', function(req, res, next) {

    //check if user or crew wants to login
    //make database request depending on post content
    //return database result
    var passcodeVar = req.body.passcode;

    console.log(passcodeVar);

    var dbHost = 'mongodb://masterkey:ananaskokos84@ds151049.mlab.com:51049/spacemaze_db';

    mongoose.connect(dbHost);

    var db = mongoose.connection;

    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function(){
        //console.log("Connected to DB");
        //do operations which involve interacting with DB.

        var collection = db.collection('crew');

        collection.find({passcode:passcodeVar}).toArray(function(err, result){
            console.log( "dbresult:" + result[0]);
            user = result[0];

            if (result[0] != undefined){

                //console.log(user_name);
                //console.log(pass_word);
                //console.log("post:" + user_token);
                //console.log(user.user_token);

                console.log("logged in");
                res.json(user);

                db.close();
                res.end();

            } else{
                console.log("login failed, user not existing");
                res.write("notfound");
            }

            db.close();
            res.end();
        })

    });

});


module.exports = router;