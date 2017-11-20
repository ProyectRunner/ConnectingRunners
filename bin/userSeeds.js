const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/dbName');
const User = require('../models/User');
const Comment = require('../models/Comment');
const Event = require('../models/Event');
const bcrypt         = require("bcrypt");
const bcryptSalt     = 10;
const salt = bcrypt.genSaltSync(bcryptSalt);

const password = "ironhack";
const encryptedPass = bcrypt.hashSync(password, salt);



const runnersData = [
  {name: 'Clementina',
  username: 'Clementina',
  password: encryptedPass,
  email: 'mataclemy@gmail.com',
  objectives:'10K',
  events: [],
  aboutMe: 'Awesome',
  city: 'Madrid',
  comment: [],
  follow: 9,
  followers: 8,
  imgUrl: 'http://www.runners.es/media/cache/original/upload/images/paragrapharticle/10520/paragrapharticle-28737-58ca98bd7f619.jpg',
 },

 {name: 'Cami',
 username: 'Cami',
 password: encryptedPass,
 email: 'cami@gmail.com',
 objectives:'media maratón',
 events:[],
 aboutMe: 'Too cool',
 city: 'Madrid',
 comment: [],
 follow: 10,
 followers: 9,
 imgUrl: 'http://stuffhappens.us/wp-content/uploads/2014/06/1-Alf.jpg',
}
];

User.create(runnersData)
  .then(events => {
    return Promise.all(events.map(runnersData => {
      return User.updateMany({}, {
          $push: {
            events: events._id
          }
        })
        .exec()
        .then(runnersData => {
          console.log(runnersData);
        });
    }));
  })

  .then(comment => {
    return Promise.all(comment.map(runnersData => {
      return User.updateMany({}, {
          $push: {
            events: comment._id
          }
        })
        .exec()
        .then(runnersData => {
          console.log(runnersData);
        });
    }));
  })

  .then((user) => {
    console.log("Pushed events and comment to user");
    mongoose.connection.close();
  })
  .catch(e => console.log(e));
