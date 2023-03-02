const express = require('express');
const router = express.Router();
const player = require('../services/playerService');

router.get('/', (req, res, next) => {
    player.updateToOfflinePlayer(req.session.playerId);
    console.log(req.session.id);
    req.session.destroy();
  })

module.exports = router;