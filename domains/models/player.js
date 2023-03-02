const mongoose = require('mongoose');

const playerSchema = new mongoose.Schema({
    name: String,
    createdDate: Date,
    class: String,
    tel_number: String,
    online: false
});

const Player = mongoose.model('Player', playerSchema);

module.exports = { 
    Player
};