const { CureRoom } = require('../domains/models/cureRoom');

async function add(data) {
    CureRoom.create({
        name: data.name,
        createdDate: new Date()
    }, (err) => {
        if (err) console.log('Error: ' + err);
    });
}

async function getAllCureRooms() {
    const filter = {};
    return CureRoom.find(filter);
}

module.exports = {
    add,
    getAllCureRooms
};