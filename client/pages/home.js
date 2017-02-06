const html = require('choo/html')
const css = require('sheetify')

const somePadding = css`:host {
  padding: 15px;
}`

const messageText = css`:host {
  color: var(--color-success);
}`

function home (state, prev, send) {
  function updateMessage (e) {
    send('home:UPDATE_MESSAGE', {message: e.target.value})
  }

  return html`<div class=${somePadding}>
    <h3 class=${messageText}>${state.home.message}</h3>
    <input type='text' value=${state.home.message} oninput=${updateMessage} />
  </div>`
}

module.exports = home
