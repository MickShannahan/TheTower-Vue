import BaseController from "../utils/BaseController";
import { commentsService } from "../services/CommentsService";
import { Auth0Provider } from "@bcwdev/auth0provider";


export class CommentsController extends BaseController {
    constructor() {
        super('api/comments')
        this.router
            .use(Auth0Provider.getAuthorizedUserInfo)
            .post('', this.createComment)
            .delete('/:id', this.deleteComment)
    }

    async createComment(req, res, next) {
        try {
            req.body.creatorId = req.userInfo.id
            const createdComment = await commentsService.createComment(req.body)
            return res.send(createdComment)
        } catch (error) {
            next(error)
        }
    }

    async deleteComment(req, res, next) {
        try {
            const deletedComment = await commentsService.deleteComment(req.params.id, req.userInfo.id)
            res.send(deletedComment)
        } catch (error) {
            next(error)
        }
    }
}

