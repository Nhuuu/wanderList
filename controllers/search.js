require('dotenv').config();
var db = require('../models')
var express = require('express');
var request = require('request');
var router = express.Router();
var yelp = require('yelp-fusion');
var client = yelp.client(process.env.yelpKey);
// var loggedIn = require('../middleware/loggedIn');


// GET search route
router.get('/', (req, res) => {
	res.render('search-results', { place: '', photos: [] });
})

// POST search route, get location results - display photo and 20 attractions to add.
router.post('/', (req, res) => {
	var placeUrl = 'https://maps.googleapis.com/maps/api/place/autocomplete/json?input='+req.body.search+'&types=geocode&political&key='+process.env.googleKey;
	request(placeUrl, (err, response, body) => {
	 	var place = JSON.parse(body).predictions[0];
	 	// console.log(place);
	 	var placeId = place.place_id;
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
				res.render('search-results', { place: place, latLng: latLng, photos: photosArr, results: results });
			})
			.catch((err) => {
				console.log(err);
				res.render('error');
			})
		});
	});
});




module.exports = router;