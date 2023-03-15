const mongoose = require('mongoose');

const gameRoomSchema = new mongoose.Schema({
    name: String,
    createdDate: Date,
    listPlayers: [],
    linkImg: String,
    location: String,
    maxPlayers: Number
});

const GameRoom = mongoose.model('GameRoom', gameRoomSchema);

module.exports = { 
    GameRoom
};