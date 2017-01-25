const xhr = require('xhr')

module.exports = {
	namespace: 'home',
	state: {
		message: 'Hello Choo'
	},
	reducers: {
		UPDATE_MESSAGE: function (state, data) {
			return Object.assign({}, state, {message: data})
		}
	},
	effects: {
		SEND_MESSAGE: function (state, data, send, done) {
			const config = {
				url: '/api/message',
				headers: {
					'Content-Type': 'application/json'
				}
			}
			xhr(config, function (err, resp, body) {
				if (err) {
					done(err)
				}
				console.log('body = ', body)
				send('home:UPDATE_MESSAGE', body.message)
			})
		}
	}
}
