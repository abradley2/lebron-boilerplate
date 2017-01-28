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
	if (req.headers.cookie && getSessionCookie(req.headers.cookie, 'LebronCookie')) {
		cookieVal = getSessionCookie(req.headers.cookie, 'LebronCookie')
		sessionId = cookie.unsign(cookieVal, ctx.localConfig.serverSecret)
	} else {
		sessionId = uuid.v1()
		cookieVal = cookie.sign(sessionId, ctx.localConfig.serverSecret)
		res.setHeader('Set-Cookie', 'LebronCookie=' + cookieVal)
	}
	ctx.sessionId = sessionId
	return done()
}

module.exports = session
