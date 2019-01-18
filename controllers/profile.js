var db = require('../models');
var express = require('express');
var methodOverride = require('method-override');
var router = express.Router();
var loggedIn = require('../middleware/loggedIn');
// var mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
// var geocodingClient = mbxGeocoding({accessToken: process.env.geocodeToken});


router.use(methodOverride('_method'));

// GET all user's places >> include geocode map here
router.get('/', loggedIn, (req, res) => {
	db.user.findOne({
		where: {id: req.user.id},
		include: [db.place]
	})
	.then((user) => {
		console.log(user.places.length)
		res.render('profile', {allPlaces: user.places});
	})
	.catch((err) => {
		console.log(err);
		res.render('error');			
	});
});



// GET show route for 1 user's saved place, points of interests associated & notes. 
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


// POST show route for notes functionality/association with place.
// router.post('/:id', (req, res) => {

// })


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


// Delete route for points of interest from places. >>>fix this deleting, it currently deletes the entire place from me.
router.delete('/show/:id', (req, res) => {
	db.poi.destroy({
		where: {id: req.params.id},
		// include: [db.place, db.user]
	})
	.then((deletedPoi) => {
		res.redirect('/profile/'+ place.id)
	})
	.catch((err) => {
		console.log('error deleting point of interest from place')
	})
})



module.exports = router;
