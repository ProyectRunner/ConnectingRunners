const mongoose = require('mongoose')
const Schema   = mongoose.Schema
const OBJECTIVES   = require('./running-objectives');

const userSchema = new Schema({
  name: String,
  username: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true},
  objectives: [{ type: String, enum: OBJECTIVES }],
  aboutMe: String,
  city: String,
  follow: { type: Number, default: 0 },
  followers: { type: Number, default: 0 },
  imgUrl: { type: String, default: "https://jsns.eu/components/com_jsn/assets/img/default.jpg" }
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
})

const User = mongoose.model('User', userSchema)
module.exports = User
