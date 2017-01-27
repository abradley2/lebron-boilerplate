const http = require('http')
const path = require('path')
const budo = require('budo')
const argv = require('minimist')(process.argv.slice(2))
const merry = require('merry')
const pino = require('pino')()
const nodeStatic = require('node-static')
const routes = require('./routes')

const httpPort = 3000

// API handlers
const app = merry()

app.router(routes)

const api = app.start()

const apiRequest = new RegExp(/^\/api\/.+$/)

if (argv.dev) {
	// if in a dev environment, have budo serve the app
	budo('./src/main.js:main.bundle.js', {
		live: true,
		port: 8000,
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
				return api(req, res)
			}
			return next()
		}
	})
	.on('connect', function (ev) {
		pino.info('Server running on %s', ev.uri)
		pino.info('LiveReload running on port %s', ev.livePort)
	}).on('update', function (buffer) {
		pino.info('bundle - %d bytes', buffer.length)
	})
}

const file = new nodeStatic.Server('./public')

const server = http.createServer(function (req, res) {
	if (apiRequest.test(req.url)) {
		return api(req, res)
	}
	return file.serve(req, res)
})

server.listen(httpPort)

server.on('connect', function () {
	pino.info(`HttpServer connected at port ${httpPort}`)
})
