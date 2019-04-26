var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

/* GET home page. */
router.all('/', function(req, res, next) {

    //check if user or crew wants to login
    //make database request depending on post content
    //return database result
    var passcodeVar = req.body.passcode;
    var requesttypeVar = req.body.requesttype;

    console.log("Loginhandler Requesttype: " +requesttypeVar);
    console.log("Loginhandler Passcode: " +passcodeVar);

    if(passcodeVar != undefined && passcodeVar != "null" && requesttypeVar != undefined && requesttypeVar != "null"){

        var dbHost = 'mongodb://masterkey:ananaskokos84@ds147836-a0.mlab.com:47836,ds147836-a1.mlab.com:47836/spacemazeproduction_db?replicaSet=rs-ds147836';
        var options = {
            server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } },
            replset: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } }
        };

        mongoose.connect(dbHost, options);

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
                    user = result[0];

                    if (result[0] != undefined){

                        console.log( "Crew Login dbresult:" + result[0]);
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
                    user = result[0];

                    if (result[0] != undefined){

                        console.log( "User Loign dbresult:" + result[0]);
                        console.log("User logged in");
                        console.log("result: "+ result[0].passcode);
                        delete user["_id"];
                        res.json(user);

                        db.close();
                        res.end();

                    } else{
                        console.log("login failed, user not existing");
                        res.write("notfound");

                        db.close();
                        res.end();
                    }

                })
            }
            // Get User Stats <----------------------------------------------------------------------------
            else if(requesttypeVar == "user_stats"){
                var collection = db.collection('users');

                collection.find({passcode:passcodeVar}).toArray(function(err, result){
                    user = result[0];

                    if (result[0] != undefined){

                        console.log( "User Stats dbresult:" + result[0].passcode);

                        console.log("logged in");
                        console.log("result: "+ result[0].passcode);
                        delete user["_id"];

                        user["quest_names"] = [];
                        //console.log(user.quests[0].quest_id);

                        var collection2 = db.collection('quests');

                        var searchedQuestIds = [];

                        for(var i = 0; i < user.quests.length; i++){
                            searchedQuestIds.push(parseInt(user.quests[i].quest_id));
                        }

                        console.log("searchedQuest: " + searchedQuestIds[0]);
                        //console.log(db);

                        try{
                            collection2.find({quest_id:{ $in: searchedQuestIds}}).toArray(function(err, result){
                                quests = result;

                                console.log("quests: " + result);

                                if (result != undefined && result != "" && result != []){

                                    console.log("logged in");
                                    console.log("questresult: "+ result[0].quest_name);

                                    var questResult = result;

                                    user["badge_names"] = [];
                                    //console.log(user.quests[0].quest_id);

                                    var collection3 = db.collection('badges');

                                    var searchedBadgeIds = [];

                                    for(var i = 0; i < user.badges.length; i++){
                                        searchedBadgeIds.push(user.badges[i]);
                                    }

                                    console.log("searchedBadgeIds: " + searchedBadgeIds);


                                    collection3.find({badge_id:{ $in: searchedBadgeIds}}).toArray(function(err, result){
                                        badges = result;

                                        //console.log(result);

                                        if (result != undefined){

                                            console.log("logged in");
                                            console.log("badgesresult: "+ result[0].badge_name);


                                            for(var j = 0; j < questResult.length; j++){
                                                user["quest_names"].push({"quest_id":questResult[j].quest_id, "quest_name":questResult[j].quest_name});

                                            }

                                            for(var j = 0; j < result.length; j++){
                                                user["badge_names"].push({"badge_id":result[j].badge_id, "badge_name":result[j].badge_name});

                                            }

                                            //

                                            console.log(JSON.stringify(user));

                                            res.json(user);

                                            db.close();
                                            res.end();

                                        } else{
                                            console.log("user exists, but no quests found");
                                            //still join quests, but with empty value

                                            user["quest_names"] = [];

                                            res.json(user);

                                            db.close();
                                            res.end();
                                        }

                                        //res.json(user);

                                        //db.close();
                                        //res.end();
                                    });



                                    //

                                    //console.log(JSON.stringify(user));

                                    //res.json(user);

                                    //db.close();
                                    //res.end();

                                } else{
                                    console.log("user exists, but no quests found");
                                    //still join quests, but with empty value

                                    user["quest_names"] = [];

                                    res.json(user);

                                    db.close();
                                    res.end();
                                }

                                //res.json(user);

                                //db.close();
                                //res.end();
                            });
                        }
                        catch(e){
                            console.log(e);
                            console.log(JSON.stringify(user));

                            res.json(user);

                            db.close();
                            res.end();
                        }



                    } else{
                        console.log("login failed, user not existing");
                        res.write("notfound");
                        res.end();
                    }

                    //db.close();
                    //res.end();
                })
            }
            else{

                res.write("wrongtype");
                res.end();

            }



        });
    }else{

        res.write("nologindata");
        res.end();
    }



});



module.exports = router;