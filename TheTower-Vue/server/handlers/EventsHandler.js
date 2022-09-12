import { socketProvider } from '../SocketProvider.js'
// import { logger } from '../utils/logger'
import { SocketHandler } from '../utils/SocketHandler'

export class EventsHandler extends SocketHandler {
  /**
   * @param {import("socket.io").Server} io
   * @param {import("socket.io").Socket} socket
   */
  constructor(io, socket) {
    super(io, socket)
    this
      .on('socket:test', this.testEvent)
      .on('join:room', this.joinRoom)
  }

  async joinRoom(payload) {
    // logger.log('joined room:', payload.roomName)
    this.socket.join(payload.roomName)
    const users = socketProvider.getUsers(payload.roomName)
    this.socket.emit('joined:room', payload.roomName)
    this.socket.emit('list:users', users)
  }

  async testEvent(payload) {
    // logger.log('socket test successful')
    this.socket.emit('is:tested', payload)
  }
}
