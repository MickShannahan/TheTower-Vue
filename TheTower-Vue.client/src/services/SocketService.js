import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import Pop from '../utils/Pop'
import { SocketHandler } from '../utils/SocketHandler'

class SocketService extends SocketHandler {
  constructor() {
    super()
    this
      .on('error', this.onError)
      .on('joined:room', this.joinedRoom)
      .on('new:comment', this.newComment)
      .on('new:notify', this.notification)
  }

  // OUTS
  joinRoom(roomName = 'general'){
    this.emit('join:room', {roomName})
  }



  // INS

  joinedRoom(payload){
    logger.log('you have joined the room:', payload.roomName)
  }

  newComment(payload){
    logger.log('[new:comment]', payload)
    AppState.comments.push(payload)
  }

  notification(payload){
    logger.log('[new:notify]', payload)
    Pop.toast(`${payload.message}. <a href="/#/events/${payload.towerEvent.id}">go check it out</a>`, 'info', 'top-end', 8000)
  }

  onError(e) {
    Pop.toast(e.message, 'error')
  }
}

export const socketService = new SocketService()
