module.exports = {
  namespace: 'home',
  state: {
    message: 'Choo-choo!'
  },
  reducers: {
    UPDATE_MESSAGE: function (state, data) {
      return Object.assign({}, state, {message: data.message})
    }
  }
}
