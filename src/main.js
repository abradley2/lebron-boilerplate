document.addEventListener('DOMContentLoaded', function () {
	const choo = require('choo')
	const app = choo()
	const home = require('./views/home')

	app.model(require('./models/home'))

	app.router(['/', home])

	document.body.appendChild(app.start())
})
