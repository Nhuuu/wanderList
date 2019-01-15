var express = require('express');
var router = express.Router();

// Include ref to middleware > loggedIn.js
var loggedIn = require('../middleware/loggedIn');


// GET all user's places, img, city, country
router.get('/', loggedIn, (req, res) => {
	// db.places.findAll()
	// .then((myPlaces) => {

	// })	
	res.render('profile');
});



module.exports = router;
