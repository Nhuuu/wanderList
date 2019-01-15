var express = require('express');
var router = express.Router();

// Include ref to middleware > loggedIn.js
var loggedIn = require('../middleware/loggedIn');




// POST route for new places on the profile page and db. Find or create a place. See geocode example.
// Coming from search page. 
router.post('/add', (req, res) => {

})


// GET all user's places, img, city, country
router.get('/', loggedIn, (req, res) => {
	res.render('profile');
});

router.post('/', (req, res) => {
	// db.places.findAll()
	// .then((myPlaces) => {

	// })
})


// GET show route
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
