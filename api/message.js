function message(req, res, ctx, done) {
	done(null, {message: 'Hello World!'})
}

module.exports = message
