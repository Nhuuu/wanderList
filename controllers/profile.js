var express = require('express');
var router = express.Router();

// Include ref to middleware > loggedIn.js
var loggedIn = require('../middleware/loggedIn');
var isAdmin = require('../middleware/isAdmin')

router.get('/', loggedIn, (req, res) => {
	res.render('profile');
});

router.get('/admins', isAdmin, (req, res) => {
	res.render('admin');
});






module.exports = router;
