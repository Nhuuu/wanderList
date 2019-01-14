var express = require('express');
var router = express.Router();

// Include ref to middleware > loggedIn.js
var loggedIn = require('../middleware/loggedIn');

router.get('/', loggedIn, (req, res) => {
	res.render('profile');
});





module.exports = router;
