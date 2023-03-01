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
            res.json({ "result": findedAdmin});
        }
    } catch (err) {
        console.error(`Error while finding admin `, err.message);
        next(err);
    }
});

module.exports = router;