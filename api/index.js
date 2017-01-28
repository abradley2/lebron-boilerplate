const merry = require('merry')
const argv = require('minimist')(process.argv.slice(2))
const localConfig = require('../local')

const mw = merry.middleware
const api = merry()

api.router([
	['/api/message', function () {
		mw([
			setupCtx,
			reqDev('./middleware/session'),
			reqDev('./routes/message')
		]).apply(null, arguments)
	}],
	['/404', merry.notFound()],
	['/error', function (req, res, ctx, done) {
		api.log.error('ERROR', arguments)
		done(null, {error: 'something happened'})
	}]
])

function setupCtx(req, res, ctx, done) {
	Object.assign(ctx, {
		log: api.log,
		localConfig: localConfig
	})
	return done()
}

// convenience function for allowing cache busting for require
function reqDev(module) {
	if (argv.dev && require.cache[require.resolve(module)]) {
		delete require.cache[require.resolve(module)]
	}
	return require(module) // eslint-disable-line import/no-dynamic-require
}

module.exports = api.start()
