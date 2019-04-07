var express = require('express');
var router = express.Router();

/* GET home page. */
router.post('/', function(req, res, next) {

    //check if user or crew wants to login
    //make database request depending on post content
    //return database result



    res.sendfile('./public/views/login.html');
});


module.exports = router;