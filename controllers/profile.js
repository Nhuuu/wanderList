var db = require('../models');
var express = require('express');
var router = express.Router();

// Include ref to middleware > loggedIn.js
var loggedIn = require('../middleware/loggedIn');



// GET all user's places 
// Stretch goal, include Mapbox & markers.
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



// GET show route for 1 user's place
// router.get('/:id', (req, res) => {
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


// POST show route for notes functionality/association with place.
// router.post('/:id', (req, res) => {

// })


// Delete route for places.
// router.delete('/:id', (req, res) => {
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



module.exports = router;
