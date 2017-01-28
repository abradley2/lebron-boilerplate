const html = require('choo/html')
const css = require('sheetify')

const somePadding = css`:host {
	padding: 15px;
}`

function home(state, prev, send) {
	function updateMessage(e) {
		send('home:UPDATE_MESSAGE', {message: e.target.value})
	}

	function sendMessage() {
		send('home:SEND_MESSAGE')
	}

	return html`<div class=${somePadding}>
		<h3>${state.home.message}</h3>
		<fieldset class='pure-form'>
			<input value=${state.home.message} oninput=${updateMessage}/>
		</fieldset>
		<button
			class='pure-button pure-button-primary'
			onclick=${sendMessage}
		>
			Send Message
		</button>
	</div>`
}

module.exports = home
