import { api } from "./AxiosService"
import { AppState } from "../AppState"
import { logger } from "../utils/Logger"


class EventsService {
    async getEvents() {
        const res = await api.get('api/events/')
        console.log(res.data)
        AppState.events = res.data
    }
    async getEventById(eventId) {
        const res = await api.get(`api/events/${eventId}`)
        console.log(res.data)
        AppState.activeEvent = res.data
    }

    async createEvent(newEvent) {
        const res = await api.post('api/events', newEvent)
        console.log(res.data)
        AppState.events.unshift(res.data)

    }

    async getEventComments(eventId) {
        const res = await api.get(`api/events/${eventId}/comments`)
        console.log('getting event comments', res.data)
        AppState.comments = res.data
    }

    async getEventAttendees(eventId) {
        const res = await api.get(`api/events/${eventId}/attendees`)
        console.log('getting event attendees', res.data)
        AppState.attendees = res.data
    }

    async editEvent(editedEvent) {
        const res = await api.put('api/events/' + editedEvent.id, editedEvent)
        console.log('editing this event',)
        AppState.activeEvent = res.data

    }

    async cancelEvent(eventId) {
        const res = await api.delete(`api/events/${eventId}`)
        console.log('cancelling this event', res.data)
        // AppState.activeEvent = res.data
    }
}

export const eventsService = new EventsService()