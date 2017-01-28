function message(req, res, ctx, done) {
	return done(null, {message: 'seventeen'})
}

module.exports = message
