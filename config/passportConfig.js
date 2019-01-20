var passport = require('passport');
// Class object to call a new function on 
var LocalStrategy = require('passport-local').Strategy;

var db = require('../models');

// Provide serialize/deserialize functions so we can store user in session
passport.serializeUser((user, callback) => {
	callback(null, user.id)
});

passport.deserializeUser((id, callback) => {
	db.user.findByPk(id)
	.then(user => {
		callback(null, user)
	})
	.catch(err => {
		callback(err, null); 
	})
});

// Do the actual logging in (authentication)
passport.use(new LocalStrategy({
	usernameField: 'email',
	passwordField: 'password'
}, (email, password, callback) => {
	db.user.findOne({
		where: { email: email }
	})
	.then(foundUser => {
		if(!foundUser || !foundUser.validPassword(password)){
			callback(null, null);
		}
		else {
			callback(null, foundUser);
		}
	})
	.catch(callback);
}));


module.exports = passport;