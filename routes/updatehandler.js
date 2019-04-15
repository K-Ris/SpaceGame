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
        });

    }
});

module.exports = router;
