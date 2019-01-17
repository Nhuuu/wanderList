require('dotenv').config();
var db = require('../models')
var express = require('express');
var request = require('request');
var router = express.Router();
var yelp = require('yelp-fusion');
var client = yelp.client(process.env.yelpKey);

var loggedIn = require('../middleware/loggedIn');


// GET search route
router.get('/', loggedIn, (req, res) => {
	res.render('search-results', { placeDetails: '', photos: [] });
})

// POST search route, get location results - display photo and 20 attractions to add.
router.post('/', loggedIn, (req, res) => {
	var placeUrl = 'https://maps.googleapis.com/maps/api/place/autocomplete/json?input='+req.body.search+'&types=geocode&political&key='+process.env.googleKey;
	request(placeUrl, (err, response, body) => {
	 	var placeDetails = JSON.parse(body).predictions[0];
	 	// console.log(place);
	 	var placeId = placeDetails.place_id;
	 	var placeIdUrl = 'https://maps.googleapis.com/maps/api/place/details/json?placeid='+placeId+'&key='+process.env.googleKey;
	 	request(placeIdUrl, (err, response, body) => {
	 		var latLng = JSON.parse(body).result.geometry.location;
	 		var photosArr = JSON.parse(body).result.photos || [];
	 		var photoRefArr = photosArr.map(ref => ref.photo_reference);
			client.search({
				term: 'things to do',
				location: req.body.search,
				limit: 20,
				sort_by: 'rating'
			})
			.then((data) => {
				var results = data.jsonBody.businesses;
				res.render('search-results', { placeDetails: placeDetails, latLng: latLng, photos: photosArr, results: results });
			})
			.catch((err) => {
				console.log(err);
				res.render('error');
			})
		});
	});
});

// POST route to add a place to a user's profile. 
router.post('/add', (req, res) => {
	db.place.findOrCreate({
		where: {
			description: req.body.description,
			lng: req.body.lng,
			lat: req.body.lat
		},
		defaults: req.body
	})
	.spread((place, created) => {
		db.user.findOne({
			where: { id: req.body.userId }
		})
		.then((user) => {
			place.addUser(user)
			.then((user) => {
				console.log('association happened for user to place');
			})
			.catch((err) => {
				console.log('problem adding association: ', err);
			})
		})
		.catch((err) => {
			console.log(err);
		})
		res.send('success for place')
	})
	.catch((err) => {
		console.log(err);
		res.send('error');
	});
});		

// POST route to add attractions and then redirect. need to create
router.post('/add-poi', (req, res) => {
	db.poi.findOrCreate({
		where: {
			name: req.body.name,
			categories: req.body.categories,
			image: req.body.image,
			rating: req.body.rating,
			url: req.body.url,
			placeId: req.body.placeId
		}
	})
	.spread((poi, created) => {
		db.place.findOne()
		.then(() => {})
		.catch((err) => {
			console.log(err);
		})
		res.send('success for point of interest')
	})
	.catch((err) => {
		console.log(err)
	})
});





module.exports = router;