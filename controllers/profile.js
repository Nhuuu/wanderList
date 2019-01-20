var db = require('../models');
var express = require('express');
var methodOverride = require('method-override');
var router = express.Router();
var loggedIn = require('../middleware/loggedIn');
var mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
var geocodingClient = mbxGeocoding({accessToken: process.env.geocodeToken});


router.use(methodOverride('_method'));

// GET all user's places >> include geocode map here
router.get('/', loggedIn, (req, res) => {
	db.user.findOne({
		where: {id: req.user.id},
		include: [db.place]
	})
	.then((user) => {
		res.render('profile', {allPlaces: user.places});
	})
	.catch((err) => {
		console.log(err);
		res.render('error');			
	});
});



// GET show route for 1 user's saved place, points of interests associated.
router.get('/show/:id', loggedIn, (req, res) => {
	db.place.findOne({
		where: {id: req.params.id}
	})
	.then((place) =>{
		if(!place) throw Error();
		db.poi.findAll({
			where: {placeId: req.params.id}
		})
		.then((poi) => {
			res.render('show', { place: place, poi: poi })
		})
		.catch((err) => {
			res.send('error at adding pois to show')
		})
	}) 
	.catch((err) =>{
		res.render('error')
		console.log(err)
	});
});


// Delete route for points of interest from places.
router.delete('/delete-poi/:id', (req, res) => {
	db.poi.destroy({
		where: {id: req.params.id}
	})
	.then((deletedPoi) => {
		res.redirect('/profile/show/'+ req.body.placeId)
	})
	.catch((err) => {
		console.log('error deleting point of interest from place')
	})
})

// Delete route for places.
router.delete('/:id', (req, res) => {
	db.place.destroy({
		where: {id: req.params.id}
	})
	.then((deletedPlace) => {
		db.placeUser.destroy({
			where: {placeId: req.params.id}
		})
		.then((deletedAssociation) => {
			res.redirect('/profile');
		})
	})
})





module.exports = router;
