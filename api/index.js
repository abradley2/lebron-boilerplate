const fs = require('fs')
const path = require('path')
const merry = require('merry')
const argv = require('minimist')(process.argv.slice(2))
const localConfig = require('../local')

const mw = merry.middleware
const notFound = merry.notFound()
const api = merry()

api.router([
	['/api/message', {
		get: function () {
			mw([
				setupCtx,
				reqDev('./middleware/session'),
				reqDev('./routes/message').get
			]).apply(null, arguments)
		}
	}],
	['/404', function (req, res, ctx, done) {
		if (req.url.indexOf('/page') !== -1) {
			return fs.createReadStream(path.join(__dirname, '../public/index.html'))
				.pipe(res)
		}
		return notFound(req, res, ctx, done)
	}],
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
