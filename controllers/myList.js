var db = require('../models');
var express = require('express');
var methodOverride = require('method-override');
var router = express.Router();
var loggedIn = require('../middleware/loggedIn');


router.use(methodOverride('_method'));

// GET all user's places
router.get('/', loggedIn, (req, res) => {
	db.user.findOne({
		where: {id: req.user.id},
		include: [db.place]
	})
	.then((user) => {
		res.render('myList', {allPlaces: user.places});
	})
	.catch((err) => {
		console.log(err);
		res.render('error');			
	});
});


// GET show route for 1 user's saved place, points of interests associated. 
router.get('/show/:idx', loggedIn, (req, res) => {
	db.user.findOne({
		where: {id: req.user.id}
	})
	.then(user => {
		db.place.findOne({
			where: {id: req.params.idx},
		})
		.then((place) =>{
			if(!place) throw Error(); 
			db.poi.findAll({
				where: {
					placeId: req.params.idx,
					userId: req.user.id
				}
			})
			.then((poi) => {
				res.render('show', { place: place, poi: poi })
			})
			.catch((err) => {
				console.log('err finding pois to show', err)
				res.render('error')
			})
		}) 
		.catch((err) =>{
			res.render('error')
			console.log(err)
		})
	})
	.catch(err => {
		console.log(err)
		res.render('error')
	})
});


// Delete route for points of interest from places from user. >>>
router.delete('/delete-poi/:id', (req, res) => {
	db.poi.destroy({
		where: {id: req.params.id}
	})
	.then((deletedPoi) => {
		db.placeUserPoi.destroy({
			where: {
				poiId: req.params.id,
				userId: req.user.id
			}
		})
		res.redirect('/myList/show/'+ req.body.placeId)
	})
	.catch((err) => {
		console.log('error deleting point of interest from place')
	})
})


// Delete route for places.
router.delete('/:id', (req, res) => {
	db.user.findOne({
		where: {id: req.user.id}
	})
	.then(user => {
		db.placeUserPoi.destroy({
			where: {
				placeId: req.params.id,
				userId: req.user.id
			}
		})	
		.then((deletedAssociation) => {
			res.redirect('/myList');
		})
		.catch(err => {
			console.log(err)
			res.render('error')
		})
	})
	.catch(err => {
		console.log(err)
		res.render('error')
	})
})


module.exports = router;
