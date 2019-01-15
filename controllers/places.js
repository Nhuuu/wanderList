require('dotenv').config();
var db = require('../models')
var express = require('express');
var request = require('request');
var router = express.Router();
var yelp = require('yelp-fusion');
var client = yelp.client(yelpKey);
// var methodOverride = require('method-override');

router.use(methodOverride('_method'));

// POST route for new places on the profile page and db. Find or create a place. See geocode example.
// Coming from search page. 
router.post('/add', (req, res) => {

})


// GET all user's places, img, city, country
router.get('/profile', (req, res) => {
	// db.places.findAll()
	// .then((myPlaces) => {

	// })
})


// Delete route for places.
// router.delete('/profile/:id', (req, res) => {
// 	db.place.destroy({
// 		where: {id: req.params.id}
// 	})
// 	.then((deletedPlace) => {
// 		db.placeUser.destroy({
// 			where: {cityId: req.params.id}
// 		})
// 		.then((deletedAssociation) => {
// 			res.redirect('/profile');
// 		})
// 	})
// })


// Delete route for attractions from places
// router.delete('/association', (req, res) => {
// 	db.attractionPlace.destroy({
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




// GET search route, get query inputs from search region and display photo.
router.get('/search', (req, res) => {
 res.send('searching...');
 var placesUrl = 'https://maps.googleapis.com/maps/api/place/autocomplete/json?input='+ req.body.search + '&offset=3&types=(regions)&key=googleKey';
 var attractionsUrl = ''
 request(placesUrl, (err, response, body){
 	var place = JSON.parse(body);
 	res.render('search', { place: place })
 });
});


// GET show route
// router.get('/profile/:id', (req, res) => {
// 	db.place.find({
// 		where: {id: req.params.id}
// 	})
// 	.then((place) =>{
// 		if(!place) throw Error();
// 		res.render('show', { place: place })
// 	})
// 	.catch((err) =>{
// 		res.render('error')
// 		console.log(err)
// 	})
// })




module.exports = router;