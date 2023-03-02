const { Player } = require('../domains/models/player');

async function add(data) {
    Player.create({
        name: data.name,
        createdDate: new Date(),
        class: data.class,
        tel_number: data.tel_number
    }, (err) => {
        if (err) console.log('Error: ' + err);
    });
}

async function getAllPlayers() {
    const filter = {};
    return Player.find(filter);
}

async function deleteById(id) {
    return Player.deleteOne({ _id: id });
}

async function findPlayerByTelephone(telephone) {
    const decodeTel = decodeURIComponent(telephone);
    return new Promise((resolve, reject) => {
        Player.findOne({ tel_number: { $eq: decodeTel } }, (err, doc) => {
            return err ? reject(err) : resolve(doc);
        });
    });
}

async function findPlayerById(id) {
    return new Promise((resolve, reject) => {
        Player.findById(id, (err, doc) => {
            return err ? reject(err) : resolve(doc);
        });
    });
}

async function updateToOnlinePlayer(id) {
    const filter = { _id : id };
    const update = { online: true };
    await Player.findOneAndUpdate(filter, update, {
        new: true
    });
}

async function updateToOfflinePlayer(id) {
    const filter = { _id : id };
    const update = { online: false };
    await Player.findOneAndUpdate(filter, update, {
        new: true
    });
}

module.exports = {
    add,
    getAllPlayers,
    deleteById,
    findPlayerByTelephone,
    findPlayerById,
    updateToOnlinePlayer,
    updateToOfflinePlayer
};