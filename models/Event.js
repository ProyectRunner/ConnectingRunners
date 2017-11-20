const mongoose = require('mongoose')
const Schema   = mongoose.Schema

const eventSchema = new Schema({
  eventName: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: Date, default: Date.now },
  lat: String,
  log: String,
  imgUrl: { type: String, default: "https://www.ctchamartin.es/wp-content/uploads/2016/04/running-wallpaper-2.jpg" }
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
})

const Event = mongoose.model('Event', eventSchema)
module.exports = Event
