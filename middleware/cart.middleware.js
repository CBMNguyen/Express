var short_id = require('shortid');

var db = require('../db');

module.exports = function(req, res, next){
	var sessionID = short_id.generate();
	if(!req.signedCookies.sessionID){
		res.cookie('sessionID', sessionID,{
			signed: true
		});	

		db.get('sessions').push({
			id: sessionID
		}).write();
	}

	next();
}