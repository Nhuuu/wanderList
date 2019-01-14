var express = require('express');
var passport = require('../config/passportConfig');
var router = express.Router();
var db = require('../models');

router.get('/login', (req, res) => {
	res.render('auth/login');
});

// LOOK into this one more
router.post('/login', passport.authenticate('local', {
	successRedirect: '/profile',
	successFlash: 'Yay, login successful!',
	failureRedirect: '/auth/login',
	failureFlash: 'Invalid Credentials'
}));


// ROUTE to display signup page. PreviousData: was added on all signup renders.
router.get('/signup', (req, res) => {
	res.render('auth/signup', { previousData: null });
});


// POST route to sign up and create users
router.post('/signup', (req, res) => {
	if (req.body.password != req.body.passwordV){
		// flash type error, msg
		req.flash('error', 'Passwords must match!');
		// render page they were just on. Need to call alerts > flash(error/success) to use in alerts.ejs. Or it will auto flash on redirect/refresh not on rendering.
		res.render('auth/signup', { previousData: req.body, alerts: req.flash() }); 
	} else {
		// console.log(req.body);
		db.user.findOrCreate({
			where: { username: req.body.username },
			// where username, create with req.body
			defaults: req.body
		})
		.spread((user, created) => {
			if(created){
				req.flash('success', 'Yay! Good job! You signed up!');
				res.redirect('/profile');
			}
			else {
				req.flash('error', 'Username already in use!');
				res.render('auth/signup', { previousData: req.body, alerts: req.flash() });
			}
		})
		.catch((err) => {
			// Sequelize errors is an array with type (different types of errors) and message. 
			// Using type validation error because we set validations on the user for pw...etc.
			if(err && err.errors){
				console.log(err.errors)
				err.errors.forEach((e) => {
					console.log(e);
					if(e.type == 'Validation error'){
						req.flash('error', 'Validation Error: ', e.message);
					}
					else {
						console.log('Error (not validation)', e);
					}
				})
			}
			res.render('auth/signup', { previousData: req.body, alerts: req.flash() });
		});
	}
});

router.get('/logout', (req, res) => {
	req.logout(); // logs me out of the session, inherent in passport
	req.flash('success', 'Come back again!');
	res.redirect('/');
});




module.exports = router;