const html = require('choo/html')
const css = require('sheetify')

const blue = css`:host {
	color: blue;
}`

function home(state, prev, send) {
	function updateMessage(e) {
		send('home:UPDATE_MESSAGE', e.target.value)
	}

	function sendMessage() {
		send('home:SEND_MESSAGE')
	}

	return html`<div class='container'>
		<h3 class=${blue}>${state.home.message}</h3>
		<input value=${state.home.message} oninput=${updateMessage}/>
		<button onclick=${sendMessage}>Send Message</button>
	</div>`
}

module.exports = home
