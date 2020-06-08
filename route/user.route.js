var express = require('express');
var short_id = require('shortid');
var controller = require('../Controller/user.controller');
var validate = require('../validate/user.validate');

var router = express.Router();

router.get('/', controller.index);

router.get('/search', controller.search);

router.get('/create', controller.create);

router.get('/:id', controller.get);
router.post('/create',validate.postCreate ,controller.postcreate);

module.exports = router;