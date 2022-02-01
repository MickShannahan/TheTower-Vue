import { api } from "./AxiosService";
import { AppState } from "../AppState";

class AttendeesService {

    async addAttendee() {
        const res = await api.post('api/attendees')
        console.log('attending', res.data)
        AppState.attendees = res.data
    }

    async removeAttendee(attendeeId) {
        const res = await api.delete(`api/attendees/${attendeeId}`)
        console.log('unattending', res.data)
        AppState.attendees.filter(a => a.id !== attendeeId)
    }

}

export const attendeesService = new AttendeesService()