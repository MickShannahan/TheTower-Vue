import { Auth0Provider } from '@bcwdev/auth0provider'
import BaseController from '../utils/BaseController'
import { towerEventsService } from '../services/TowerEventsService'

export class TowerEventsController extends BaseController {
    constructor() {
        super('api/events')
        this.router
            .get('', this.getAllTowerEvents)
            .use(Auth0Provider.getAuthorizedUserInfo)
            .post('', this.createTowerEvent)

    }

    async getAllTowerEvents(req, res, next) {
        try {
            const towerEvents = await towerEventsService.getAllTowerEvents()
            res.send(towerEvents)
        } catch (error) {
            next(error)
        }
    }

    async createTowerEvent(req, res, next) {
        try {
            req.body.creatorId = req.userInfo.id
            const createdEvent = await towerEventsService.createTowerEvent(req.body)
            res.send(createdEvent)
        } catch (error) {
            next(error)
        }
    }

}