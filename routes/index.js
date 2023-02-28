var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'INSA Challenge', namePlayer: '' });
});

/* POST Player page with telephone number. */
router.post('/', async function (req, res, next) {
  const valueTel = req.body.telephone;
  const data = {
    'telephone': encodeURIComponent(valueTel)
  };
  let options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(data)
  };

  await fetch(`${req.protocol}://${req.get('host')}/api/player`, options)
    .then(response => response.json())
    .then(async (d) => {
      if (d === 'Not found') {
        res.status(404).send('Joueur non trouvé');
      } else {
        await res.render('index', { title: 'INSA Challenge', namePlayer: d._id });
        res.end();
      }
    })
    .catch(error => console.log('Error while loading document ' + error));
});

module.exports = router;
