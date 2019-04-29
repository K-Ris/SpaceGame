var express = require('express');
var router = express.Router();
//var mongoose = require('mongoose');
const mongo = require('mongodb').MongoClient;

/* GET home page. */
router.all('/', function (req, res, next) {

    var passcodeVar = req.body.passcode;
    var passcodeCrewVar = req.body.passcodecrew;
    var requesttypeVar = req.body.requesttype;
    var dataAmountVar = parseInt(req.body.dataamount);
    var questIdVar = parseInt(req.body.questid);
    var badgeIdVar = parseInt(req.body.badgeid);

    //werte abfangen
    if (dataAmountVar == undefined)
        dataAmountVar = 0;

    if (badgeIdVar == undefined)
        badgeIdVar = 0;

    if (questIdVar == undefined)
        questIdVar = 0;

    console.log("Updatehandler Requesttype: " + requesttypeVar);
    console.log("Updatehandler Passcode: " + passcodeVar);
    console.log("Updatehandler Passcode Crew: " + passcodeCrewVar);
    console.log("Updatehandler Dataamount: " + dataAmountVar);
    console.log("Updatehandler badgeId: " + badgeIdVar);
    console.log("Updatehandler questId: " + questIdVar);

    if (passcodeVar != undefined && passcodeVar != "null" && requesttypeVar != undefined && requesttypeVar != "null" && passcodeCrewVar != undefined && passcodeCrewVar != "null") {

        var dbHost = 'mongodb://masterkey:ananaskokos84@ds147836-a0.mlab.com:47836,ds147836-a1.mlab.com:47836/spacemazeproduction_db?replicaSet=rs-ds147836';
        //var options = {
        //    server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } },
        //    replset: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } }
        //};

        //mongoose.connect(dbHost, options);
        mongo.connect(dbHost, (err, client) => {
            if (err) {
                console.log(err)
                return
            }

            const db = client.db('spacemazeproduction_db')

            const collection_crew = db.collection('crew')
            const collection_users = db.collection('users')

            if (requesttypeVar == "update_data") {

                collection_crew.findOne({passcode: passcodeCrewVar}, (err, items) => {
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
                                console.log(item)

                                let user = item;

                                if (user != undefined) {

                                    console.log("User Login dbresult:" + item);
                                    console.log("User logged in!");
                                    console.log("User result: " + item.passcode);
                                    delete user["_id"];

                                    if (dataAmountVar != undefined) {

                                        if (dataAmountVar != "") {
                                            let dataOcc = parseInt(user.storage_occ);
                                            let dataCap = parseInt(user.storage_max);
                                            let dataAmount = parseInt(dataAmountVar);


                                            dataOcc += dataAmount;

                                            if (dataOcc < 0) {
                                                dataOcc = 0;
                                            }

                                            if (dataOcc > dataCap) {
                                                dataOcc = dataCap;
                                            }

                                            console.log("occ" + dataOcc);

                                            user['storage_occ'] = dataOcc;

                                            collection_users.updateOne({passcode: passcodeVar}, {'$set': user}, (err, item) => {
                                                if (err) {
                                                    console.log(err);
                                                    client.close();
                                                    res.write(err);
                                                    res.end();

                                                } else {
                                                    //console.log(item);
                                                    client.close();
                                                    res.write("insert success");
                                                    res.end();
                                                }
                                            })
                                        } else {
                                            //
                                            console.log("dataamount incorrect format!");
                                            client.close();
                                            res.write("incorrect format");
                                            res.end();
                                        }
                                    } else {
                                        //
                                        console.log("dataamount incorrect format!");
                                        client.close();
                                        res.write("incorrect format");
                                        res.end();
                                    }
                                } else {
                                    //
                                    console.log("user not defined!");
                                    client.close();
                                    res.write("user not defined");
                                    res.end();
                                }
                            }

                        })
                    }


                })
            }
            else if (requesttypeVar == "update_badge") {

                console.log("here")

                collection_crew.findOne({passcode: passcodeCrewVar}, (err, items) => {
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
                                console.log(item)

                                let user = item;

                                if (user != undefined) {

                                    console.log("User Login dbresult:" + item);
                                    console.log("User logged in!");
                                    console.log("User result: " + item.passcode);
                                    delete user["_id"];

                                    user['badges'].push(badgeIdVar);

                                    collection_users.updateOne({passcode: passcodeVar}, {'$set': user}, (err, item) => {
                                        if (err) {
                                            console.log(err);
                                            client.close();
                                            res.write(err);
                                            res.end();

                                        } else {
                                            //console.log(item);
                                            client.close();
                                            res.write("insert success");
                                            res.end();
                                        }
                                    })
                                } else {
                                    //
                                    console.log("user not defined!");
                                    client.close();
                                    res.write("user not defined");
                                    res.end();
                                }
                            }

                        })
                    }


                })
            }
            else if (requesttypeVar == "extend_data") {
                collection_crew.findOne({passcode: passcodeCrewVar}, (err, items) => {
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
                                console.log(item)

                                let user = item;

                                if (user != undefined) {

                                    console.log("User Login dbresult:" + item);
                                    console.log("User logged in!");
                                    console.log("User result: " + item.passcode);
                                    delete user["_id"];

                                    if (dataAmountVar != undefined) {

                                        if (dataAmountVar != "") {
                                            let dataCap = parseInt(user.storage_max);
                                            let dataAmount = parseInt(dataAmountVar);


                                            dataCap += dataAmount;

                                            if (dataCap < 400) {
                                                dataCap = 400;
                                            }

                                            console.log("max: " + dataCap);

                                            user['storage_max'] = dataCap;

                                            collection_users.updateOne({passcode: passcodeVar}, {'$set': user}, (err, item) => {
                                                if (err) {
                                                    console.log(err);
                                                    client.close();
                                                    res.write(err);
                                                    res.end();

                                                } else {
                                                    //console.log(item);
                                                    client.close();
                                                    res.write("insert success");
                                                    res.end();
                                                }
                                            })
                                        } else {
                                            //
                                            console.log("dataamount incorrect format!");
                                            client.close();
                                            res.write("incorrect format");
                                            res.end();
                                        }
                                    } else {
                                        //
                                        console.log("dataamount incorrect format!");
                                        client.close();
                                        res.write("incorrect format");
                                        res.end();
                                    }
                                } else {
                                    //
                                    console.log("user not defined!");
                                    client.close();
                                    res.write("user not defined");
                                    res.end();
                                }
                            }

                        })
                    }


                })

                //

            } else if (requesttypeVar == "upload_data_old") {
                collection_crew.findOne({passcode: passcodeCrewVar}, (err, items) => {
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
                                console.log(item)

                                let user = item;

                                if (user != undefined) {

                                    console.log("User Login dbresult:" + item);
                                    console.log("User logged in!");
                                    console.log("User result: " + item.passcode);
                                    delete user["_id"];


                                    let dataOcc = parseInt(user.storage_occ);

                                    let dataPlus = 100;


                                    user['storage_occ'] = 0;

                                    if (dataOcc <= 100) {
                                        dataPlus = 100;
                                    } else if (dataOcc <= 200) {
                                        dataPlus = 100;
                                    } else if (dataOcc <= 300) {
                                        dataPlus = 150;
                                    } else if (dataOcc <= 400) {
                                        dataPlus = 150;
                                    } else if (dataOcc <= 500) {
                                        dataPlus = 150;
                                    } else if (dataOcc <= 600) {
                                        dataPlus = 200;
                                    } else if (dataOcc <= 700) {
                                        dataPlus = 250;
                                    } else if (dataOcc <= 800) {
                                        dataPlus = 250;
                                    } else if (dataOcc <= 900) {
                                        dataPlus = 250;
                                    } else if (dataOcc >= 1000) {
                                        dataPlus = 300;
                                    } else {
                                        dataPlus = 100;
                                    }


                                    console.log("Data Plus: " + dataPlus);
                                    user['storage_max'] = user['storage_max'] + dataPlus;
                                    user['storage_sum'] = user['storage_sum'] + (dataOcc - 50);

                                    collection_users.updateOne({passcode: passcodeVar}, {'$set': user}, (err, item) => {
                                        if (err) {
                                            console.log(err);
                                            client.close();
                                            res.write(err);
                                            res.end();

                                        } else {
                                            //console.log(item);
                                            client.close();
                                            res.write("insert success");
                                            res.end();
                                        }
                                    })
                                } else {
                                    //
                                    console.log("user not defined!");
                                    client.close();
                                    res.write("user not defined");
                                    res.end();
                                }
                            }

                        })
                    }


                })

                //

            }
            else if (requesttypeVar == "upload_data") {
                collection_crew.findOne({passcode: passcodeCrewVar}, (err, items) => {
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
                                console.log(item)

                                let user = item;

                                if (user != undefined) {

                                    console.log("User Login dbresult:" + item);
                                    console.log("User logged in!");
                                    console.log("User result: " + item.passcode);
                                    delete user["_id"];

                                    console.log("user storage occ: " + user['storage_occ'])

                                    if(user['storage_occ'] > 0){

                                        let dataOcc = parseInt(user.storage_occ);

                                        let dataPlus = 100;


                                        user['storage_occ'] = 0;

                                        if (dataOcc <= 100) {
                                            dataPlus = 100;
                                        } else if (dataOcc <= 200) {
                                            dataPlus = 100;
                                        } else if (dataOcc <= 300) {
                                            dataPlus = 150;
                                        } else if (dataOcc <= 400) {
                                            dataPlus = 150;
                                        } else if (dataOcc <= 500) {
                                            dataPlus = 150;
                                        } else if (dataOcc <= 600) {
                                            dataPlus = 200;
                                        } else if (dataOcc <= 700) {
                                            dataPlus = 250;
                                        } else if (dataOcc <= 800) {
                                            dataPlus = 250;
                                        } else if (dataOcc <= 900) {
                                            dataPlus = 250;
                                        } else if (dataOcc >= 1000) {
                                            dataPlus = 300;
                                        } else {
                                            dataPlus = 100;
                                        }


                                        console.log("Data Plus: " + dataPlus);
                                        user['storage_max'] = user['storage_max'] + dataPlus;
                                        user['storage_sum'] = user['storage_sum'] + (dataOcc);

                                        collection_users.updateOne({passcode: passcodeVar}, {'$set': user}, (err, item) => {
                                            if (err) {
                                                console.log(err);
                                                client.close();
                                                res.write(err);
                                                res.end();

                                            } else {
                                                //console.log(item);
                                                client.close();
                                                res.write("insert success");
                                                res.end();
                                            }
                                        })
                                    }else {
                                        //
                                        console.log("no data to upload!");
                                        client.close();
                                        res.write("nodatatoupload");
                                        res.end();
                                    }

                                } else {
                                    //
                                    console.log("user not defined!");
                                    client.close();
                                    res.write("user not defined");
                                    res.end();
                                }
                            }

                        })
                    }


                })

                //

            }
            else if (requesttypeVar == "finish_quest") {
                collection_crew.findOne({passcode: passcodeCrewVar}, (err, items) => {
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
                                console.log(item)

                                let user = item;

                                if (user != undefined) {

                                    let dataOcc = parseInt(user.storage_occ);
                                    let dataCap = parseInt(user.storage_max);
                                    let dataAmount = parseInt(dataAmountVar);


                                    dataOcc += dataAmount;

                                    if(dataOcc < 0){
                                        dataOcc = 0;
                                    }

                                    if(dataOcc > dataCap){
                                        dataOcc = dataCap;
                                    }

                                    console.log("badge_id:" + badgeIdVar);

                                    user['storage_occ']=dataOcc;

                                    user['badges'].push(parseInt(badgeIdVar));

                                    var questArray = user['quests'];

                                    user['quests_done'].push(questIdVar);


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
                                            res.write("insert success");
                                            res.end();
                                        }
                                    })
                                } else {
                                    //
                                    console.log("user not defined!");
                                    client.close();
                                    res.write("user not defined");
                                    res.end();
                                }
                            }

                        })
                    }


                })

                //

            }


        });

        /*

        //var db = mongoose.connection;

        db.on('error', console.error.bind(console, 'connection error:'));
        db.once('open', function(){
            if(requesttypeVar == "update_data"){
                var collection = db.collection('crew');

                collection.find({passcode:passcodeCrewVar}).toArray(function(err, result){
                    crew = result[0];

                    if (result[0] != undefined){

                        console.log( "Crew Login dbresult:" + result[0]);
                        console.log("Crew logged in!");
                        console.log("Crew result: "+ result[0].passcode);
                        delete crew["_id"];

                        var collection2 = db.collection('users');

                        try{

                            collection2.find({passcode:passcodeVar}).toArray(function(err, result){
                                user = result[0];

                                if (result[0] != undefined){

                                    console.log( "User Login dbresult:" + result[0]);
                                    console.log("User logged in!");
                                    console.log("User result: "+ result[0].passcode);
                                    delete user["_id"];

                                    if (dataAmountVar != undefined){

                                        if(dataAmountVar != ""){
                                            let dataOcc = parseInt(user.storage_occ);
                                            let dataCap = parseInt(user.storage_max);
                                            let dataAmount = parseInt(dataAmountVar);


                                            dataOcc += dataAmount;

                                            if(dataOcc < 0){
                                                dataOcc = 0;
                                            }

                                            if(dataOcc > dataCap){
                                                dataOcc = dataCap;
                                            }

                                            console.log("occ"+dataOcc);

                                            user['storage_occ']=dataOcc;


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
                        }
                        catch(e){
                            res.write("dbfail");

                            db.close();
                            res.end();
                        }

                    } else{
                        console.log("Crew login failed, user not existing");
                        res.write("notfound");

                        db.close();
                        res.end();
                    }
                });
            }
            //extend Data Storage
            else if(requesttypeVar == "extend_data"){
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

                                if (dataAmountVar != undefined){

                                    if(dataAmountVar != ""){
                                        //let dataOcc = parseInt(user.storage_occ);
                                        let dataCap = parseInt(user.storage_max);
                                        let dataAmount = parseInt(dataAmountVar);


                                        dataCap += dataAmount;

                                        if(dataCap < 400){
                                            dataCap = 400;
                                        }

                                        console.log("max: "+dataCap);

                                        user['storage_max']=dataCap;


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
            //Terminal upload Data
            else if(requesttypeVar == "upload_data"){
                var collection = db.collection('crew');

                collection.find({passcode:passcodeCrewVar}).toArray(function(err, result){
                    crew = result[0];

                    if (result[0] != undefined){

                        console.log( "Crew Login dbresult:" + JSON.stringify(result[0]));
                        console.log("Crew logged in!");
                        console.log("Crew result: "+ result[0].passcode);
                        delete crew["_id"];

                        var collection2 = db.collection('users');

                        collection2.find({passcode:passcodeVar}).toArray(function(err, result) {
                            user = result[0];

                            if (result[0] != undefined) {

                                console.log("User Login dbresult:" + JSON.stringify(result[0]));
                                console.log("User logged in!");
                                console.log("User result: " + result[0].passcode);
                                delete user["_id"];

                                let dataOcc = parseInt(user.storage_occ);

                                let dataPlus = 100;


                                user['storage_occ'] = 0;

                                if(dataOcc <= 100){
                                    dataPlus = 100;
                                }
                                else if(dataOcc <= 200){
                                    dataPlus = 100;
                                }
                                else if(dataOcc <= 300){
                                    dataPlus = 150;
                                }
                                else if(dataOcc <= 400){
                                    dataPlus = 150;
                                }
                                else if(dataOcc <= 500){
                                    dataPlus = 150;
                                }
                                else if(dataOcc <= 600){
                                    dataPlus = 200;
                                }
                                else if(dataOcc <= 700){
                                    dataPlus = 250;
                                }
                                else if(dataOcc <= 800){
                                    dataPlus = 250;
                                }
                                else if(dataOcc <= 900){
                                    dataPlus = 250;
                                }
                                else if(dataOcc >= 1000){
                                    dataPlus = 300;
                                }
                                else {
                                    dataPlus = 100;
                                }


                                console.log("Data Plus: " + dataPlus);
                                user['storage_max'] = user['storage_max'] + dataPlus;
                                user['storage_sum'] = user['storage_sum'] + (dataOcc - 50);

                                console.log("user: " + JSON.stringify(user))


                                collection2.update({passcode: passcodeVar}, {$set: user}, function (err, result) {
                                    if (err) {
                                        console.log(err);
                                        res.write(err);

                                        db.close();
                                        res.end();
                                    } else {
                                        console.log("Updated successfully");
                                        res.json(user);

                                        db.close();
                                        res.end();

                                    }
                                });
                            }
                        });

                        } else{
                            console.log("User login failed, user not existing");
                            res.write("notfound");

                            db.close();
                            res.end();
                        }

                    });

            }
            //Terminal upload Data
            else if(requesttypeVar == "finish_quest"){
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

                                if (dataAmountVar != undefined){

                                    if(dataAmountVar != ""){
                                        let dataOcc = parseInt(user.storage_occ);
                                        let dataCap = parseInt(user.storage_max);
                                        let dataAmount = parseInt(dataAmountVar);


                                        dataOcc += dataAmount;

                                        if(dataOcc < 0){
                                            dataOcc = 0;
                                        }

                                        if(dataOcc > dataCap){
                                            dataOcc = dataCap;
                                        }

                                        console.log("occ"+dataOcc);

                                        user['storage_occ']=dataOcc;

                                        user['badges'].push(badgeIdVar);


                                        var questArray = user['quests'];

                                        user['quests_done'].push(questIdVar);


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

                                        //remove quest
                                        //add badge
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
