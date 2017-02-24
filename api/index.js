const fs = require('fs')
const path = require('path')
const merry = require('merry')

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
    if (req.url.indexOf('/page') !== -1) {
      return fs.createReadStream(path.join(__dirname, '../public/index.html'))
        .pipe(res)
    }
    return notFound(req, res, ctx, done)
  }],
  ['/error', function (req, res, ctx, done) {
    api.log.error('ERROR', arguments)
    done(null, {error: 'something happened'})
  }]
])

// set stuff that should always be on the ctx object passed to routes and middleware
function setupCtx (req, res, ctx, done) {
  Object.assign(ctx, {
    log: api.log
  })
  return done()
}

module.exports = api.start()
