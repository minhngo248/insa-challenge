const express = require('express');
const router = express.Router();
const admin = require('../services/adminService');

router.post('/', async function (req, res, next) {
    const username = req.body.username;
    const password = req.body.password;

    try {
        const findedAdmin = await admin.authenticate(username, password);
        if (findedAdmin === null) {
            res.json({ "result": null });
        } else {
            var session = req.session;
            session.adminId = findedAdmin._id;
            res.json({ "result": findedAdmin});
        }
    } catch (err) {
        console.error(`Error while finding admin `, err.message);
        next(err);
    }
});

router.get('/:id', async function (req, res, next) {
    try {
      if (req.session.adminId) {
        res.json(await admin.findAdminById(req.params.id));
      } else {
        res.status(401).send("<h2>Session time-out</h2>");
      }
    } catch (err) {
      console.error(`HTTP error while getting admin `, err.message);
      next(err);
    }
  });

module.exports = router;