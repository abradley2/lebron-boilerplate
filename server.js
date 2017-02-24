const http = require('http')
const nodeStatic = require('node-static')
const cors = require('merry').cors
const api = require('./api')

// API handlers
const apiRequest = new RegExp(/^\/api\/.+$/)
const pageRequest = new RegExp(/^\/page\/.+$/)

const file = new nodeStatic.Server('./public')

const server = http.createServer(
  process.env.NOVE_ENV === 'development' ?
  cors(handleRequest)
  : handleRequest
)

server.listen(3000)

function handleRequest (req, res) {
  if (
    apiRequest.test(req.url) ||
    pageRequest.test(req.url)
  ) {
    return api(req, res)
  }

  return file.serve(req, res)
}
