var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var db = mongoose.connection;

/* GET home page. */
router.all('/', function(req, res, next) {
    var quest_idVar = req.body.quest_id;

    var quest_nameVar = req.body.quest_name;
    var quest_stagecountVar = req.body.quest_stagecount;
    var quest_departmentVar = req.body.quest_department;
    var quest_crew_idVar = req.body.quest_crew_id;
    var quest_badge_reqVar = req.body.quest_badge_req;
    var quest_free_storage_reqVar = req.body.quest_free_storage_req;
    var quest_online_data_reqVar = req.body.quest_online_data_req;

    var quest_reward_1_badge_idVar = req.body.quest_reward_1_badge_id;
    var quest_reward_1_data_rewardVar = req.body.quest_reward_1_data_reward;
    var quest_reward_1_data_targetVar = req.body.quest_reward_1_data_target;
    var quest_reward_1_data_descVar = req.body.quest_reward_1_data_desc;

    var quest_reward_2_badge_idVar = req.body.quest_reward_2_badge_id;
    var quest_reward_2_data_rewardVar = req.body.quest_reward_2_data_reward;
    var quest_reward_2_data_targetVar = req.body.quest_reward_2_data_target;
    var quest_reward_2_data_descVar = req.body.quest_reward_2_data_desc;

    var quest_reward_3_badge_idVar = req.body.quest_reward_3_badge_id;
    var quest_reward_3_data_rewardVar = req.body.quest_reward_3_data_reward;
    var quest_reward_3_data_targetVar = req.body.quest_reward_3_data_target;
    var quest_reward_3_data_descVar = req.body.quest_reward_3_data_desc;

    var quest_reward_4_badge_idVar = req.body.quest_reward_4_badge_id;
    var quest_reward_4_data_rewardVar = req.body.quest_reward_4_data_reward;
    var quest_reward_4_data_targetVar = req.body.quest_reward_4_data_target;
    var quest_reward_4_data_descVar = req.body.quest_reward_4_data_desc;

    var quest_reward_5_badge_idVar = req.body.quest_reward_5_badge_id;
    var quest_reward_5_data_rewardVar = req.body.quest_reward_5_data_reward;
    var quest_reward_5_data_targetVar = req.body.quest_reward_5_data_target;
    var quest_reward_5_data_descVar = req.body.quest_reward_5_data_desc;

    var quest_reward_6_badge_idVar = req.body.quest_reward_6_badge_id;
    var quest_reward_6_data_rewardVar = req.body.quest_reward_6_data_reward;
    var quest_reward_6_data_targetVar = req.body.quest_reward_6_data_target;
    var quest_reward_6_data_descVar = req.body.quest_reward_6_data_desc;

    var quest_desc_stagesVar = req.body.quest_desc_stages;

    console.log("Questimporter Id: " +quest_idVar);
    console.log("Questimporter Name: " +quest_nameVar);
    console.log("Questimporter Stages: " +quest_stagecountVar);
    console.log("Questimporter Department: " +quest_departmentVar);
    console.log("Questimporter Crew: " +quest_crew_idVar);
    console.log("Questimporter Badges: " +quest_badge_reqVar);
    console.log("Questimporter Free Storage: " +quest_free_storage_reqVar);
    console.log("Questimporter Online Data: " +quest_online_data_reqVar);
    console.log("Questimporter Reward1: " + quest_reward_1_badge_idVar + " " + quest_reward_1_data_rewardVar
        + " " + quest_reward_1_data_targetVar + " " + quest_reward_1_data_descVar);
    console.log("Questimporter Reward2: " + quest_reward_2_badge_idVar + " " + quest_reward_2_data_rewardVar
        + " " + quest_reward_2_data_targetVar + " " + quest_reward_2_data_descVar);
    console.log("Questimporter Reward3: " + quest_reward_3_badge_idVar + " " + quest_reward_3_data_rewardVar
        + " " + quest_reward_3_data_targetVar + " " + quest_reward_3_data_descVar);
    console.log("Questimporter Reward4: " + quest_reward_4_badge_idVar + " " + quest_reward_4_data_rewardVar
        + " " + quest_reward_4_data_targetVar + " " + quest_reward_4_data_descVar);
    console.log("Questimporter Reward5: " + quest_reward_5_badge_idVar + " " + quest_reward_5_data_rewardVar
        + " " + quest_reward_5_data_targetVar + " " + quest_reward_5_data_descVar);
    console.log("Questimporter Reward6: " + quest_reward_6_badge_idVar + " " + quest_reward_6_data_rewardVar
        + " " + quest_reward_6_data_targetVar + " " + quest_reward_6_data_descVar);

    var dbHost = 'mongodb://masterkey:ananaskokos84@ds151049.mlab.com:51049/spacemaze_db';

    mongoose.connect(dbHost);

    var db = mongoose.connection;

    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function(){

        var quest_badge_req_split = quest_badge_reqVar.split(',').map(el => {
            let n = Number(el);
            return n === 0 ? n : n || el;
        });

        var quest_insert = {
            quest_id:  parseInt(quest_idVar),
            quest_name: quest_nameVar,
            quest_stagecount:  parseInt(quest_stagecountVar),
            quest_department: quest_departmentVar,
            quest_crew_id:  quest_crew_idVar,
            quest_badge_req: quest_badge_req_split,
            quest_free_storage_req: parseInt(quest_free_storage_reqVar),
            quest_online_data_req: parseInt(quest_online_data_reqVar),

            quest_rewards:[]
        }

        if(quest_reward_1_badge_idVar != undefined && quest_reward_1_badge_idVar != ""){
            quest_insert.quest_rewards.push({badge_id: parseInt(quest_reward_1_badge_idVar), data_reward: parseInt(quest_reward_1_data_rewardVar),
                data_target: quest_reward_1_data_targetVar, data_desc: quest_reward_1_data_descVar});

        }
        if(quest_reward_2_badge_idVar != undefined && quest_reward_2_badge_idVar != ""){
            quest_insert.quest_rewards.push({badge_id: parseInt(quest_reward_2_badge_idVar), data_reward: parseInt(quest_reward_2_data_rewardVar),
                data_target: quest_reward_2_data_targetVar, data_desc: quest_reward_2_data_descVar});

        }
        if(quest_reward_3_badge_idVar != undefined && quest_reward_3_badge_idVar != ""){
            quest_insert.quest_rewards.push({badge_id: parseInt(quest_reward_3_badge_idVar), data_reward: parseInt(quest_reward_3_data_rewardVar),
                data_target: quest_reward_3_data_targetVar, data_desc: quest_reward_3_data_descVar});

        }
        if(quest_reward_4_badge_idVar != undefined && quest_reward_4_badge_idVar != ""){
            quest_insert.quest_rewards.push({badge_id: parseInt(quest_reward_4_badge_idVar), data_reward: parseInt(quest_reward_4_data_rewardVar),
                data_target: quest_reward_4_data_targetVar, data_desc: quest_reward_4_data_descVar});

        }
        if(quest_reward_5_badge_idVar != undefined && quest_reward_5_badge_idVar != ""){
            quest_insert.quest_rewards.push({badge_id: parseInt(quest_reward_5_badge_idVar), data_reward: parseInt(quest_reward_5_data_rewardVar),
                data_target: quest_reward_5_data_targetVar, data_desc: quest_reward_5_data_descVar});

        }
        if(quest_reward_6_badge_idVar != undefined && quest_reward_6_badge_idVar != ""){
            quest_insert.quest_rewards.push({badge_id: parseInt(quest_reward_6_badge_idVar), data_reward: parseInt(quest_reward_6_data_rewardVar),
                data_target: quest_reward_6_data_targetVar, data_desc: quest_reward_6_data_descVar});

        }

        var quest_stages_split = quest_desc_stagesVar.split(";");

        var quest_desc_insert = {
            quest_id: parseInt(quest_idVar),
            quest_name: quest_nameVar,
            quest_stages: quest_stages_split
        };

        var collection = db.collection('quests');

        collection.find({quest_id:parseInt(quest_idVar)}).toArray(function(err, result){
            user = result[0];
            console.log(result[0]);

            if (result[0] != undefined){
                //quest already exists - update
                console.log("quest existing")
                res.write('quest existing: ');

                collection.update({quest_id:parseInt(quest_idVar)}, {$set:quest_insert}, function (err, result){
                    if (err){
                        console.log(err);
                        res.write(err);
                    }else{
                        console.log("Updated successfully");
                        res.write("DB update Success!");


                        var collection2 = db.collection('quest_desc');

                        collection2.find({quest_id: parseInt(quest_idVar)}).toArray(function (err, result2) {
                            console.log("result2:"+JSON.stringify(result2[0]));

                            if (result2[0] != undefined){

                                console.log(quest_desc_insert.quest_stages)

                                collection2.update({quest_id:parseInt(quest_idVar)}, {$set:quest_desc_insert}, function (err, result){
                                    if (err){
                                        console.log(err);
                                        res.write(err);
                                    }else {
                                        console.log("Updated Desc successfully");
                                        res.write("DB update Success!");
                                    }
                                    res.end();
                                    db.close();
                                });
                            }
                            else{
                                collection2.insert([quest_desc_insert]), function (err, result3) {
                                    if (err) {
                                        console.log(err)
                                        res.write('Insert error: ' + err);

                                        db.close();
                                        res.end();

                                    } else {
                                        console.log('Inserted new user!')
                                        res.write('Success');


                                    }
                                }
                            }
                        });
                            }
                        });


            } else{
                //quest does not exist - insert
                //var quest_badge_req_split = quest_badge_reqVar.split(",");



                collection.insert([quest_insert], function (err, result) {
                    if (err) {
                        console.log(err)
                        res.write('Insert error: ' + err);

                        db.close();
                        res.end();

                    } else {
                        console.log('Inserted new user!')
                        res.write('Success');

                        var collection2 = db.collection('quest_desc');

                        collection2.find({quest_id: parseInt(quest_idVar)}).toArray(function (err, result2) {
                            user = result[0];

                            if (result2[0] != undefined){

                                collection2.update({quest_id:parseInt(quest_idVar)}, {$set:quest_desc_insert}, function (err, result){
                                    if (err){
                                        console.log(err);
                                        res.write(err);
                                    }else {
                                        console.log("Updated Desc successfully");
                                        res.write("DB update Success!");
                                    }
                                    res.end();
                                    db.close();
                                });
                            }
                            else{
                                collection2.insert([quest_desc_insert]), function (err, result) {
                                    if (err) {
                                        console.log(err)
                                        res.write('Insert error: ' + err);

                                        db.close();
                                        res.end();

                                    } else {
                                        console.log('Inserted new user!')
                                        res.write('Success');


                                    }
                                }
                            }
                        });

                    }

                });

            }

        })

    });


});

module.exports = router;
