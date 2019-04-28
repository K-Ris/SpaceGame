var express = require('express');
var router = express.Router();
//var mongoose = require('mongoose');
const mongo = require('mongodb').MongoClient;


/* GET home page. */
router.all('/', function (req, res, next) {
    var passcodeVar = req.body.passcode;
    var passcodeCrewVar = req.body.passcodeCrew;
    var requesttypeVar = req.body.requesttype;
    var questIdVar = parseInt(req.body.questId);
    var arrayallies = req.body.questallies;
    var questAlliesVar = []
    if(req.body.questallies != undefined && req.body.questallies != "")
        questAlliesVar = arrayallies.split(",");
    else if(req.body.questallies == "")
        questAlliesVar = []

    console.log("Questhandler Requesttype: " + requesttypeVar);
    console.log("Questhandler Passcode Crew: " + passcodeCrewVar);
    console.log("Questhandler Passcode: " + passcodeVar);
    console.log("Questhandler QuestId: " + questIdVar);
    console.log("Questhandler Quest Allies: " + questAlliesVar);

    if (requesttypeVar != undefined && requesttypeVar != "null") {

        var dbHost = 'mongodb://masterkey:ananaskokos84@ds147836-a0.mlab.com:47836,ds147836-a1.mlab.com:47836/spacemazeproduction_db?replicaSet=rs-ds147836';

        mongo.connect(dbHost, (err, client) => {
            if (err) {
                console.log(err)
                return
            }

            const db = client.db('spacemazeproduction_db')

            const collection_crew = db.collection('crew')
            const collection_users = db.collection('users')
            const collection_quests = db.collection('quests')
            const collection_quests_terminal_upload = db.collection('quests_terminal_upload')


            if (requesttypeVar == "quest_download") {

                collection_quests.find().toArray((err, items) => {
                    if (err) {
                        console.log(err);
                        client.close();
                        res.write(err);
                        res.end();
                    } else {
                        let quests = items;
                        delete quests["_id"];
                        res.json(quests);

                        client.close();
                        res.end();
                    }


                })
            }
            if (requesttypeVar == "quest_terminal_upload_download") {

                collection_quests_terminal_upload.find().toArray((err, items) => {
                    if (err) {
                        console.log(err);
                        client.close();
                        res.write(err);
                        res.end();
                    } else {
                        let quests = items;
                        delete quests["_id"];
                        res.json(quests);

                        client.close();
                        res.end();
                    }


                })
            }
            else if (requesttypeVar == "quest_single") {

                collection_quests.findOne({quest_id: parseInt(questIdVar)}, (err, item) => {
                    if (err) {
                        console.log(err);
                        client.close();
                        res.write(err);
                        res.end();
                    } else {
                        let quest = item;
                        delete quest["_id"];
                        res.json(quest);

                        client.close();
                        res.end();
                    }


                })
            }
            else if(requesttypeVar == "quest_update"){
                collection_crew.findOne({passcode: passcodeCrewVar}, (err, item) => {
                    if (err) {
                        console.log(err);
                        client.close();
                        res.write(err);
                        res.end();
                    } else {

                        collection_users.findOne({passcode: passcodeVar}, (err, item) => {
                            if (err) {
                                console.log(err);
                                client.close();
                                res.write(err);
                                res.end();
                            } else {
                                let user = item;
                                delete user["_id"];

                                user['quests'].push({quest_id:questIdVar, quest_allies:questAlliesVar});

                                collection_users.updateOne({passcode: passcodeVar}, {'$set': user}, (err, item) => {
                                    if (err) {
                                        console.log(err);
                                        client.close();
                                        res.write(err);
                                        res.end();

                                    } else {
                                        //console.log(item);
                                        client.close();
                                        res.json(user);
                                        res.end();
                                    }
                                })
                            }


                        })
                    }


                })
            }
            else if(requesttypeVar == "quest_cancel"){
                collection_crew.findOne({passcode: passcodeCrewVar}, (err, item) => {
                    if (err) {
                        console.log(err);
                        client.close();
                        res.write(err);
                        res.end();
                    } else {

                        collection_users.findOne({passcode: passcodeVar}, (err, item) => {
                            if (err) {
                                console.log(err);
                                client.close();
                                res.write(err);
                                res.end();
                            } else {
                                let user = item;
                                delete user["_id"];

                                var questArray = user['quests'];


                                questArray = questArray.filter(function(item) {
                                    return item.quest_id != questIdVar;
                                });

                                user['quests'] = questArray;

                                collection_users.updateOne({passcode: passcodeVar}, {'$set': user}, (err, item) => {
                                    if (err) {
                                        console.log(err);
                                        client.close();
                                        res.write(err);
                                        res.end();

                                    } else {
                                        //console.log(item);
                                        client.close();
                                        res.json(user);
                                        res.end();
                                    }
                                })
                            }


                        })
                    }


                })
            }
        })







        /////////////////////////////////////////////////////////////////////////////////////////////////////
/*

        var dbHost = 'mongodb://masterkey:ananaskokos84@ds147836-a0.mlab.com:47836,ds147836-a1.mlab.com:47836/spacemazeproduction_db?replicaSet=rs-ds147836';
        var options = {
            server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } },
            replset: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } }
        };

        mongoose.connect(dbHost, options);

        var db = mongoose.connection;

        db.on('error', console.error.bind(console, 'connection error:'));
        db.once('open', function () {

            //Download all quests------------------------------------------------------
            if (requesttypeVar == "quest_download") {

                var collection = db.collection('quests');

                collection.find().toArray(function (err, result) {
                    quests = result;
                    //console.log(result[0]);

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
            //Add new quest to player-----------------------------------------------------------------------------
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

            //-------------------------------------------------------------------------------------------------------
            else if(requesttypeVar == "quest_cancel"){
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


                                        questArray = questArray.filter(function(item) {
                                            return item.quest_id != questIdVar;
                                        });

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
        */
    }
});



module.exports = router;