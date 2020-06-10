var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
require('dotenv').config();
var short_id = require('shortid');

var userRoute = require('./route/user.route');
var authRoute = require('./route/auth.route');
var productRoute = require('./route/product.route');

var authMiddleware = require('./middleware/auth.middleware');

var app = express();

app.set('view engine', 'pug');
app.set('views', './views');

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({extented: true}));

app.use(cookieParser(process.env.SESSION_SECRET));

app.use('/users',authMiddleware.requireAuth ,userRoute);

app.use('/product', productRoute);

app.use('/auth', authRoute);

app.use(express.static('public'));

var port = 8080;

app.get('/', function(req, res){
	res.send('Welcome Back!<a href = "/users">Users</a>');
});

app.listen(port, function(){
	console.log('Server listenning on port '+ port);
});
