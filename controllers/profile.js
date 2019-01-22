var db = require('../models');
var express = require('express');
var methodOverride = require('method-override');
var router = express.Router();
var loggedIn = require('../middleware/loggedIn');

router.use(methodOverride('_method'));


router.get('/', loggedIn, (req, res) => {
	db.user.findOne({
		where: {id: req.user.id},
	})
	.then((user) => {
		res.render('profile', {user: user});
	})
	.catch((err) => {
		console.log(err);
		res.render('error');			
	});
});


// GET edit route
router.get('/edit', (req, res) => {
	res.render('edit');
})


// Edit profile route
router.put('/edit/:id', (req, res) => {
	db.user.update({
		email: req.body.email,
		image: req.body.image,
		bio: req.body.bio
	}, {
		where: {id: req.user.id}		
	})
	.then(() => {
	res.redirect('/profile');
	})
	.catch((err) => {
		console.log(err);
		res.render('error')
	})
});



module.exports = router;