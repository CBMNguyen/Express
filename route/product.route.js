var express = require('express');
var controller = require('../Controller/products.controller');
var router = express.Router();

router.get('/', controller.product);

module.exports = router;