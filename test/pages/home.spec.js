const test = require('tape')
const sinon = require('sinon')
const sut = require('../../src/pages/home')

test('pages/home', function (t) {
	const send = sinon.spy()
	const state = {
		home: {
			message: 'Hello World'
		}
	}
	const rendered = sut(state, {}, send)
	t.ok(rendered)
	t.end()
})
