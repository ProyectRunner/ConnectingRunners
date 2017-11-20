const mongoose = require('mongoose')
const Schema   = mongoose.Schema
const OBJECTIVES   = require('./running-objetives');

const userSchema = new Schema({
  name: String,
  username: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true},
  objetives: { type: String, enum: OBJECTIVES },
  events : { type: Schema.Types.ObjectId, ref: 'Event'},
  aboutMe: String,
  city: String,
  comment: { type: Schema.Types.ObjectId, ref: 'Comment'},
  follow: { type: Number, default: 0 },
  followers: { type: Number, default: 0 },
  imgUrl: { type: String, default: "https://placeholdit.imgix.net/~text?txtsize=33&txt=250%C3%97250&w=250&h=250" }
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
})

const User = mongoose.model('User', userSchema)
module.exports = User
