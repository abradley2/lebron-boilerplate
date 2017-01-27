const merry = require('merry')
// Middlware
const session = require('./middleware/session')
// Api
const message = require('./api/message')

module.exports = [
	['/api/message',
		merry.middleware([
			session,
			message
		])
	],
	['/404', merry.notFound()],
	['/error', function () {
		this.log.error('ERROR', arguments)
	}]
]
