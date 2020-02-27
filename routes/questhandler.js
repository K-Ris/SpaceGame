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

    if(questAlliesVar == undefined){
        questAlliesVar = [];
    }

    if(passcodeVar.length < 2){
        passcodeVar = '0' + passcodeVar;
    }



    console.log("Questhandler Requesttype: " + requesttypeVar);
    console.log("Questhandler Passcode Crew: " + passcodeCrewVar);
    console.log("Questhandler Passcode: " + passcodeVar);
    console.log("Questhandler QuestId: " + questIdVar);
    console.log("Questhandler Quest Allies: " + questAlliesVar);

    if (requesttypeVar != undefined && requesttypeVar != "null" && passcodeVar != undefined && passcodeVar != "null" && requesttypeVar != undefined && requesttypeVar != "null") {

        var dbHost = 'mongodb://newkey:ananas456@ds323239-a0.mlab.com:23239,ds323239-a1.mlab.com:23239/spacemaze_db?replicaSet=rs-ds323239';
        mongo.connect(dbHost, (err, client) => {
            if (err) {
                console.log(err)
                return
            }

            const db = client.db('spacemaze_db')

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
                                //delete user["_id"];

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
    }
    else{
        res.write("user passcode or requesttype wrong");
        res.end();
    }
});



module.exports = router;