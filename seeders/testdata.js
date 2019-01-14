var db = require('../models');


// Create a movie in the models/movie.js file.
db.movie.create({
	title: 'Die Hard',
	year: '1988',
	genre: 'Christmas',
	runtime: 110,
	tagline: 'Yippee Kai-ye...'
})
// Promises, sequelize commands that does all of the sql for you in the background.
.then((createdMovie) => {
	console.log('Created movie: ', createdMovie.title);
})
.catch((err) => {
	console.log('Error: ', err)
})