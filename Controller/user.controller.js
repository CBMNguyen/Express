var db = require('../db');
var short_id = require('shortid');
module.exports.index = function(req, res){
	res.render('users/index',{
		users: db.get('users').value()
	});
}

module.exports.search = function(req, res){
	var q = req.query.q;
	var mathchedUser = db.get('users').value().filter(function(user){
		return user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
	});
	res.render('users/index', {
		users: mathchedUser
	});
}

module.exports.create = function(req, res){
	res.render('users/create');
}

module.exports.get  = function(req, res){
	var id = req.params.id;
	var user = db.get('users').find({ id: id}).value();
	res.render('users/view',{
		user: user
	});
}

module.exports.postcreate = function(req, res){
	req.body.id = short_id.generate();
	var errors = [];
	if(!req.body.name){
		errors.push('Name is require.')
	}

	if(!req.body.phone){
		errors.push('Phone is require.')	
	}

	if(errors.length){
		res.render('users/create',{
			errors: errors,
			values: req.body
		})
		return;
	}

	db.get('users').push(req.body).write()
	res.redirect('/users');
}