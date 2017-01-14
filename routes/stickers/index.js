var express = require('express');
var router = express.Router();

var webPush = require('web-push');
var Sticker = require('../../models').Stickers;

webPush.setGCMAPIKey(process.env.GCM_API_KEY);

var allowOrigins = ['https://mid0111.github.io', 'http://localhost:4000'];

router.use((req, res, next) => {
  if(allowOrigins.includes(req.headers.origin)) {
    res.header("Access-Control-Allow-Origin", req.headers.origin);
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  }
  next();
});

router.post('/register', (req, res) => {
  Sticker.create({
    id: req.body.endpoint,
    key: req.body.key,
    auth: req.body.auth
  })
    .then((result) => {
      res.status(201).json({
        result: result.get()
      });
    })
    .catch((err) => {
      console.error('Failed to regist endpoint.', err);
      res.status(500).json({
        message: err.message
      });
    });
});

router.post('/sendNotification', (req, res) => {

  if(req.headers.authorization !== `Bearer ${process.env.TOKEN}`) {
    res.sendStatus(401);
    return;
  }

  var message = req.body.message || '新しいスタンプが追加されました';
  var data = {
    title: 'Stickers by mid0111',
    message: message
  };

  Sticker.findAll()
    .then((stickers) => {
      return Promise.all[
        stickers.map((sticker) => {
          return sendNotification({
            endpoint: sticker.get('id'),
            key: sticker.get('key'),
            auth: sticker.get('auth')
          });
        })
      ];
    })
    .then(() => res.sendStatus(201))
    .catch((err) => {
      console.error(`Failed to send notification.`, err);
      res.status(500).json({
        message: err.message
      });
    });


  function sendNotification(option) {
    return webPush.sendNotification({
      endpoint: option.endpoint,
      keys: {
        auth: option.auth,
        p256dh: option.key
      }
    }, JSON.stringify(data));
  }
});

module.exports = router;
