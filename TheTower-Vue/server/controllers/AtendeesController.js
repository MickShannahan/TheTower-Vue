import BaseController from "../utils/BaseController";
import { atendeesService } from "../services/AtendeesService";
import { Auth0Provider } from "@bcwdev/auth0provider";

export class AtendeesController extends BaseController {
    constructor() {
        super('api/atendees')
        this.router
            .use(Auth0Provider.getAuthorizedUserInfo)
            .post('', this.createAtendee)
    }

    async createAtendee(req, res, next) {
        try {
            req.body.accountId = req.userInfo.id
            const createdAtendee = await atendeesService.createAtendee(req.body)
            res.send(createdAtendee)
        } catch (error) {
            next(error)
        }
    }


}