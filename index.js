var express = require('express');
var bodyParser = require('body-parser');
var short_id = require('shortid');

var userRoute = require('./route/user.route');

var app = express();

app.set('view engine', 'pug');
app.set('views', './views');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extented: true}));

app.use(express.static('public'));

var port = 8080;
// var users= [
// 			{id: 1, name: 'Hieu'},
// 			{id: 2, name: 'Linh'},
// 			{id: 3, name: 'Toan'},
// 			{id: 4, name: 'Toi'},
// 			{id: 5, name: 'Tri'},
// 			{id: 5, name: 'Web'}
// 		]

app.get('/', function(req, res){
	res.send('Welcome Back!<a href = "/users">Users</a>');
});

app.use('/users', userRoute);

app.listen(port, function(){
	console.log('Server listenning on port '+ port);
});
