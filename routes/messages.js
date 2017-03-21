// ================================================
// Messages router
// ================================================

var express = require('express');
var router = express.Router();
var schema = require('../model/schema');
var database = require('../model/database');


// POST route to insert message to the database

router.post('/', function (req, res, next) { // post request hits /messages
    var instance = new schema.Message(req.body); // crate instance of message based on request body param
    instance.save(function (err, Message) { // saving instance
        if (err){ // throw error and return on error
            return console.error(err);
        }
    });
    res.send('Message saved'); // return success message if request succeeded
});

module.exports = router;
