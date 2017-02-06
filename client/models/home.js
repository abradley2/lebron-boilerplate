module.exports = {
  namespace: 'home',
  state: {
    message: 'Chugga Chugga Choo Choo!'
  },
  reducers: {
    UPDATE_MESSAGE: function (state, data) {
      return Object.assign({}, state, {message: data.message})
    }
  }
}
