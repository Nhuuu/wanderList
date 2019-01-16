var db = require('./models');


// // Create a movie in the models/movie.js file.
// db.movie.create({
// 	title: 'Die Hard',
// 	year: '1988',
// 	genre: 'Christmas',
// 	runtime: 110,
// 	tagline: 'Yippee Kai-ye...'
// })
// // Promises, sequelize commands that does all of the sql for you in the background.
// .then((createdMovie) => {
// 	console.log('Created movie: ', createdMovie.title);
// })
// .catch((err) => {
// 	console.log('Error: ', err)
// })

// Create a user
// db.user.create({
// 	firstname: 'Nhu',
// 	lastname: 'Trinh',
// 	email: 'nhu@nhu.com',
// 	password: 'nhuuuuuu',
// 	username: 'nhu',
// 	dob: new Date('03/19/1987'),
// 	bio: 'I am me.',
// 	image: 'http://placekitten.com/200/300'
// })
// .then((createdUser) => {
// 	console.log('Created user: ', createdUser.firstname);
// })
// .catch((err) => {
// 	console.log('error: ', err)
// })

// Create a place
db.place.findOrCreate({
	where: {
		description: 'paris',
		image: 'http://placekitten.com/200/300',
		lng: 30,
		lat: -50
	}
})
.spread((place, created) => {
	db.user.find({where: {id: 1}})
	.then((user) => {
		place.addUser(user)
		.then((user) => {
			console.log('association happened');
		})
		.catch((err) => {
			console.log('problem adding association');
		})
	})
	.catch((err) => {
		console.log(err);
	});
});

// Create an attraction


