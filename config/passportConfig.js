var passport = require('passport');
// Class object to call a new function on 
var LocalStrategy = require('passport-local').Strategy;

var db = require('../models');

// Provide serialize/deserialize functions so we can store user in session
// Callback generally also called done; first arg is reserved for an error obj, sec arg reserved for successful response data
// Once passport has user information.
passport.serializeUser((user, callback) => {
	// callback(errorMsg, userData)
	callback(null, user.id)
});

passport.deserializeUser((id, callback) => {
	db.user.findByPk(id)
	.then(user => {
		callback(null, user) // user that you found
	})
	.catch(err => {
		callback(err, null); // null is optional here, just to make clear there is no user info
	})
});

// Do the actual logging in (authentication)
passport.use(new LocalStrategy({
	usernameField: 'username',
	passwordField: 'password'
}, (username, password, callback) => {
	db.user.findOne({
		where: { username: username }
	})
	.then(foundUser => {
		// If no valid user is found or the user's pw once hashed doesn't match the user in the db ? good : bad
		if(!foundUser || !foundUser.validPassword(password)){
			// bad, set first arg to 'bad credentials' & it does a res.send, now it correctly uses authenticate in auth.js
			callback(null, null);
		}
		else {
			// good
			callback(null, foundUser);
		}
	})
	.catch(callback); //.catch(err => { callback(err, null) })
}));



// Make sure I can include this module in other pages
module.exports = passport;