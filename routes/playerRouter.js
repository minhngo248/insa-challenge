const express = require('express');
const router = express.Router();
const player = require('../services/playerService');

router.post('/', async function (req, res, next) {
  const telephone = req.body.telephone;
  try {
    const findedPlayer = await player.findPlayerByTelephone(telephone);
    if (findedPlayer === null) {
      res.json({ "result": null });
    } else {
      var session = req.session;
      session.playerOnline = true;
      session.playerId = findedPlayer._id;
      res.json({ "result": findedPlayer });
    }
  } catch (err) {
    console.error(`Error while finding player`, err.message);
    next(err);
  }
});

router.get('/:id', async function (req, res, next) {
  try {
    if (req.session.playerOnline) {
      console.log(req.session);
      player.updateToOnlinePlayer(req.params.id);
      res.json(await player.findPlayerById(req.params.id));
    } else {
      res.status(401).send("<h2>Session time-out</h2>")
    }
  } catch (err) {
    console.error(`HTTP error while getting player id ${req.params.id} `, err.message);
    next(err);
  }
});

module.exports = router;