var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
	name: {type: String},
	email: {type: String, required: true, unique: true},
	picture: {
		data: {
			height: {type: Number},
			width: {type: Number},
			url: {type: String}
		}
	},
	id: {type: String},
	accessToken: {type: String},
	userID: {type: String},
	expiresIn: {type: Number},
	signedRequest: {type: String}
});

module.exports = mongoose.model('User', UserSchema);