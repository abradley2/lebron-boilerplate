const html = require('choo/html')
const css = require('sheetify')
const navbar = require('../elements/navbar')

const blue = css`:host {
	color: blue;
}`

function home(state, prev, send) {
	function updateMessage(e) {
		send('home:UPDATE_MESSAGE', {message: e.target.value})
	}

	function sendMessage() {
		send('home:SEND_MESSAGE')
	}

	return html`<div class='uk-container'>
		${navbar()}
		<h3 class=${blue}>${state.home.message}</h3>
		<input class='uk-input' value=${state.home.message} oninput=${updateMessage}/>
		<button
			class='uk-button uk-button-default'
			onclick=${sendMessage}
		>
			Send Message
		</button>
	</div>`
}

module.exports = home
