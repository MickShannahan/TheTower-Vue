import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import { api } from './AxiosService'

class AccountService {
  async getAccount() {
    try {
      const res = await api.get('/account')
      AppState.account = res.data
    } catch (err) {
      logger.error('HAVE YOU STARTED YOUR SERVER YET???', err)
    }
  }

  async getAccountEvents() {
    const res = await api.get('account/attendees')
    console.log('getting attending events', res.data)
    AppState.attending = res.data.map(rd => rd.event)

  }

  async getMyEvents(eventId) {

    const res = await api.get(`api/events/${eventId}`)
    console.log(res.data)
    logger.error(err)
    AppState.myEvents = res.data
  }
}

export const accountService = new AccountService()
