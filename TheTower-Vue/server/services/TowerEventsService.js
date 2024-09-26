import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'

class TowerEventsService {
  async getAllTowerEvents(query = {}) {
    const events = await dbContext.TowerEvents.find(query)
      .populate('creator', 'name picture')
      .populate('ticketCount')
    return events
  }

  async createTowerEvent(newEvent) {
    const createdEvent = await dbContext.TowerEvents.create(newEvent)
    await createdEvent.populate('creator')
    await createdEvent.populate('ticketCount')
    return createdEvent
  }

  async getTowerEventById(eventId) {
    const foundEvent = await dbContext.TowerEvents.findById(eventId)
      .populate('creator', 'name picture')
      .populate('ticketCount')
    if (!foundEvent) {
      throw new BadRequest('Unable to find that event')
    }
    if (foundEvent.isCanceled) throw new Error('NOPE')

    return foundEvent
  }

  async editTowerEvent(eventId, updatedEvent) {
    const eventToEdit = await dbContext.TowerEvents.findById(eventId).populate('creator', 'name picture')
    if (eventToEdit.creatorId.toString() !== updatedEvent.creatorId) {
      throw new BadRequest('Unable to edit event')
    }
    if (eventToEdit.isCanceled) {
      throw new BadRequest('Unable to edit cancelled event')
    }
    eventToEdit.name = updatedEvent.name || eventToEdit.name
    eventToEdit.description = updatedEvent.description || eventToEdit.description
    eventToEdit.isCanceled = updatedEvent.isCanceled !== undefined ? updatedEvent.isCanceled : eventToEdit.isCanceled

    await eventToEdit.save()
    return eventToEdit
  }

  async deleteTowerEvent(eventId, creatorId, eventToCancel) {
    const deletedEvent = await dbContext.TowerEvents.findById(eventId).populate('creator', 'name picture')
    if (deletedEvent.creatorId.toString() !== creatorId) {
      throw new BadRequest('Unable to cancel event')
    }
    deletedEvent.isCanceled = true
    await deletedEvent.save()
    return deletedEvent
  }

  // async adjustCapacity(attendee) {
  //     if (new attendee created) {
  //         eventid.capacity--
  //     } else if (attendee is deleted) {
  //         eventid.capacity++
  //     }
  // }
}

// ^^need my delete function to throw bad request if someone tries to edit after delete

export const towerEventsService = new TowerEventsService()
