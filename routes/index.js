var express = require('express');
var router = express.Router();

router.use('/stickers', require('./stickers'));

module.exports = router;
