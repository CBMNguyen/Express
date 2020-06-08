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

	if(user.password !== password){
		res.render('auth/login', {
			errors: [
			'Wrong password.'
			],
			values: req.body
		});
		return;
	}
	res.cookie('userId', user.id);
	res.redirect('/users');
	next();
}