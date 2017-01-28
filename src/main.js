const css = require('sheetify')

css(require('purecss/build/pure.css'))
css(require('./styles/base.css'))

document.addEventListener('DOMContentLoaded', function () {
	const choo = require('choo')
	const home = require('./pages/home')

	const app = choo()

	app.model(require('./models/home'))

	app.router([
		['/', home],
		['/home', home]
	])

	document.body.appendChild(app.start())
})
