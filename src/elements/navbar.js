const html = require('choo/html')

function navbar() {
	return html`<nav>
		<div class='nav-wrapper'>
			<ul id='nav-mobile'>
				<li><a href='/home'>Home</a></li>
			</ul>
		</div>
	</nav>`
}

module.exports = navbar
