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
 
db.user.find({where: {id: 1}})
.then((user) => {
	poi.addUser(user)
	.then((user) => {
		console.log('association happened');
		db.place.find({where: {id: 49}
		})
		.then((place) => {
			poi.addPlace(place)
			.then((place) => {
				db.poi.findOrCreate({
					where: {
						name: 'crab',
						categories: 'museum',
						image: 'http://placekitten.com/200/300',
						rating: 1.5,
						url: 'http://placekitten.com/200/300',
						placeId: 1
					}
				})
				.spread((poi, created) => {
					db.place.findOne()
					.then((poi) => {
						console.log('poi success')
					})
					.catch((err) => {
						console.log(err);
					})
				})
				.catch((err) => {
					console.log(err);
				})				
			})
			.catch((err) => {
				console.log(err)
			})
		})
		.catch((err)=> {
			console.log('problem adding association from poi to place')
		})
	})
	.catch((err) => {
		console.log('problem adding association');
	})
})



// create a poi and tie it to the place and user

// db.user.findOne({
// 	where: {id: 6} /// what to use here
// })
// .then((user) => {
// 	db.place.findOne({
// 	where: {id: 49}
// 	})
// 	.then((place) => {
// 		// console.log(place)
// 		db.poi.findOrCreate({
// 			where: {
// 				name: 'gas station',
// 				categories: 'museum',
// 				image: 'http://placekitten.com/200/300',
// 				rating: 1.5,
// 				url: 'http://placekitten.com/200/300',
// 				placeId: 49
// 			}
// 		})
// 		.spread((poi, created) => {
// 			console.log('poi created');
// 		})	
// 		.catch((err) => {
// 			console.log(err, 'error created poi at place');
// 		})	
// 	})
// 	.catch((err) => {
// 		console.log(err, 'error created poi at user');
// 	})	
// })
// .catch((err) => {
// 	console.log(err, 'error finding place');
// });








