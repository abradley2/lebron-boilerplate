const mw = require('merry').middleware
const session = require('./middleware/session')

function message(api) {
	return {
		get: mw([session, function (req, res, ctx, done) {
			api.debug('handling message.get request')
			done(null, {message: 'Hello from Merry'})
		}])
	}
}

module.exports = message
