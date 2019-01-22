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
	res.render('search-results', { placeDetails: '', photos: [], placeId: '' });
})

// GET results from API; location results - display photos and 50 attractions to add.
router.get('/results', loggedIn, (req, res) => {
	if (req.body) { 
		var placeUrl = 'https://maps.googleapis.com/maps/api/place/autocomplete/json?input='+req.query.search+'&types=geocode&political&key='+process.env.googleKey;
		request(placeUrl, (err, response, placeBody) => {
		 	var placeDetails = JSON.parse(placeBody).predictions[0];
		 	var placeDetailsId = placeDetails.place_id;
		 	var placeIdUrl = 'https://maps.googleapis.com/maps/api/place/details/json?placeid='+placeDetailsId+'&key='+process.env.googleKey;
		 	request(placeIdUrl, (err, response, body) => {
		 		var latLng = JSON.parse(body).result.geometry.location;
		 		var photosArr = JSON.parse(body).result.photos || [];
		 		var photoRefArr = photosArr.map(ref => ref.photo_reference);
				client.search({
					term: 'things to do',
					location: req.query.search,
					limit: 50,
					sort_by: 'rating'
				})
				.then((data) => {
					db.place.findOne({
						where: {description: placeDetails.description}
					})
					.then((place) => {
						var results = data.jsonBody.businesses;
						res.render('search-results', { placeDetails: placeDetails, latLng: latLng, photos: photosArr, results: results, place: place });
					})
					.catch((err) => {
						console.log('error getting place API info');
						res.render('error');
					})
				})
				.catch((err) => {
					console.log(err);
					res.send('Enter a valid search.');
				});
			});
		});
	} else {
		res.render('error');
	};
});

// POST route to add place to a user's profile. 
router.post('/add', (req, res) => {
	db.place.findOrCreate({
		where: {
			description: req.body.description,
			lng: req.body.lng,
			lat: req.body.lat
		},
		defaults: {image: req.body.image}
	})
	.spread((place, created) => {
		db.user.findOne({
			where: {id: req.body.userId}
		})
		.then((user) => {
			place.addUser(user)
			.then((user) => {
				res.redirect('/search/results?search='+place.description.toLowerCase());
			})
			.catch((err) => {
				console.log('problem adding association: ', err);
				res.render('error')
			})
		})
		.catch((err) => {
			console.log(err);
			res.render('error')
		})
	})
	.catch((err) => {
		console.log(err);
		res.send('error: on main place');
	});
});		

// POST route to add points of interest to place.
router.post('/add-poi', (req, res) => {
	db.placeUser.findOne({
		where: {userId: req.user.id}
	})
	.then((placeUser) => {
		db.poi.findOrCreate({
			where: {
				name: req.body.name,
				categories: req.body.categories,
				image: req.body.image,
				rating: req.body.rating,
				url: req.body.url,
				numReviews: req.body.numReviews,
				placeId: req.body.placeId
			}		
		})
		.spread((poi, created) => {
			console.log('association happened for poi to placeUser');		
		})
		.catch((err) => {
			console.log(err);
			res.render('error');
		})
	})
	.catch((err) => {
		console.log(err);
		res.render('error');
	});
 });
	


module.exports = router;