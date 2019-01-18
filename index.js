// Load environment variables
require('dotenv').config();
var db = require('./models')
var express = require('express');
var flash = require('connect-flash');
var layouts = require('express-ejs-layouts');
var parser = require('body-parser');
var passport = require('./config/passportConfig')
var request = require('request');
var session = require('express-session');

// Declare express instance to use;
var app = express();

// Set the views to ejs
app.set('view engine', 'ejs');

// Middleware
app.use(layouts);
app.use('/', express.static('public'));
app.use(parser.urlencoded({ extended: false }));
app.use(session({
	secret: process.env.SESSION_SECRET,
	resave: false,
	saveUninitialized: true
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

// Custom middleware
app.use((req, res, next) => {
	res.locals.alerts = req.flash();
	res.locals.user = req.user;
	next();
});

// Routes
app.get('/', (req, res) => {
	res.render('home');
});

// Controllers
app.use('/auth', require('./controllers/auth'));
app.use('/profile', require('./controllers/profile'));
app.use('/search', require('./controllers/search'));

app.listen(process.env.PORT || 3000);


