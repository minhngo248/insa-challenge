const { GameRoom } = require('../domains/models/gameRoom');

async function create(data) {
    GameRoom.create({
        name: data.name,
        createdDate: new Date()
    }, (err) => {
        if (err) console.log('Error: ' + err);
    });
}

async function getAllGameRooms() {
    const filter = {};
    return GameRoom.find(filter);
}

async function findGameRoomById(id) {
    return new Promise((resolve, reject) => {
        GameRoom.findById(id, (err, doc) => {
            return err ? reject(err) : resolve(doc);
        });
    });

}

async function addPlayerToGameRoom(id, player) {
    const gameRoom = await findGameRoomById(id);
    let listPlayers = gameRoom.listPlayers;
    var existPlayer = listPlayers.find(p => p._id === player._id);
    if (existPlayer === undefined) {
        listPlayers.push(player);
        const update = {listPlayers: listPlayers};
        await GameRoom.findByIdAndUpdate(id, update, {
            new: true
        });
    }
}

function arrayRemove(arr, value) { 
    return arr.filter(function(ele){ 
        return ele._id != value._id; 
    });
}

async function deletePlayerToGameRoom(idRoom, player) {
    const gameRoom = await findGameRoomById(idRoom);
    let listPlayers = gameRoom.listPlayers;
    var restPlayer = arrayRemove(listPlayers, player);
    if (!restPlayer) {
        restPlayer = [];
    }
    
    const update = {listPlayers: restPlayer};
    await GameRoom.findByIdAndUpdate(idRoom, update, {
        new: true
    });
}

module.exports = {
    create,
    getAllGameRooms,
    findGameRoomById,
    addPlayerToGameRoom,
    deletePlayerToGameRoom
};