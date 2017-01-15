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

module.exports = router;
