const css = require('sheetify')
const applyMiddleware = require('./apply-middleware')

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

	applyMiddleware(app, startApp)
})

function startApp(app) {
	document.body.appendChild(app.start())
}
