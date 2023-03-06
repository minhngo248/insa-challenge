const mongoose = require('mongoose');

const gameRoomSchema = new mongoose.Schema({
    name: String,
    createdDate: Date,
    listPlayers: []
});

const GameRoom = mongoose.model('GameRoom', gameRoomSchema);

module.exports = { 
    GameRoom
};