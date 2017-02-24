const html = require('choo/html')
const css = require('sheetify')

const somePadding = css`
  :host {
    padding: 15px;
  }
`

const homeModel = {
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

function homeView (state, prev, send) {
  function updateMessage (e) {
    send('home:UPDATE_MESSAGE', {message: e.target.value})
  }

  return html`<div class=${somePadding}>
    <h3>${state.home.message}</h3>
    <input type='text' value=${state.home.message} oninput=${updateMessage} />
  </div>`
}

module.exports = function (app) {
  app.model(homeModel)
  return homeView
}
