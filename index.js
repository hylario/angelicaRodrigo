['log'].forEach(a=>{let b=console[a];console[a]=(...c)=>{try{throw new Error}catch(d){b.apply(console,[d.stack.split('\n')[2].trim().substring(3).replace(__dirname,'').replace(/\s\(./,' at ').replace(/\)/,''),'\n	',...c])}}});

const PORT = process.env.PORT || 5000;

var express = require('express');  
var app = express();  
var server = require('http').createServer(app); 
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');

var User = require('./models/user');

var config = {
	secret: 'AIOogjw89(*En9gfwy8ge9'
}

mongoose.connect('mongodb://rohsobrinho:angelicarodrigo@ds115219.mlab.com:15219/angelica-rodrigo');

app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.post('/signup', function(req, res, err){

	if (!req.body.name || !req.body.email || !req.body.userID) {
		res.json({success: false, message: 'Erro ao entrar.'});
	}else{

		User.findOne({email: req.body.email})
			.then(user => {
				if(!user){

					let user = new User(req.body);

					user.save(err => {
						if(err) res.json({success: false, message: 'Erro ao salvar user.'});

						let token = jwt.sign(user.toObject(), config.secret);

						res.json({success: true, token, user});
					});
				}else{

					let token = jwt.sign(user.toObject(), config.secret);

					res.json({success: true, token, user});
				}
			})
			.catch(err => {
				console.log(err);
				res.json({success: false, message: 'Erro ao entrar.'});
			})
		;
	}
});

server.listen(PORT, () => {
	console.log(`Server running on ${PORT}`);
});