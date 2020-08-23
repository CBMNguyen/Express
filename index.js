var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
require('dotenv').config();
var short_id = require('shortid');
var csurf = require('csurf')

var userRoute = require('./route/user.route');
var authRoute = require('./route/auth.route');
var productRoute = require('./route/product.route');
var cartRoute = require('./route/cart.route');
var transferRoute = require('./route/transfer.route')

var authMiddleware = require('./middleware/auth.middleware');
var cartMiddleware = require('./middleware/cart.middleware');

var app = express();
var port = process.env.Port || 3000;

app.set('view engine', 'pug');
app.set('views', './views');


app.use(bodyParser.json());


app.use(bodyParser.urlencoded({extented: true}));

app.use(cookieParser(process.env.SESSION_SECRET));

app.use('/users',authMiddleware.requireAuth ,userRoute);

app.use('/transfer',csurf({cookie: true}), transferRoute);

app.use('/product',cartMiddleware, productRoute);

app.use('/cart', cartRoute);

app.use('/auth', authRoute);



app.use(express.static('public'));

app.get('/', function(req, res){
	res.send('Welcome Back!<a href = "/users">Users</a>');
});

app.listen(port, function(){
	console.log('Server listenning on port '+ port);
});
