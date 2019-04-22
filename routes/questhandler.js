var express = require('express');
var router = express.Router();

/* GET home page. */
router.all('/', function(req, res, next) {
    var passcodeVar = req.body.passcode;
    var requesttypeVar = req.body.requesttype;

    console.log("Loginhandler Requesttype: " +requesttypeVar);
    console.log("Loginhandler Passcode: " +passcodeVar);

    if(passcodeVar != undefined && passcodeVar != "null" && requesttypeVar != undefined && requesttypeVar != "null"){

        var dbHost = 'mongodb://masterkey:ananaskokos84@ds151049.mlab.com:51049/spacemaze_db';

        mongoose.connect(dbHost);

        var db = mongoose.connection;

        db.on('error', console.error.bind(console, 'connection error:'));
        db.once('open', function() {
            //console.log("Connected to DB");
            //do operations which involve interacting with DB.

            //var collection = db.collection('users');

            //Handle Crew Login Attempt <---------------------------------------------------------------
            if (requesttypeVar == "crew_login") {

                var collection = db.collection('quests');

                collection.find().toArray(function (err, result) {
                    quests = result[0];

                    if(quests != undefined){

                        res.json(quests);

                        db.close();
                        res.end();
                    } else {
                        console.log("Crew login failed, user not existing");
                        res.write("notfound");

                        db.close();
                        res.end();
                    }


                })
            }
        });
            }
});


module.exports = router;