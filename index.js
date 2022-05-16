/* eslint-disable no-console */
const http = require('http')
const io = require('socket.io')
const app = require('./app')
const EVENT = require('./rtc/event-constant')
const onDisconnected = require('./rtc/disconnected')
const onConnected = require('./rtc/connected')
const createChat = require('./rtc/create-chat')

const server = http.createServer(app)
const websocket = io(server, {
  cors: {
    origin: '*',
  },
})

websocket.on('connect', (socket) => {
  socket.on('disconnect', async () => {
    try {
      const token = socket.handshake?.headers?.token
      const data = await onDisconnected({ token })
      websocket.emit(EVENT.USER_DISCONNECTED, {
        id: data.id,
        last_seen: data.last_seen,
      })
    } catch {
      websocket.emit(EVENT.USER_DISCONNECTED)
    }
  })

  socket.on(EVENT.USER_CONNECTED, async () => {
    try {
      const token = socket.handshake?.headers?.token
      const data = await onConnected({ token, socketId: socket.id })
      console.log(data)
      websocket.emit(EVENT.USER_CONNECTED, data)
    } catch {
      websocket.emit(EVENT.USER_CONNECTED)
    }
  })

  socket.on(EVENT.USER_DISCONNECTED, async () => {
    try {
      const token = socket.handshake?.headers?.token
      const data = await onDisconnected({ token })
      websocket.emit(EVENT.USER_DISCONNECTED, {
        id: data.id,
        last_seen: data.last_seen,
      })
    } catch {
      websocket.emit(EVENT.USER_DISCONNECTED)
    }
  })

  socket.on(EVENT.CHAT_FROM_CLIENT, async (data) => {
    console.log('CHAT FROM CLIENT', data)
    try {
      const chat = await createChat(data)
      websocket.emit(EVENT.CHAT_FROM_SERVER, chat)
    } catch {
      websocket.emit(EVENT.CHAT_FROM_SERVER)
    }
  })
})

// run server
server.listen(process.env.PORT)
