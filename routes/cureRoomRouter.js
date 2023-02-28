const express = require('express');
const router = express.Router();
const cureRoom = require('../services/cureRoomService');

/* GET programming languages. */
router.post('/', async function (req, res, next) {
  console.log(req.body);
  try {
    res.json(await cureRoom.add(req.body));
  } catch (err) {
    console.error(`Error while adding cure room `, err.message);
    next(err);
  }
});

/* GET programming languages. */
router.get('/', async function (req, res, next) {
  try {
    res.json(await cureRoom.getAllCureRooms());
  } catch (err) {
    console.error(`HTTP error while getting all cure rooms`, err.message);
    next(err);
  }
});

module.exports = router;