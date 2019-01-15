require('dotenv').config();
var db = require('../models')
var express = require('express');
var request = require('request');
var router = express.Router();
var yelp = require('yelp-fusion');
var client = yelp.client('yelpKey');
var loggedIn = require('../middleware/loggedIn');



router.get('/', loggedIn, (req, res) => {
	res.render('search-results');
})

// POST search route, get query inputs from search region and display photo. Fix input somehow.
router.post('/', (req, res) => {
 var placeUrl = 'https://maps.googleapis.com/maps/api/place/autocomplete/json?input='+ req.body.search + '&types=(regions)&key='+ process.env.googleKey;
 request(placeUrl, (err, response, body) => {
 	var place = JSON.parse(body).predictions[0];
 	// var placeId = place.place_id;
 	// var placeIdUrl = 'https://maps.googleapis.com/maps/api/place/details/json?placeid='+ placeId + '&key=' + process.env.googleKey;
 	// request(placeIdUrl, (err, response, body) => {
 	// 	var getPhotos = JSON.parse(body).result.photos;
 		console.log(place);
 		res.render('search-results', { place: place })
 	});
 });
// });


// GET route for attractions



module.exports = router;