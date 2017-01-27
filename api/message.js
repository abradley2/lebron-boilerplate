function message(req, res, ctx, done) {
	done(null, {message: 'hello world'})
}

module.exports = message
