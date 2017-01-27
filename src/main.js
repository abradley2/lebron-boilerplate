document.addEventListener('DOMContentLoaded', function () {
	const choo = require('choo')
	const app = choo()
	const home = require('./pages/home')

	app.model(require('./models/home'))

	app.router([
		['/', home],
		['/home', home]
	])

	document.body.appendChild(app.start())
})
