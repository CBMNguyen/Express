var db = require('../db');

module.exports.addToCart = function(req, res, next){
	var productId = req.params.productId;
	var sessionID = req.signedCookies.sessionID;
	if(!sessionID){
		res.redirect('/product');
		return;
	}

	var count = 
	db.get('sessions')
	.find({id: sessionID})
	.get('cart.' + productId, 0)
	.value();

	db.get('sessions')
	.find({id: sessionID})
	.set('cart.' + productId, count + 1)
	.write();
	
	res.redirect('/product');
}