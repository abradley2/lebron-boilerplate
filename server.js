const http = require('http')
const path = require('path')
const budo = require('budo')
const argv = require('minimist')(process.argv.slice(2))
const merry = require('merry')
const nodeStatic = require('node-static')

// API handlers
const app = merry()

app.router(require('./routes'))

const api = app.start()

const apiRequest = new RegExp(/^\/api\/.+$/)

if (argv.dev) {
	// if in a dev environment, have budo serve the app
	budo('./src/main.js:main.bundle.js', {
		live: true,
		port: 8000,
		host: '127.0.0.1',
		browserify: {
			transform: 'sheetify/transform'
		},
		dir: [
			path.join(__dirname, 'public')
		],
		middleware: function (req, res, next) {
			if (apiRequest.test(req.url)) {
				return api(req, res)
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
	if (apiRequest.test(req.url)) {
		console.log('api request')
		return api(req, res)
	}
	return file.serve(req, res)
})

server.listen(3000)
