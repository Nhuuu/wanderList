module.exports = function(req, res, next){
	if (req.user){
		next();
	}
	else {
		req.flash('error', 'Please log in to access this page!')
		res.redirect('/auth/login')
	}
}