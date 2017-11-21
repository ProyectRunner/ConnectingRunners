const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const relUserEventSchema = new Schema({
  eventId: { type: Schema.Types.ObjectId, ref: 'Event'},
  userId : { type: Schema.Types.ObjectId, ref: 'User'},
  }, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const RelUserEvent = mongoose.model('RelUserEvent', relUserEventSchema);
module.exports = RelUserEvent;
