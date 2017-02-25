const test = require('tape')
const choo = require('choo')

const app = choo()
const sut = require('../../client/pages/home')(app)

test('pages/home', function (t) {
  const state = {
    home: {
      message: 'Hello World'
    }
  }
  const rendered = sut(state, {}, Function.prototype)

  t.ok(rendered)
  t.end()
})
