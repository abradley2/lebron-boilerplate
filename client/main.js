const css = require('sheetify')
const xhr = require('xhr')

css('tachyons')

const choo = require('choo')
const app = choo()
const home = require('./pages/home')(app)

app.router([
  ['/', home],
  ['/home', home]
])

if (process.env.NODE_ENV === 'development') {
  const log = require('choo-log')
  app.use(log())

  // wrap xhr methods so they automatically use local server when hosted on budo
  const methods = ['post', 'put', 'patch', 'del', 'head', 'get']

  methods.forEach(function (method) {
    xhr[method] = (function (send) {
      return function (config, cb) {
        config.url = `http://localhost:3000${config.url}`
      }
      return send(config, cb)
    })(xhr[method])
  })
}

document.body.appendChild(app.start())
