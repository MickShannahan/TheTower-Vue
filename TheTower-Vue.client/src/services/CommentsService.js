import { api } from "./AxiosService";
import { AppState } from "../AppState";

class CommentsService {

    async createComment(eventId, body) {
        body.eventId = eventId
        const res = await api.post('api/comments/', body)
        console.log('creating this comment', res.data)
        AppState.comments.push(res.data)
    }

    async deleteComment(commentId) {
        const res = await api.delete(`api/comments/${commentId}`)
        console.log('deleting this comment', res.data)
        AppState.comments.filter(c => c.id !== commentId)
    }

}

export const commentsService = new CommentsService()