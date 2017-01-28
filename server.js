const http = require('http')
const path = require('path')
const argv = require('minimist')(process.argv.slice(2))
const nodeStatic = require('node-static')
const api = require('./api')

const prodPort = 3000
const devPort = 8000

// API handlers
const apiRequest = new RegExp(/^\/api\/.+$/)

if (argv.dev) {
	const budo = require('budo')
	const chokidar = require('chokidar')
	// if in a dev environment, have budo serve the app
	budo('./src/main.js:main.bundle.js', {
		live: true,
		port: devPort,
		pushstate: true,
		host: '127.0.0.1',
		browserify: {
			transform: 'sheetify/transform'
		},
		dir: [
			path.join(__dirname, 'public')
		],
		middleware: function (req, res, next) {
			if (apiRequest.test(req.url)) {
				return require('./api')(req, res)
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
	// have the api reload on file change
	const watcher = chokidar.watch('./api')
	watcher.on('ready', function () {
		watcher.on('all', refreshApi)
	})
}

function refreshApi(cache) {
	const apiPath = path.join(__dirname, 'api')
	Object.keys(require.cache).forEach(function (id) {
		if (id.indexOf(apiPath) !== -1) {
			delete cache[id]
		}
	})
}

const file = new nodeStatic.Server('./public')

const server = http.createServer(function (req, res) {
	if (apiRequest.test(req.url)) {
		return api(req, res)
	}
	return file.serve(req, res)
})

server.listen(prodPort)
