var express = require('express');
var router = express.Router();

var webPush = require('web-push');
var Sticker = require('../../models').Stickers;

webPush.setGCMAPIKey(process.env.GCM_API_KEY);

router.use('/register', require('./register'));
router.use('/sendNotification', require('./sendNotification'));

module.exports = router;
