const express = require('express');
const router = express.Router();
const players = require('../services/playerService');

router.post('/', async function (req, res, next) {
  console.log(req.body);
  try {
    res.json(await players.add(req.body));
  } catch (err) {
    console.error(`Error while adding player`, err.message);
    next(err);
  }
});

/* GET programming languages. */
router.get('/', async function (req, res, next) {
  try {
    res.json(await players.getAllPlayers());
  } catch (err) {
    console.error(`HTTP error while getting all players`, err.message);
    next(err);
  }
});


router.delete('/:id', async function (req, res, next) {
  try {
    res.json(await players.deleteById(req.params.id));
  } catch (err) {
    console.error(`HTTP error while deleting player id ${req.params.id}`);
    next(err);
  }
});

module.exports = router;