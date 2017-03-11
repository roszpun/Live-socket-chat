// ================================================
// Chat router
// ================================================

var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var database = require('../model/database');

// display chat at /chat route
router.get('/', function (req, res, next) {
    var rooms = mongoose.model('Room');
    var messages = mongoose.model('Message');

    rooms.find({}, function (err, db_rooms) { // find rooms
        if (err) { // throw error if error occurs
            console.error(err);
            res.render(err);
        }
        else { // if room exist look for messages
            messages.find({}, function (err, db_messages) {
                if (err) { // if error throw it
                    console.error(err);
                    res.render(err);
                }
                else { // else return rooms and messages to view
                    res.render('chat', {
                        title: 'Chat',
                        rooms: db_rooms,
                        messages: db_messages
                    })
                }
            })
        }
    })
});



router.get('/get', function (req, res, next) {
    var rooms = mongoose.model('Room');
    rooms.find({}, function (err, db_rooms) { // find rooms
        if (err) { // throw error if error occurs
            console.error(err);
            res.render(err);
        }
        else { // if room exist look for messages
            res.json(db_rooms);
        }
    })
});


module.exports = router;