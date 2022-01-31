import { Auth0Provider } from '@bcwdev/auth0provider'
import BaseController from '../utils/BaseController'
import { towerEventsService } from '../services/TowerEventsService'
import { commentsService } from '../services/CommentsService'
import { attendeesService } from '../services/AttendeesService'

export class TowerEventsController extends BaseController {
    constructor() {
        super('api/events')
        this.router
            .get('', this.getAllTowerEvents)
            .get('/:id', this.getTowerEventById)
            .get('/:id/comments', this.getComments)
            .get('/:id/attendees', this.getEventAttendees)
            .use(Auth0Provider.getAuthorizedUserInfo)
            .post('', this.createTowerEvent)
            .put('/:id', this.editTowerEvent)
            .delete('/:id', this.deleteTowerEvent)

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

    async getTowerEventById(req, res, next) {
        try {
            const foundEvent = await towerEventsService.getTowerEventById(req.params.id)
            res.send(foundEvent)
        } catch (error) {
            next(error)
        }
    }

    async editTowerEvent(req, res, next) {
        try {
            req.body.creatorId = req.userInfo.id
            const updatedEvent = await towerEventsService.editTowerEvent(req.params.id, req.body)
            return res.send(updatedEvent)
        } catch (error) {
            next(error)
        }
    }

    async deleteTowerEvent(req, res, next) {
        try {
            const deletedEvent = await towerEventsService.deleteTowerEvent(req.params.id, req.userInfo.id, req.body)
            res.send(deletedEvent)
        } catch (error) {
            next(error)
        }
    }

    async getComments(req, res, next) {
        try {
            const eventComments = await commentsService.getComments({ eventId: req.params.id })
            res.send(eventComments)
        } catch (error) {
            next(error)
        }
    }

    async getEventAttendees(req, res, next) {
        try {
            const eventAttendees = await attendeesService.getEventAttendees({ eventId: req.params.id })
            res.send(eventAttendees)
        } catch (error) {
            next(error)
        }
    }
}