const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/dbName');
const User = require('../models/User');
const Comment = require('../models/Comment');
const Event = require('../models/Event');
const bcrypt         = require("bcrypt");
const bcryptSalt     = 10;
const salt = bcrypt.genSaltSync(bcryptSalt);

const password = "1234";
const encryptedPass = bcrypt.hashSync(password, salt);



const runnersData = [
  {name: 'Clementina',
  username: 'Clementina',
  password: encryptedPass,
  email: 'mataclemy@gmail.com',
  aboutMe: 'Awesome',
  city: 'Madrid',
  follow: 9,
  followers: 8,
  imgUrl: 'http://www.runners.es/media/cache/original/upload/images/paragrapharticle/10520/paragrapharticle-28737-58ca98bd7f619.jpg',
 },

 {name: 'Cami',
 username: 'Cami',
 password: encryptedPass,
 email: 'cami@gmail.com',
 aboutMe: 'Too cool',
 city: 'Madrid',
 follow: 10,
 followers: 9,
 imgUrl: 'http://stuffhappens.us/wp-content/uploads/2014/06/1-Alf.jpg',
}
];

const eventData = [
{ eventName: 'Carrera de Aranjuez - 10K',
  description: 'XXXIV CARRERA POPULAR "VILLA DE ARANJUEZ" - Una vez más, mantenemos el mismo recorrido que en ediciones anteriores. Dada la enorme acogida que tiene entre los participantes y la belleza y encantos de sus paisajes. Para nosotros es un orgullo que cada año sea más reconocida nuestra carrera.',
  date: '2017-12-17',
  lat: 40.029924,
  log: -3.600024,
  website: 'http://www.carrerapopulararanjuez.com',
  participants: [],
  imgUrl: 'uploads/1200-woman-running-on-road.jpg'
},
{ eventName: 'San Silvestre Vallecana',
  description: 'La gran fiesta del running popular. Apúntate ya y vive, junto a 40.000 personas, la experiencia de correr la mejor carrera de 10K del mundo.',
  date: '2017-12-31',
  lat: 40.416729,
  log: -3.703667,
  website: 'https://sansilvestrevallecana.com/',
  participants: [],
  imgUrl: 'uploads/1200-woman-running-on-road.jpg'
},
];

User.create(runnersData)
  .then(users => {
    users.forEach(e => {
      let objectivesOptions = [ "empezar a correr", "10K", "media maratón", "maratón", "trail", "correr por diversión"];
      let objectiveChoose = objectivesOptions[Math.floor(Math.random()*objectivesOptions.length)];
      User.updateOne({_id: e._id}, {$push: {'objectives': objectiveChoose}}, (err, response) => {
        eventData.forEach(event => {
          event['creator'] = users[Math.floor(Math.random()*users.length)]._id;
          let newEvent = new Event(event);
          newEvent.save()
          .then(userSaved => {
            console.log(userSaved);
          });
        });
      });
    });
  })

  .then((user) => {
    console.log("Pushed events and comment to user");
    //mongoose.connection.close();
  })
  .catch(e => console.log(e));
