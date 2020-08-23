var db = require('../db');
module.exports.requireAuth = function(req, res, next){
	if(!req.signedCookies.userId){
		res.redirect('auth/login');
		return;
	}

	var user = db.get('users').find({id: req.signedCookies.userId}).value()

	if(!user){
		res.redirect('/auth/login');
		return;
	}
	res.locals.user=user;
	var sessionID = req.signedCookies.sessionID;
	res.locals.count = db.get("sessions").find({ id: sessionID }).get("cart").size().value();
	next();
};