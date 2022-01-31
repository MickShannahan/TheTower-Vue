import { dbContext } from "../db/DbContext";
import { BadRequest } from "../utils/Errors";
import { towerEventsService } from "./TowerEventsService";


class AttendeesService {

    async createAttendee(newAttendee) {
        const createdAttendee = await dbContext.Attendees.create(newAttendee)
        await createdAttendee.populate('account', 'name picture')
        // NOTE abstract this logic to it's own function once it all works - or after grading
        const foundEvent = await towerEventsService.getTowerEventById(createdAttendee.eventId)
        if (foundEvent.capacity > 0) {
            foundEvent.capacity--
            foundEvent.save()
        } else {
            throw new BadRequest('Event is sold out')
        }
        return createdAttendee
    }
    // { eventId: newAttendee.eventId }
    // { eventId: eventId }
    // Need to pass eventId (populate didn't work), and decrease capacity in event service

    async getAccountAttendence(accountId) {
        const accountAttendence = await dbContext.Attendees.find({ accountId: accountId }).populate('event').populate('account', 'name picture')
        return accountAttendence
    }

    async getEventAttendees(eventId) {
        const eventAttendees = await dbContext.Attendees.find(eventId).populate('account', 'name picture').populate('event')
        return eventAttendees
    }

    async deleteAttendee(attendeeId, creatorId) {
        const deletedAttendee = await dbContext.Attendees.findById(attendeeId).populate('account', 'name picture')
        if (deletedAttendee.accountId.toString() !== creatorId) {
            throw new BadRequest('Unable to delete attendee')
        }
        await deletedAttendee.remove()
        const foundEvent = await towerEventsService.getTowerEventById(deletedAttendee.eventId)
        foundEvent.capacity++
        foundEvent.save()
        return deletedAttendee
    }
    // ^^ Need capacity to increase when attendee is deleted
}

export const attendeesService = new AttendeesService()