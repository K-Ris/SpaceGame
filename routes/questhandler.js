var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');


/* GET home page. */
router.all('/', function (req, res, next) {
    var passcodeVar = req.body.passcode;
    var passcodeCrewVar = req.body.passcodeCrew;
    var requesttypeVar = req.body.requesttype;
    var questIdVar = req.body.questId;

    console.log("Questhandler Requesttype: " + requesttypeVar);
    console.log("Questhandler Passcode Crew: " + passcodeCrewVar);
    console.log("Questhandler Passcode: " + passcodeVar);
    console.log("Questhandler QuestId: " + questIdVar);

    if (requesttypeVar != undefined && requesttypeVar != "null") {

        var dbHost = 'mongodb://masterkey:ananaskokos84@ds151049.mlab.com:51049/spacemaze_db';

        mongoose.connect(dbHost);

        var db = mongoose.connection;

        db.on('error', console.error.bind(console, 'connection error:'));
        db.once('open', function () {

            //Download all quests------------------------------------------------------
            if (requesttypeVar == "quest_download") {

                var collection = db.collection('quests');

                collection.find().toArray(function (err, result) {
                    quests = result;
                    console.log(result[0]);

                    if (quests != undefined) {

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
            //download single quest----------------------------------------------------
            else if (requesttypeVar == "quest_single") {
                var collection = db.collection('quests');
                console.log("quest: " + questIdVar)

                collection.find({quest_id: parseInt(questIdVar)}).toArray(function (err, result2) {
                    quest = result2[0];
                    console.log(result2);

                    if (quest != undefined) {

                        res.json(quest);

                        db.close();
                        res.end();
                    } else {
                        console.log("failed, quest not existing");
                        res.write("notfound");

                        db.close();
                        res.end();
                    }


                })
            }
            //Add new quest to player
            else if (requesttypeVar == "quest_update") {
                var collection = db.collection('crew');

                collection.find({passcode:passcodeCrewVar}).toArray(function(err, result){
                    crew = result[0];

                    if (result[0] != undefined){

                        console.log( "Crew Login dbresult:" + result[0]);
                        console.log("Crew logged in!");
                        console.log("Crew result: "+ result[0].passcode);
                        delete crew["_id"];

                        var collection2 = db.collection('users');

                        collection2.find({passcode:passcodeVar}).toArray(function(err, result){
                            user = result[0];

                            if (result[0] != undefined){

                                console.log( "User Login dbresult:" + result[0]);
                                console.log("User logged in!");
                                console.log("User result: "+ result[0].passcode);
                                delete user["_id"];

                                if (questIdVar != undefined){

                                    if(questIdVar != ""){

                                        user['quests'].push({quest_id:questIdVar});

                                        collection2.update({passcode:passcodeVar}, {$set:user}, function (err, result){
                                            if (err){
                                                console.log(err);
                                                res.write(err);

                                                db.close();
                                                res.end();
                                            }else{
                                                console.log("Updated successfully");
                                                res.json(user);

                                                db.close();
                                                res.end();

                                            }
                                        });
                                    }
                                }

                            } else{
                                console.log("User login failed, user not existing");
                                res.write("notfound");

                                db.close();
                                res.end();
                            }

                        });

                    } else{
                        console.log("Crew login failed, user not existing");
                        res.write("notfound");

                        db.close();
                        res.end();
                    }
                });
            }
            else if(requesttypeVar == "quest_finish"){
                var collection = db.collection('crew');

                collection.find({passcode:passcodeCrewVar}).toArray(function(err, result){
                    crew = result[0];

                    if (result[0] != undefined){

                        console.log( "Crew Login dbresult:" + result[0]);
                        console.log("Crew logged in!");
                        console.log("Crew result: "+ result[0].passcode);
                        delete crew["_id"];

                        var collection2 = db.collection('users');

                        collection2.find({passcode:passcodeVar}).toArray(function(err, result){
                            user = result[0];

                            if (result[0] != undefined){

                                console.log( "User Login dbresult:" + result[0]);
                                console.log("User logged in!");
                                console.log("User result: "+ result[0].passcode);
                                delete user["_id"];

                                if (questIdVar != undefined){

                                    if(questIdVar != ""){

                                        //user['quests_done'].push({quest_id:questIdVar});

                                        var questArray = user['quests'];

                                        questArray.forEach(function(emp, index){
                                            if(emp.quest_id==questIdVar){
                                                delete questArray[index];
                                            }
                                        });

                                        console.log("array: " + JSON.stringify(questArray));

                                        for(var i = 0; i < questArray.length; i++){
                                            if(questArray[i] == null){
                                                questArray = [];
                                                break;
                                            }
                                        }

                                        user['quests'] = questArray;


                                        collection2.update({passcode:passcodeVar}, {$set:user}, function (err, result){
                                            if (err){
                                                console.log(err);
                                                res.write(err);

                                                db.close();
                                                res.end();
                                            }else{
                                                console.log("Updated successfully");
                                                res.json(user);

                                                db.close();
                                                res.end();

                                            }
                                        });
                                    }
                                }

                            } else{
                                console.log("User login failed, user not existing");
                                res.write("notfound");

                                db.close();
                                res.end();
                            }

                        });

                    } else{
                        console.log("Crew login failed, user not existing");
                        res.write("notfound");

                        db.close();
                        res.end();
                    }
                });
            }
        });
    }
});



module.exports = router;