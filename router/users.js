var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var schema = require('../model/schema');
var database = require('../model/database');


// save users POST

router.post('/save', function (req, res, next) {
    schema.User.find({'name': req.body.name}, function (err, result) { // checking if username exist
        if (result.length == 0) { // if not
            var instance = new schema.User(req.body); // create instance of user
            instance.save(function (err, User) { // save instance
                if (err) {
                    return console.error(err); //trhow error
                }
                console.log("Save success: ", User.name);
                var data = { // return object with id of new created user
                    info: 'User saved',
                    id: User._id
                };
                res.send(data);
            });
        } else {
            res.send('Username taken'); // if user exist return this
        }
    });


});

module.exports = router;
