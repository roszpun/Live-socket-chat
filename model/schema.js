// Creating schemas for mongo

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var exports = module.exports = {};

/// Single room schema
exports.roomSchema = new Schema({
    author: String,
    name: String,
    description: String
});

/// message schema

exports.messageSchema = new Schema({
    body:  String,
    author: String,
    room_id: String,
    user_id: String,
    date: { type: Date, default: Date.now }
});

// Users schema

exports.userSchema = new Schema({
    name: String
});

// Assigning schemas

exports.User = mongoose.model('User', exports.userSchema);
exports.Message = mongoose.model('Message',exports.messageSchema);
exports.Room = mongoose.model('Room',exports.roomSchema);
