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

    console.log("Loginhandler Requesttype: " +requesttypeVar);
    console.log("Loginhandler Passcode: " +passcodeVar);

    var dbHost = 'mongodb://masterkey:ananaskokos84@ds151049.mlab.com:51049/spacemaze_db';

    mongoose.connect(dbHost);

    var db = mongoose.connection;

    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function(){
        //console.log("Connected to DB");
        //do operations which involve interacting with DB.

        //var collection = db.collection('users');

        //Handle Crew Login Attempt <---------------------------------------------------------------
        if(requesttypeVar == "crew_login"){

            var collection = db.collection('crew');

            collection.find({passcode:passcodeVar}).toArray(function(err, result){
                console.log( "Crew Login dbresult:" + result[0]);
                user = result[0];

                if (result[0] != undefined){

                    console.log("Crew logged in!");
                    console.log("Crew result: "+ result[0].passcode);
                    delete user["_id"];
                    res.json(user);

                    db.close();
                    res.end();

                } else{
                    console.log("Crew login failed, user not existing");
                    res.write("notfound");
                }

                db.close();
                res.end();
            })
        }
        //Handle User Login Attempt <--------------------------------------------------------
        else if(requesttypeVar == "user_login"){

            var collection = db.collection('users');

            collection.find({passcode:passcodeVar}).toArray(function(err, result){
                console.log( "User Loign dbresult:" + result[0]);
                user = result[0];

                if (result[0] != undefined){

                    console.log("User logged in");
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
        }
        // Get User Stats <----------------------------------------------------------------------------
        else if(requesttypeVar == "user_stats"){
            var collection = db.collection('users');



            collection.find({passcode:passcodeVar}).toArray(function(err, result){
                console.log( "dbresult:" + result[0].passcode);
                user = result[0];

                if (result[0] != undefined){

                    console.log("logged in");
                    console.log("result: "+ result[0].passcode);
                    delete user["_id"];

                    user["quest_names"] = [];
                    //console.log(user.quests[0].quest_id);

                    for(i = 0; i < user.quests.length; i++){
                        var collection2 = db.collection('quests');

                        collection2.find({quest_id:user.quests[i].quest_id}).toArray(function(err, result){
                            console.log( "dbresult:" + result[0]);
                            quests = result;

                            if (result != undefined){

                                console.log("logged in");
                                console.log("questresult: "+ result[0].quest_name);

                                user["quest_names"].push({"quest_id":result[0].quest_id, "quest_name":result[0].quest_name});

                                console.log(JSON.stringify(user));

                                //join quests
                                //var joinedJson = user;

                                //joinedJson["questnames"] =

                                //res.json(user);

                                //db.close();
                                //res.end();

                            } else{
                                console.log("user exists, but no quests found");
                                //still join quests, but with empty value

                                res.json(user);

                                db.close();
                                res.end();
                            }

                            //res.json(user);

                            //db.close();
                            //res.end();
                        })

                    }

                    console.log(JSON.stringify(user));


                    res.json(user);

                    db.close();
                    res.end();


                } else{
                    console.log("login failed, user not existing");
                    res.write("notfound");
                    res.end();
                }

                db.close();
                res.end();
            })
        }
        else{

            res.write("wrongtype");
            res.end();

        }



    });

});

function test(){
    console.log("func");
}



module.exports = router;