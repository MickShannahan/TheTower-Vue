import { api } from "./AxiosService"
import { AppState } from "../AppState"
import { logger } from "../utils/Logger"


class EventsService {
    async getEvents() {
        const res = await api.get('api/events/')
        console.log(res.data)

    }


}

export const eventsService = new EventsService()