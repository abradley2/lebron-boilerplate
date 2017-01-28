const merry = require('merry')

const api = merry()
// new comment!er

api.router([
	['/api/message', require('./routes/message')(api)],
	['/404', merry.notFound()],
	['/error', function (req, res, ctx, done) {
		this.log.error('ERROR', arguments)
		done(ctx.error || new Error('Server Error'))
	}]
])

module.exports = api
