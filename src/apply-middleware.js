const localforage = require('localforage')
const run = require('run-auto')

function applyMiddleware(app, done) {
	run({
		onStateChange: function (cb) {
			applyOnStateChange(app, cb)
		},
		wrapInitialState: function (cb) {
			applyWrapInitialState(app, cb)
		}
	}, function (err) {
		if (err) {
			console.error(err)
		}
		done(app)
	})
}

if (inDev()) {
	window.$clearLocalState = function () {
		localforage.setItem('localState', '{}')
	}
}

function applyWrapInitialState(app, done) {
	localforage.getItem('localState', function (err, data) {
		if (err) {
			return done(err)
		}
		app.use({
			wrapInitialState: function (initialState) {
				if (!data) {
					return initialState
				}
				const localState = JSON.parse(data)
				Object.keys(initialState).forEach(function (stateKey) {
					initialState[stateKey] = Object.assign(
						initialState[stateKey],
						localState[stateKey]
					)
				})
				return initialState
			}
		})
		done()
	})
}

function applyOnStateChange(app, done) {
	app.use({
		onStateChange: bottleNeck(function (state) {
			console.log('handle state change')
			// if not in dev, only cache opt-in parts of state
			if (!inDev()) {
				state = Object.keys(state).reduce(function (filtered, stateKey) {
					if (state[stateKey].cache) {
						return Object.assign(filtered, state[stateKey])
					}
					return {}
				}, {})
			}
			localforage.setItem('localState', JSON.stringify(state), function (err) {
				done(err)
			})
		}, 500)
	})
	done()
}

function inDev() {
	return (
		window.location.hostname === 'localhost' ||
		window.location.hostname === '127.0.0.1'
	)
}

function bottleNeck(func, time) {
	let lastArgs = []
	let pending = false
	function debounced() {
		lastArgs = arguments
		if (pending) {
			clearTimeout(pending)
		}
		pending = setTimeout(function () {
			func.apply({}, lastArgs)
		}, time)
	}
	return debounced
}

module.exports = applyMiddleware
