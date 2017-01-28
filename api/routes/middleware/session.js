const uuid = require('uuid')
const cookie = require('cookie-signature')

function getSessionCookie(cookieString, cookieName) {
	return cookieString
		.split(';')
		.filter(pair => {
			return pair.split('=')[0] === cookieName
		})
		.map(pair => {
			return pair.split('=')[1]
		})[0]
}

function session(req, res, ctx, done) {
	let sessionId
	let cookieVal
	if (getSessionCookie(req.headers.cookie, 'LebronCookie')) {
		cookieVal = getSessionCookie(req.headers.cookie, 'LebronCookie')
		sessionId = cookie.unsign(cookieVal, 'ininthemorningofthemagicians')
	} else {
		sessionId = uuid.v1()
		cookieVal = cookie.sign(sessionId, 'ininthemorningofthemagicians')
		res.setHeader('Set-Cookie', 'LebronCookie=' + cookieVal)
	}
	ctx.newSession = true
	ctx.sessionId = sessionId
	return done()
}

module.exports = session
