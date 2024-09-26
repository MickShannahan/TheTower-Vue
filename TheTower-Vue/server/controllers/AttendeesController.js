import BaseController from '../utils/BaseController'
import { attendeesService } from '../services/AttendeesService'
import { Auth0Provider } from '@bcwdev/auth0provider'

export class AttendeesController extends BaseController {
  constructor() {
    super('api/tickets')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createAttendee)
      .delete('/:id', this.deleteAttendee)
  }

  async createAttendee(req, res, next) {
    try {
      req.body.accountId = req.userInfo.id
      const createdAttendee = await attendeesService.createAttendee(req.body)
      res.send(createdAttendee)
    } catch (error) {
      next(error)
    }
  }
  // req.body.eventId = req.event.id

  async deleteAttendee(req, res, next) {
    try {
      const deletedAttendee = await attendeesService.deleteAttendee(req.params.id, req.userInfo.id)
      res.send(deletedAttendee)
    } catch (error) {
      next(error)
    }
  }
}
