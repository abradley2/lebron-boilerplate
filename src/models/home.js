module.exports = {
	namespace: 'home',
	state: {
		message: 'Hello Choo'
	},
	reducers: {
		UPDATE_MESSAGE: function (state, data) {
			return Object.assign({}, state, {message: data})
		}
	}
}
