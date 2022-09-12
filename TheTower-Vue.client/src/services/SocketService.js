import { AppState } from '../AppState.js'
import { logger } from '../utils/Logger.js'
import Pop from '../utils/Pop.js'
import { SocketHandler } from '../utils/SocketHandler'

class SocketService extends SocketHandler {
  constructor() {
    super()
    this
      .on('error', this.onError)
      .on('joined:room', this.joinedRoom)
      .on('new:comment', this.newComment)
      .on('list:users', this.listUsers)
      .on('new:notify', this.notify)

  }

  // OUTGOING
  joinRoom(roomName) {
    this.emit('join:room', { roomName })
  }

  // INCOMING
  onError(payload) {
    Pop.toast(payload.message, 'error')
  }

  joinedRoom(payload) {
    logger.log('[SOCKET JOINED ROOM]', payload.roomName)
  }
  newComment(payload) {
    logger.log('socket comment', payload)
    AppState.comments.unshift(payload)
  }
  notify(payload) {
    Pop.toast(payload.message)
  }

  listUsers(payload) {
    logger.log('users in room', payload)
  }
}


export const socketService = new SocketService()
