const http = require('http')
const path = require('path')
const argv = require('minimist')(process.argv.slice(2))
const nodeStatic = require('node-static')

const prodPort = 3000
const devPort = 8000

// API handlers
const apiRequest = new RegExp(/^\/api\/.+$/)
const pageRequest = new RegExp(/^\/page\/.+$/)

if (argv.dev) {
	const budo = require('budo')
	// if in a dev environment, have budo serve the app
	budo('./src/main.js:main.bundle.js', {
		live: true,
		port: devPort,
		host: '127.0.0.1',
		pushstate: true,
		browserify: {
			transform: 'sheetify/transform'
		},
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
		console.log('Server running on %s', ev.uri)
		console.log('LiveReload running on port %s', ev.livePort)
	}).on('update', function (buffer) {
		console.log('bundle - %d bytes', buffer.length)
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
