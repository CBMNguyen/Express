var db = require('../db');

module.exports.product = function(req, res){
	var page = parseInt(req.query.page) || 1;
	var perPage = 8;

	var start = (page - 1) * perPage;
	var end = page * perPage;

	var pagePrevious;
		if(page === 1){
			pagePrevious =1;
		}else{
			pagePrevious = page - 1;
		}
		
	var pageNext = page + 1;

	res.render('products/product',{
		// C1 products: db.get('products').value().slice(start, end),
		products: db.get('products').drop(start).take(perPage).value(),
		page: page,
		pagePrevious: pagePrevious,
		pageNext: pageNext
	});
}