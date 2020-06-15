var express = require('express');

var db = require('../db');
var controller = require('../Controller/cart.controller');
var router = express.Router();

router.get('/add/:productId', controller.addToCart);

module.exports = router;