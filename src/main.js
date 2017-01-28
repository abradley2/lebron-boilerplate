const css = require('sheetify')
const localforage = require('localforage')

css('purecss/build/pure.css')
css('./styles/base.css')

document.addEventListener('DOMContentLoaded', function () {
	const choo = require('choo')
	const home = require('./pages/home')

	const app = choo()

	app.model(require('./models/home'))

	app.router([
		['/', home],
		['/home', home]
	])

	localforage.getItem('localState', function (err, data) {
		if (err) {
			console.error('Error loading local state')
		}

		applyMiddleware({app: app, localState: data})
		startApp(app)
	})
})

function applyMiddleware(params) {
	params.app.use({
		wrapInitialState: function (initialState) {
			if (!params.localState) {
				return initialState
			}
			const loadedState = JSON.parse(params.localState)
			Object.keys(initialState).forEach(function (stateKey) {
				initialState[stateKey] = Object.assign(
					initialState[stateKey],
					loadedState[stateKey]
				)
			})
			return initialState
		},
		onStateChange: bottleNeck(function (state) {
			localforage.setItem('localState', JSON.stringify(state), function (err) {
				if (err) {
					console.error(err)
				}
			})
		}, 500)
	})
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

function startApp(app) {
	document.body.appendChild(app.start())
}
