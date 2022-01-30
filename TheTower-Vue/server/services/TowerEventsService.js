import { dbContext } from "../db/DbContext"
import { BadRequest } from '../utils/Errors'

class TowerEventsService {

    async getAllTowerEvents() {
        const events = dbContext.TowerEvents.find().populate('creator', 'name picture')
        return events
    }

    async createTowerEvent(newEvent) {
        const createdEvent = dbContext.TowerEvents.create(newEvent)
        return createdEvent
    }

    async getTowerEventById(eventId) {
        const foundEvent = dbContext.TowerEvents.findById(eventId).populate('creator', 'name picture')
        if (!foundEvent) {
            throw new BadRequest('Unable to find that event')
        }
        return foundEvent
    }

    async editTowerEvent(eventId, updatedEvent) {
        const eventToEdit = await dbContext.TowerEvents.findById(eventId).populate('creator', 'name picture')
        if (eventToEdit.creatorId.toString() !== updatedEvent.creatorId) {
            throw new BadRequest('Unable to edit event')
        }
        eventToEdit.name = updatedEvent.name || eventToEdit.name
        eventToEdit.description = updatedEvent.description || eventToEdit.description
        await eventToEdit.save()
        return eventToEdit
    }

    async deleteTowerEvent(eventId, creatorId, eventToCancel) {
        const deletedEvent = await dbContext.TowerEvents.findById(eventId).populate('creator', 'name picture')
        if (deletedEvent.creatorId.toString() !== creatorId) {
            throw new BadRequest('Unable to cancel event')
        }
        deletedEvent.isCanceled = !eventToCancel.isCanceled
        await deletedEvent.save()
        return deletedEvent

    }
}

// ^^need my delete function to throw bad request if someone tries to edit after delete



export const towerEventsService = new TowerEventsService()