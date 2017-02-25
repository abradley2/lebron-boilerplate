const http = require('http')
const cors = require('merry').cors
const api = require('./api')

const server = http.createServer(
  process.env.NOVE_ENV === 'development'
    ? cors(api)
    : api
)

server.listen(3000)
