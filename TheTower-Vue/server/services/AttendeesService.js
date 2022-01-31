import { dbContext } from "../db/DbContext";
import { BadRequest } from "../utils/Errors";


class AttendeesService {

    async createAttendee(newAttendee) {
        const createdAttendee = await dbContext.Attendees.create(newAttendee)
        await createdAttendee.populate('attendee', 'name picture')
        return createdAttendee
    }
    // { eventId: newAttendee.eventId }
    // { eventId: eventId }
    // Need to pass eventId (populate didn't work), and decrease capacity in event service

    async getAccountAttendence(accountId) {
        const accountAttendence = await dbContext.Attendees.find({ accountId: accountId }).populate('eventId').populate('atendee', 'name picture')
        return accountAttendence
    }

    async getEventAttendees(eventId) {
        const eventAttendees = await dbContext.Attendees.find({ eventId: eventId }).populate('attendee', 'name picture')
        return eventAttendees
    }

    async deleteAttendee(attendeeId, creatorId) {
        const deletedAttendee = await dbContext.Attendees.findById(attendeeId).populate('attendee', 'name picture')
        if (deletedAttendee.creatorId.toString() !== creatorId) {
            throw new BadRequest('Unable to delete attendee')
        }
        await deletedAttendee.remove()
        return deletedAttendee
    }
    // ^^ Need capacity to increase when attendee is deleted
}

export const attendeesService = new AttendeesService()