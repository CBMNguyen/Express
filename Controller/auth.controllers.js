var md5 = require('md5');
var db = require('../db');
module.exports.login = function(req, res, next){
	res.render('auth/login');
	next();
};

module.exports.postLogin = function(req, res, next){
	var Email = req.body.email;
	var password = req.body.password;

	var user = db.get('users').find({email: Email}).value();
	if(!user){
		res.render('auth/login', {
			errors: [
			'user does not exist.'
			],
			values: req.body
		});
		return;
	}

	var hasdedPassword = md5(password);

	if(user.password !== hasdedPassword){
		res.render('auth/login', {
			errors: [
			'Wrong password.'
			],
			values: req.body
		});
		return;
	}
	res.cookie('userId', user.id,{
		signed: true
	});
	res.redirect('/users');
	next();
}