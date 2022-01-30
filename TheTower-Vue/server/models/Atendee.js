import mongoose from 'mongoose'

const Schema = mongoose.Schema

export const AtendeeSchema = new Schema({
    eventId: { type: Schema.Types.ObjectId, ref: 'TowerEvent', required: true },
    accountId: { type: Schema.Types.ObjectId, ref: 'Account', required: true }
}, { timestamps: true, toJSON: { virtuals: true } }
)

AtendeeSchema.index({ accountId: 1, eventId: 1 }, { unique: true })

AtendeeSchema.virtual('atendee', {
    foreignField: '_id',
    localField: 'accountId',
    justOne: true,
    ref: 'Account'
})

AtendeeSchema.virtual('event', {
    foreignField: '_id',
    localField: 'eventId',
    justOne: true,
    ref: 'TowerEvent'
})




