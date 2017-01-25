function message(req, res, ctx, done) {
	console.log('SENDING MESSAGE')
	done(null, {hello: 'world'})
}

module.exports = message
