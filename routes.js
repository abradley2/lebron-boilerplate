const merry = require('merry')

module.exports = [
	['/api/message', merry.middleware([
		require('./middleware/session'),
		require('./api/message')
	])],
	['/404', merry.notFound()],
	['/error', function () {
		console.log('ERROR', arguments)
	}]
]
