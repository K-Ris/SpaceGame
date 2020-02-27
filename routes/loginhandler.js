var express = require('express');
var router = express.Router();
const mongo = require('mongodb').MongoClient;

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
        console.log("not undefined")
        var dbHost = 'mongodb://newkey:ananas456@ds323239-a0.mlab.com:23239,ds323239-a1.mlab.com:23239/spacemaze_db?replicaSet=rs-ds323239';
        mongo.connect(dbHost, function(err, client) {
            if (err) {
                console.log(err)
                return
            }
            console.log("spacedb")
            const db = client.db('spacemaze_db')

            const collection_crew = db.collection('crew')
            const collection_users = db.collection('users')
            const collection_quests = db.collection('quests')
            const collection_badge = db.collection('badges')

            console.log("<>>>>>>>>>>"+requesttypeVar)

            if (requesttypeVar == "crew_login") {
                console.log("crew login")
                collection_crew.findOne({passcode: passcodeVar}, (err, item) => {
                    if (err) {
                        console.log(err);
                        client.close();
                        res.write(err);
                        res.end();
                    } else {
                        let user = item;
                        console.log( "Crew Login dbresult:" + item);
                        console.log("Crew logged in!");
                        console.log("Crew result: "+ item.passcode);
                        delete user["_id"];
                        res.json(user);

                        client.close();
                        res.end();
                    }


                })
            }
            else if(requesttypeVar == "user_login"){
                collection_users.findOne({passcode: passcodeVar}, (err, item) => {
                    if (err) {
                        console.log(err);
                        client.close();
                        res.write(err);
                        res.end();
                    } else {
                        let user = item;
                        if(item != null && item != undefined){

                            console.log( "User Login dbresult:" + item);
                            console.log("User logged in!");
                            console.log("User result: "+ item.passcode);
                            delete user["_id"];
                            res.json(user);
                            console.log(user)
                            client.close();
                            res.end();
                        }
                        else{
                            console.log("user undefined");
                            client.close();
                            res.write("user undefined");
                            res.end();
                        }
                    }


                })
            }
            else if(requesttypeVar == "get_all_users"){
                collection_users.find().toArray((err, items) => {
                    if (err) {
                        console.log(err);
                        client.close();
                        res.write(err);
                        res.end();
                    } else {
                        let user = items;
                        if(items != null && items != undefined){

                            delete user["_id"];
                            res.json(user);

                            client.close();
                            res.end();
                        }
                        else{
                            console.log("user undefined");
                            client.close();
                            res.write("user undefined");
                            res.end();
                        }
                    }


                })
            }
            else if(requesttypeVar == "user_stats"){

                collection_users.findOne({passcode: passcodeVar}, (err, item) => {
                    if (err) {
                        console.log(err);
                        client.close();
                        res.write(err);
                        res.end();
                    } else {
                        let user = item;

                        let searchedQuestIds = [];

                        for(var i = 0; i < user.quests.length; i++){
                            searchedQuestIds.push(parseInt(user.quests[i].quest_id));
                        }

                        collection_quests.find({quest_id:{ $in: searchedQuestIds}}).toArray((err, items) => {
                            if (err) {
                                console.log(err);
                                client.close();
                                res.write(err);
                                res.end();
                            } else {
                                console.log(items)

                                let quests = items;

                                if (quests != undefined) {

                                    user["badge_names"] = [];
                                    user["quest_names"] = [];

                                    var searchedBadgeIds = [];

                                    console.log("user: " + JSON.stringify(quests))

                                    for(var j = 0; j < quests.length; j++){
                                        user["quest_names"].push({"quest_id":quests[j].quest_id, "quest_name":quests[j].quest_name});

                                    }

                                    for(var i = 0; i < user.badges.length; i++){
                                        if(user.badges[i].badge_id != 0){

                                            searchedBadgeIds.push(user.badges[i]);
                                        }
                                    }

                                    console.log("searchedBadgeIds: " + searchedBadgeIds);

                                    collection_badge.find({badge_id:{ $in: searchedBadgeIds}}).toArray((err, items) => {
                                        if (err) {
                                            console.log(err);
                                            client.close();
                                            res.write(err);
                                            res.end();
                                        } else {
                                            let badges = items;

                                            //console.log(result);

                                            if (items != undefined){

                                                console.log("logged in");
                                                console.log("badgesresult: "+ items[0].badge_name);



                                                for(var j = 0; j < items.length; j++){
                                                    user["badge_names"].push({"badge_id":items[j].badge_id, "badge_name":items[j].badge_name});

                                                }


                                                res.json(user);

                                                client.close();
                                                res.end();

                                            } else{
                                                console.log("user exists, but no badges found");
                                                //still join quests, but with empty value

                                                user["quest_names"] = [];

                                                res.json(user);

                                                client.close();
                                                res.end();
                                            }
                                        }

                                    })

                                } else {
                                    //
                                    console.log("quests not defined!");
                                    client.close();
                                    res.write(user);
                                    res.end();
                                }
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