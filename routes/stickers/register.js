var express = require('express');
var router = express.Router();

var Sticker = require('../../models').Stickers;

var allowOrigins = ['https://mid0111.github.io', 'http://localhost:4000'];

router.use((req, res, next) => {
  if(allowOrigins.includes(req.headers.origin)) {
    res.header("Access-Control-Allow-Origin", req.headers.origin);
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  }
  next();
});

router.post('/', (req, res) => {
  var id = req.body.endpoint;
  Sticker.findById(id)
    .then((result) => {
      if(result) {
        return Sticker.updateDate(id)
          .then(() => {
            // The device already be registered.
            var err = new Error('Already registered.');
            err.statusCode = 200;
            throw err;
          });
      }
    })
    .then(() => Sticker.create({
      id: id,
      key: req.body.key,
      auth: req.body.auth
    }))
    .then((result) => {
      res.status(201).json({
        result: result.get()
      });
    })
    .catch((err) => {
      if(err.statusCode && err.statusCode >= 400) {
        console.error('Failed to regist endpoint.', err);
      }
      res.status(err.statusCode || 500)
        .json({
          message: err.message
        });
    });
});

module.exports = router;
