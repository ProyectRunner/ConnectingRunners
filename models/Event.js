const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const eventSchema = new Schema({
  eventName: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: Date, default: Date.now },
  website: String,
  place: String,
  imgUrl: { type: String, default: "uploads/img-default-event.jpg" },
  lat: Number,
  log: Number,
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const Event = mongoose.model('Event', eventSchema);
module.exports = Event;
