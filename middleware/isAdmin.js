// It's middleware so you need the 3 arguments >> REVIEW
module.exports = function(req, res, next){
	if (req.user && req.user.admin){
		next();
	}
	else {
		req.flash('error', 'Only admins may access this page!')
		res.redirect('/profile')
	}
}