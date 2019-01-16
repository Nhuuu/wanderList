var express = require('express');
var router = express.Router();

// Include ref to middleware > loggedIn.js
var loggedIn = require('../middleware/loggedIn');




// POST route to add a place to a user's profile. Redirect to search-results. 
// Need to make association with place/user.
router.post('/add', (req, res) => {
	db.place.findOrCreate({
		where: {}
	})
})

// GET all user's places, img, city, country. db.placeUser.findAll()
// Show image, city, country, current weather. 
// Stretch goal, include Mapbox & markers.
router.get('/', loggedIn, (req, res) => {
	res.render('profile');
});



// GET show route for 1 user's place and add notes functionality/association with place.
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
