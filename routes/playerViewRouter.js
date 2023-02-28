var express = require('express');
var router = express.Router();

router.get('/', async function (req, res, next) {
    var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
    var urlParams = new URL(fullUrl).searchParams;
    const idPlayer = urlParams.get('id');
    let options = {
        method: 'GET',
        headers: {
            'Accept': 'application/json'
        }
    };

    await fetch(`${req.protocol}://${req.get('host')}/api/player/${idPlayer}`, options)
        .then(response => response.json())
        .then(async (d) => {
            await res.render('player', { namePlayer: d.name });
            res.end();
        })
        .catch(error => console.log('Error while loading document ' + error));
});

module.exports = router;