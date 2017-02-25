const fs = require('fs')
const path = require('path')
const merry = require('merry')
const nodeStatic = require('node-static')
const file = new nodeStatic.Server(path.join(__dirname, '../public'))

const mw = merry.middleware
const notFound = merry.notFound()
const api = merry()

api.router([
  ['/api/message', {
    get: mw([
      setupCtx,
      function (req, res, ctx, done) {
        done(null, {message: 'Hello!'})
      }
    ])
  }],
  ['/404', function (req, res, ctx, done) {
    file.serve(req, res, function (err, result) {
      if (!result && req.headers.accept.indexOf('text/html') !== -1) {
        return fs.createReadStream(path.join(__dirname, '../public/index.html'))
          .pipe(res)
      }
      return notFound(req, res, ctx, done)
    })
  }],
  ['/error', function (req, res, ctx, done) {
    api.log.error('ERROR', arguments)
    done(null, {error: 'something happened'})
  }]
])

// set stuff that should always be on the ctx object passed to routes and middleware
function setupCtx (req, res, ctx, done) {
  Object.assign(ctx, {})
  return done()
}

module.exports = api.start()
