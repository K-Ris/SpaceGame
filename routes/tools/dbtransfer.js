var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var mlabdb = mongoose.connection;
var atlasdb = mongoose.connection;


/* GET home page. */
router.all('/', function(req, res, next) {

    var passcodeVar = req.body.passcode;
    var requesttypeVar = req.body.requesttype;

    console.log("transfer Requesttype: " +requesttypeVar);

    //var dbHost = 'mongodb://masterkey:ananaskokos84@ds147836-a0.mlab.com:47836,ds147836-a1.mlab.com:47836/spacemazeproduction_db?replicaSet=rs-ds147836';
    //var dbHost = 'mongodb+srv://masterkey:ananaskokos84@spacegamecluster-bp8k0.mongodb.net/test?retryWrites=true';
    var dbHost = 'mongodb://newkey:ananas456@ds323239-a0.mlab.com:23239,ds323239-a1.mlab.com:23239/spacemaze_db?replicaSet=rs-ds323239';


    mongoose.connect(dbHost);

    /*

    mlabdb.on('open', function () {
        mlabdb.db.listCollections().toArray(function (err, names) {
            if (err) {
                console.log(err);
            } else {
                console.log(names);
            }

            mongoose.connection.close();
        });
    });
    */


    mlabdb.on('error', console.error.bind(console, 'connection error:'));
    mlabdb.once('open', function(){

        if(requesttypeVar == "transfer"){

            var collection = mlabdb.collection('users');

            collection.find().toArray(function(err, result){
                user = result[0];

                console.log(JSON.stringify(result));

                mlabdb.close();
                res.end();

                /*
                var dbHost = 'mongodb+srv://masterkey:ananaskokos84@spacegamecluster-bp8k0.mongodb.net/test?retryWrites=true';

                mongoose.connect(dbHost);

                atlasdb.on('error', console.error.bind(console, 'connection error:'));
                atlasdb.once('open', function(){

                    var collection = atlasdb.collection('crew');

                    collection.insert(user, function(err, docs){
                        if (err){
                            return console.error(err);

                            atlasdb.close();

                            res.end();

                        } else {
                            console.log("Multiple documents inserted to Collection");

                            atlasdb.close();

                            res.end();

                        }

                    });

                });

                */


            });

        }

    });

});



module.exports = router;