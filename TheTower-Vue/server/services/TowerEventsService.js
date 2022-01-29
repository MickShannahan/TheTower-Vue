import { dbContext } from "../db/DbContext"

class TowerEventsService {

    async getAllTowerEvents() {
        const events = dbContext.TowerEvents.find().populate('creator', 'name picture')
        return events
    }

    async createTowerEvent(newEvent) {
        const createdEvent = dbContext.TowerEvents.create(newEvent)
        return createdEvent
    }

}

export const towerEventsService = new TowerEventsService()