var express = require('express');

var db = require('../db');
var controller = require('../Controller/transfer.controller');
var router = express.Router();

router.get('/create', controller.create);

router.post('/create', controller.postCreate);

module.exports = router;