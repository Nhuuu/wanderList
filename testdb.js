var db = require('./models');


// Create a place
// db.place.findOrCreate({
// 	where: {
// 		description: 'paris',
// 		image: 'http://placekitten.com/200/300',
// 		lng: 30,
// 		lat: -50
// 	}
// })
// .spread((place, created) => {
// 	db.user.find({where: {id: 1}})
// 	.then((user) => {
// 		place.addUser(user)
// 		.then((user) => {
// 			console.log('association happened');
// 		})
// 		.catch((err) => {
// 			console.log('problem adding association');
// 		})
// 	})
// 	.catch((err) => {
// 		console.log(err);
// 	});
// });

// Create an attraction

// db.poi.findOrCreate({
// 	where: {
// 		name: 'hostel',
// 		categories: 'museum',
// 		image: 'http://placekitten.com/200/300',
// 		rating: 1.5,
// 		url: 'http://placekitten.com/200/300',
// 		placeId: 1
// 	}
// })
// .spread((poi, created) => {
// 	db.place.findOne({where: {description: 'paris'}})
// 	.then((place) => {
// 		console.log('success')
// 	})
// 	.catch((err) => {
// 		console.log(err);
// 	});
// });






// create place, tie it to the user, create a poi and tie it to the place in the same go.
// db.user.find({where: {id: 1}})
// .then((user) => {
// 	poi.addUser(user)
// 	.then((user) => {
// 		console.log('association happened');
// 		db.place.find({where: {id: 49}
// 		})
// 		.then((place) => {
// 			poi.addPlace(place)
// 			.then((place) => {
// 				db.poi.findOrCreate({
// 					where: {
// 						name: 'crab',
// 						categories: 'museum',
// 						image: 'http://placekitten.com/200/300',
// 						rating: 1.5,
// 						url: 'http://placekitten.com/200/300',
// 						placeId: 1
// 					}
// 				})
// 				.spread((poi, created) => {
// 					db.place.findOne()
// 					.then((poi) => {
// 						console.log('poi success')
// 					})
// 					.catch((err) => {
// 						console.log(err);
// 					})
// 				})
// 				.catch((err) => {
// 					console.log(err);
// 				})				
// 			})
// 			.catch((err) => {
// 				console.log(err)
// 			})
// 		})
// 		.catch((err)=> {
// 			console.log('problem adding association from poi to place')
// 		})
// 	})
// 	.catch((err) => {
// 		console.log('problem adding association');
// 	})
// })

db.poi.findOrCreate({
	where: {
		name: 'hostel',
		categories: 'market',
		image: 'http://placekitten.com/200/300',
		rating: 5,
		url: 'http://placekitten.com/200/300',
		numReviews: 100,
		placeId: 51
	}
})
.spread((poi, created) => {
	db.placeUser.findOne({
		where: {userId: 1}
	})
	.then((placeUser) => {
		poi.addPlaceUser(placeUser)
		.then((placeUser) => {
			console.log('association happened for poi to placeUser')
		})
		.catch((err) => {
			console.log(err)
		})
	})
	.catch((err) => {
		console.log(err)
	})		
})
.catch((err) => {
	console.log(err)
});







