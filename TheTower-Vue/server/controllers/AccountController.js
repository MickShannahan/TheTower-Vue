import { Auth0Provider } from '@bcwdev/auth0provider'
import { accountService } from '../services/AccountService'
import BaseController from '../utils/BaseController'
import { attendeesService } from '../services/AttendeesService'

export class AccountController extends BaseController {
  constructor() {
    super('account')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('', this.getUserAccount)
      .get('/attendees', this.getAcountAttendence)
  }

  async getUserAccount(req, res, next) {
    try {
      const account = await accountService.getAccount(req.userInfo)
      res.send(account)
    } catch (error) {
      next(error)
    }
  }

  async getAcountAttendence(req, res, next) {
    try {
      const accountAttendence = await attendeesService.getAccountAttendence(req.userInfo.id)
      res.send(accountAttendence)
    } catch (error) {
      next(error)

    }
  }

}
