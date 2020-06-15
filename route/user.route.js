var express = require('express');
var multer = require('multer');

var controller = require('../Controller/user.controller');
var validate = require('../validate/user.validate');
var authMiddleware = require('../middleware/auth.middleware')

var router = express.Router();
var upload = multer({ dest: './public/uploads/' });

router.get('/', controller.index);

router.get('/search', controller.search);

router.get('/create', controller.create);

router.get('/:id', controller.get);

router.post('/create', upload.single('avatar'),
	validate.postCreate
	,controller.postcreate
	);

module.exports = router;