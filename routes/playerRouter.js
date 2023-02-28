const express = require('express');
const router = express.Router();
const player = require('../services/playerService');

router.post('/', async function (req, res, next) {
  const telephone = req.body.telephone;
  try {
    const findedPlayer = await player.findPlayerByTelephone(telephone);
    if (findedPlayer === null) {
      res.status(404).json('Not found');
    } else {
      res.json(findedPlayer);
    }
  } catch (err) {
    console.error(`Error while finding player`, err.message);
    next(err);
  }
});

router.get('/:id', async function (req, res, next) {
  try {
    res.json(await player.findPlayerById(req.params.id));
  } catch (err) {
    console.error(`HTTP error while getting player id ${req.params.id} `, err.message);
    next(err);
  }
});

module.exports = router;