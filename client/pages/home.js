const html = require('choo/html')
const css = require('sheetify')
const i = require('icepick')

const styles = css`
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
      return i.set(state, 'message', data)
    }
  }
}

function homeView (state, prev, send) {
  function updateMessage (e) {
    send('home:UPDATE_MESSAGE', e.target.value)
  }

  return html`<div class=${styles}>
    <h3>${state.home.message}</h3>
    <input type='text' value=${state.home.message} oninput=${updateMessage} />
  </div>`
}

module.exports = function (app) {
  app.model(homeModel)
  return homeView
}
