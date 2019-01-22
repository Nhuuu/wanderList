var express = require('express');
var passport = require('../config/passportConfig');
var router = express.Router();
var db = require('../models');

router.get('/login', (req, res) => {
	res.render('auth/login');
});


router.post('/login', passport.authenticate('local', {
	successRedirect: '/profile',
	failureRedirect: '/auth/login',
	failureFlash: 'Invalid Credentials'
}));


// ROUTE to display signup page
router.get('/signup', (req, res) => {
	res.render('auth/signup', { previousData: null });
});


// POST route to sign up and create users
router.post('/signup', (req, res, next) => {
	if (req.body.password != req.body.passwordV){
		req.flash('error', 'Passwords must match!');
		res.render('auth/signup', { previousData: req.body, alerts: req.flash() }); 
	} else {
		db.user.findOrCreate({
			where: { email: req.body.email },
			defaults: req.body
		})
		.spread((user, created) => { 
			if(created){
				passport.authenticate('local', {
					successRedirect: '/profile',
					failureRedirect: '/auth/login',
					failureFlash: 'Invalid Credentials'
				})(req, res, next);
			}
			else {
				req.flash('error', 'Email already in use!');
				res.render('auth/signup', { previousData: req.body, alerts: req.flash() });
			}
		})
		.catch((err) => {
			if(err && err.errors){
				err.errors.forEach((e) => {
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
	res.redirect('/');
});




module.exports = router;