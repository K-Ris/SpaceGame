var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');


/* GET home page. */
router.all('/', function(req, res, next) {
    var passcodeVar = req.body.passcode;
    var requesttypeVar = req.body.requesttype;
    var questIdVar = req.body.questId;

    console.log("Questhandler Requesttype: " +requesttypeVar);
    console.log("Questhandler Passcode: " +passcodeVar);
    console.log("Questhandler QuestId: "+ questIdVar);

    if(passcodeVar != undefined && passcodeVar != "null" && requesttypeVar != undefined && requesttypeVar != "null"){

        var dbHost = 'mongodb://masterkey:ananaskokos84@ds151049.mlab.com:51049/spacemaze_db';

        mongoose.connect(dbHost);

        var db = mongoose.connection;

        db.on('error', console.error.bind(console, 'connection error:'));
        db.once('open', function() {

            if (requesttypeVar == "quest_download") {

                var collection = db.collection('quests');

                collection.find().toArray(function (err, result) {
                    quests = result;
                    console.log(result[0]);

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
            else if(requesttypeVar == "quest_single"){
                var collection = db.collection('quests');
                console.log("quest: " + questIdVar)

                collection.find({quest_id: parseInt(questIdVar)}).toArray(function(err, result2){
                    quest = result2[0];
                    console.log(result2);

                    if(quest != undefined){

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
        });
            }
});


module.exports = router;