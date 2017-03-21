// ================================================
// Rooms router
// ================================================

var express = require('express');
var router = express.Router();
var schema = require('../model/schema');
var database = require('../model/database');

// GET request to fetch single room data
router.get('/:id', function (req, res, next) { // hitting /rooms/id
    schema.Room.find({'_id': req.params.id}, function (err, db_room) { // find room schema with id passed with request
        if (err) { // if error throw it
            console.error(err);
            res.render(err);
        }
        else { // if room exist
            schema.Message.find({'room_id': req.params.id}, function (err, db_messages) { // find its messages
                if (err) { // in case of no messages
                    var response = { // return response without messages
                        room: db_room,
                        messages: 'No data'
                    };
                    res.json(response); // parse it to json to make ajax request better
                }
                else { // if room has messages
                    var data = {  // assign room data and messages
                        room: db_room,
                        messages: db_messages
                    };
                    res.json(data); // return json data
                }
            })
        }
    })
});

// POST request to save new created room.
router.post('/', function (req, res, next) { // hits /rooms with post request
    var instance = new schema.Room(req.body); // create instance of room schema
    instance.save(function (err, Room) {  // save to db
        if (err) { // if error throw it
            return console.error(err);
        }
    });
    res.send('Room saved'); // success message if succeed
});


module.exports = router;