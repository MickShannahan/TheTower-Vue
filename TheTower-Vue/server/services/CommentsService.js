import { dbContext } from '../db/DbContext'
import { socketProvider } from '../SocketProvider'
import { BadRequest } from '../utils/Errors'

class CommentsService {
  async getComments(query = {}) {
    const eventComments = await dbContext.Comments.find(query).populate('creator', 'name picture')
    return eventComments
  }

  async createComment(newComment) {
    const createdComment = await dbContext.Comments.create(newComment)
    await createdComment.populate('creator', 'name picture')
    socketProvider.messageRoom('event-' + newComment.eventId, 'new:comment', createdComment)
    const towerEvent = await dbContext.TowerEvents.findById(newComment.eventId)
    socketProvider.messageUser(towerEvent.creatorId.toString(), 'new:notify', { message: `${createdComment.creator.name} just commented on your event`, towerEvent })
    return createdComment
  }

  async deleteComment(commentId, creatorId) {
    const deletedComment = await dbContext.Comments.findById(commentId).populate('creator', 'name picture')
    if (deletedComment.creatorId.toString() !== creatorId) {
      throw new BadRequest('Unable to delete comment')
    }
    await deletedComment.remove()
    return deletedComment
  }
}

export const commentsService = new CommentsService()
