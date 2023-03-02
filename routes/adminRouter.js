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
            session.adminOnline = true;
            res.json({ "result": findedAdmin});
        }
    } catch (err) {
        console.error(`Error while finding admin `, err.message);
        next(err);
    }
});

router.get('/', async function (req, res, next) {
    try {
      if (req.session.adminOnline) {
        res.json({"adminOnline": true});
      } else {
        res.json({"adminOnline": false});
      }
    } catch (err) {
      console.error(`HTTP error while getting admin `, err.message);
      next(err);
    }
  });

module.exports = router;