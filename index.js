/* eslint-disable no-console */
const http = require('http')
const io = require('socket.io')
const app = require('./app')

const server = http.createServer(app)
const websocket = io(server)

websocket.on('connection', (socket) => {
  console.log.og('USER', socket)

  socket.on('disconnect', () => {
    console.log('USER DC')
  })
})

// run server
server.listen(process.env.PORT)
