const html = require('choo/html')

function navbar() {
	return html`<nav class='uk-navbar-container' uk-navbar>
		<div class='uk-navbar-left'>
			<ul class='uk-navbar-nav'>
				<li class='uk-active'><a href='/home'>Home</a></li>
			</ul>
		</div>
	</nav>`
}

module.exports = navbar
