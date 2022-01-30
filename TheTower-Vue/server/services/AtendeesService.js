import { dbContext } from "../db/DbContext";
import { BadRequest } from "../utils/Errors";


class AtendeesService {

    async createAtendee(newAtendee) {
        const createdAtendee = await dbContext.Atendees.create(newAtendee)
        await createdAtendee.populate('atendee', 'name picture').populate('event')
        return createdAtendee
    }

}

export const atendeesService = new AtendeesService()