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
    var requesttypeVar = req.body.requesttype;

    console.log(requesttypeVar);

    console.log(passcodeVar);

    var dbHost = 'mongodb://masterkey:ananaskokos84@ds151049.mlab.com:51049/spacemaze_db';

    mongoose.connect(dbHost);

    var db = mongoose.connection;

    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function(){
        //console.log("Connected to DB");
        //do operations which involve interacting with DB.

        var collection = db.collection('users');

        if(requesttypeVar == "crew"){

             collection = db.collection('crew');
        }
        else if(requesttypeVar == "users"){

            collection = db.collection('users');
        }
        else{

            collection = db.collection('players');
        }

        collection.find({passcode:passcodeVar}).toArray(function(err, result){
            console.log( "dbresult:" + result[0]);
            user = result[0];

            if (result[0] != undefined){

                console.log("logged in");
                console.log("result: "+ result[0].passcode);
                delete user["_id"];
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