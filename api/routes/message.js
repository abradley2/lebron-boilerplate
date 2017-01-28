function message(req, res, ctx, done) {
	return done(null, {message: 'fourteen'})
}

module.exports = message
