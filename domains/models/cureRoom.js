const mongoose = require('mongoose');

const cureRoomSchema = new mongoose.Schema({
    name: String,
    createdDate: Date,
    listPlayers: []
});

const CureRoom = mongoose.model('CureRoom', cureRoomSchema);

module.exports = { 
    CureRoom
};