const express = require('express');
const router = express.Router();
const player = require('../services/playerService');
const gameRoom = require('../services/gameRoomService');

router.get('/', async (req, res, next) => {
  await player.updateToOfflinePlayer(req.session.playerId);
  var findedPlayer = await player.findPlayerById(req.session.playerId);
  if (findedPlayer.gameRoom) {
    const idRoom = findedPlayer.gameRoom._id;
    await gameRoom.deletePlayerToGameRoom(idRoom, findedPlayer);
    await player.updateGameRoom(findedPlayer._id, null);
  }
  req.session.destroy();
});

module.exports = router;