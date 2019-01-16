var express = require('express');
var passport = require('../config/passportConfig');
var router = express.Router();
var db = require('../models');

router.get('/login', (req, res) => {
	res.render('auth/login');
});


router.post('/login', passport.authenticate('local', {
	successRedirect: '/profile',
	successFlash: 'Yay, login successful!',
	failureRedirect: '/auth/login',
	failureFlash: 'Invalid Credentials'
}));


// ROUTE to display signup page
router.get('/signup', (req, res) => {
	res.render('auth/signup', { previousData: null });
});


// POST route to sign up and create users
router.post('/signup', (req, res) => {
	if (req.body.password != req.body.passwordV){
		req.flash('error', 'Passwords must match!');
		res.render('auth/signup', { previousData: req.body, alerts: req.flash() }); 
	} else {
		db.user.findOrCreate({
			where: { username: req.body.username },
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
	req.logout();
	req.flash('success', 'Come back again!');
	res.redirect('/');
});




module.exports = router;