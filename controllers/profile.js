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
	db.place.findAll()
	.then((allPlaces) => {
		db.user.findOne({
			where: {id: req.body.id}
		})
		.then((user) => {
			res.render('profile', {allPlaces: allPlaces});
		})
		.catch((err) => {
			console.log(err);
			res.render('error');			
		})
	})
	.catch((err) => {
		console.log(err);
		res.render('error');
	})
});



// GET show route for 1 user's place, points of interests associated + notes.
router.get('/show/:id', (req, res) => {
	db.place.find({
		where: {id: req.params.id}
	})
	.then((place) =>{
		if(!place) throw Error();
		res.render('show', { place: place })
	})
	.catch((err) =>{
		res.render('error')
		console.log(err)
	})
})


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


// Delete route for attractions from places
// router.delete('/association', (req, res) => {
// 	db.poiPlace.destroy({
// 		where: {
// 			placeId: req.body.placeId,
// 			attractionId: req.body.attractionId
// 		}
// 	})
// 	.then((deletedAssociation) => {
// 		// res.redirect('/')
// 		console.log(deletedAssociation)
// 	})
// }



module.exports = router;
