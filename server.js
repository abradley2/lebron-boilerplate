const http = require('http')
const path = require('path')
const argv = require('minimist')(process.argv.slice(2))
const nodeStatic = require('node-static')
const log = require('merry')().log

const prodPort = 3000
const devPort = 8000

// API handlers
const apiRequest = new RegExp(/^\/api\/.+$/)
const pageRequest = new RegExp(/^\/page\/.+$/)

// if in dev, start up budo
if (argv.dev) {
	const budo = require('budo')

	budo('./src/main.js:main.bundle.js', {
		live: true,
		port: devPort,
		host: '127.0.0.1',
		pushstate: true,
		dir: [
			path.join(__dirname, 'public')
		],
		middleware: function (req, res, next) {
			if (apiRequest.test(req.url)) {
				return reqDev('./api')(req, res)
			}
			return next()
		}
	})
	.on('connect', function (ev) {
		log.info('Server running on %s', ev.uri)
		log.info('LiveReload running on port %s', ev.livePort)
	}).on('update', function (buffer) {
		log.info('bundle - %d bytes', buffer.length)
	})
}

const file = new nodeStatic.Server('./public')

const server = http.createServer(function (req, res) {
	if (apiRequest.test(req.url) || pageRequest.test(req.url)) {
		return require('./api')(req, res)
	}
	return file.serve(req, res)
})

server.listen(prodPort)

// convenience function for allowing cache busting for require
function reqDev(module) {
	if (argv.dev && require.cache[require.resolve(module)]) {
		delete require.cache[require.resolve(module)]
	}
	return require(module) // eslint-disable-line import/no-dynamic-require
}
