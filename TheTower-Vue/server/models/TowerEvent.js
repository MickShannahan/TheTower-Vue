import mongoose from 'mongoose'

const Schema = mongoose.Schema

export const TowerEventSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  coverImg: { type: String, required: true },
  location: { type: String, required: true },
  capacity: { type: Number, required: true },
  startDate: { type: Date, required: true },
  isCanceled: { type: Boolean, required: true, default: false },
  // FIXME
  type: { type: String, enum: ['Concert', 'concert', 'Sport', 'sport', 'Convention', 'convention', 'Digital', 'digital', 'Expos', 'expos'] },
  creatorId: { type: Schema.Types.ObjectId, ref: 'Profile', required: true }

}, { timestamps: true, toJSON: { virtuals: true } }
)

TowerEventSchema.virtual('creator', {
  localField: 'creatorId',
  foreignField: '_id',
  ref: 'Profile',
  justOne: true
})

TowerEventSchema.virtual('ticketCount', {
  localField: '_id',
  foreignField: 'eventId',
  ref: 'TowerEvent',
  count: true
})
