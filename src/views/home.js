const html = require('choo/html')
const css = require('sheetify')

const blue = css`:host {
	color: blue;
}`

function home(state, prev, send) {
	function updateMessage(e) {
		send('home:UPDATE_MESSAGE', e.target.value)
	}

	return html`<div class='container'>
		<h3 class=${blue}>${state.home.message}</h3>
		<input value=${state.home.message} oninput=${updateMessage}/>
	</div>`
}

module.exports = home
