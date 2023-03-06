const express = require('express');
const router = express.Router();
const gameRoom = require('../services/gameRoomService');

/* GET programming languages. */
router.post('/', async function (req, res, next) {
  try {
    res.json(await gameRoom.create(req.body));
  } catch (err) {
    console.error(`Error while adding game room `, err.message);
    next(err);
  }
});

/* GET programming languages. */
router.get('/', async function (req, res, next) {
  try {
    res.json(await gameRoom.getAllGameRooms());
  } catch (err) {
    console.error(`HTTP error while getting all game rooms `, err.message);
    next(err);
  }
});

/* GET programming languages. */
router.get('/:id', async function (req, res, next) {
    try {
      res.json(await gameRoom.findGameRoomById(req.params.id));
    } catch (err) {
      console.error(`HTTP error while getting this game room `, err.message);
      next(err);
    }
  });

module.exports = router;