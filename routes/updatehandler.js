var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');

var db = mongoose.connection;

/* GET home page. */
router.all('/', function(req, res, next) {

    var passcodeVar = req.body.passcode;
    var passcodeCrewVar = req.body.passcodecrew;
    var requesttypeVar = req.body.requesttype;
    var dataAmountVar = req.body.dataamount;

    console.log("Loginhandler Requesttype: " +requesttypeVar);
    console.log("Loginhandler Passcode: " +passcodeVar);
    console.log("Loginhandler Passcode Crew: " +passcodeCrewVar);
    console.log("Loginhandler Dataamount: " +dataAmountVar);

    if(passcodeVar != undefined && passcodeVar != "null" && requesttypeVar != undefined && requesttypeVar != "null" && passcodeCrewVar != undefined && passcodeCrewVar != "null"){

        var dbHost = 'mongodb://masterkey:ananaskokos84@ds151049.mlab.com:51049/spacemaze_db';

        mongoose.connect(dbHost);

        var db = mongoose.connection;

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


                                        if((dataOcc + dataAmount) <= dataCap){

                                            dataOcc += dataAmount;

                                            if(dataOcc < 0){
                                                dataOcc = 0;
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

                                        }else{
                                            console.log("no free Storage");

                                            res.write("nofreestorage");
                                            db.close();
                                            res.end();

                                        }
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
        });

    }
});

module.exports = router;
