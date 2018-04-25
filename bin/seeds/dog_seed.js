require("dotenv").config();
const dogNames = require("dog-names");
const mongoose = require("mongoose");
const Dog = require("../../models/Dog");
const dog_data = require("./dog_data");
const dbURL = "mongodb://localhost/madridadopta";
const APIHandler = require("../../APIHandler/APIHandler");
const dogAPI = new APIHandler("https://dog.ceo/api/breeds");
const moment = require("moment");
const momentRandom = require('moment-random');

const promiseArray = [];
const genders = ["Macho", "Hembra"];
const sizes = ["Pequeño", "Mediano", "Grande"];
const breeds = ["Pastor Aleman", "Labrador", "Corgi", "Bulldog", "Mestizo"];
const hairs = ["Corto", "Medio", "Largo"]

const prueba = (dog) => {
  return new Promise(resolve => {
    dogAPI.getOneRegister().then(data => {
      dog.picture_url = data.message;
      dog.name = dogNames.allRandom();
      dog.birthday = moment(momentRandom("2015-12-25", "2000-12-25")).format('YYYY MM DD')
      dog.center = "5addb2588cc03f34689efd87"
      dog.gender = genders[Math.round(Math.random())];
      dog.size = sizes[Math.floor(Math.random() * 3)];
      dog.breed = breeds[Math.floor(Math.random() * 5)];
      dog.hair = hairs[Math.floor(Math.random() * 3)]
      resolve(dog);
    });
  });
};

dog_data.forEach(dog => {
  promiseArray.push(prueba(dog));
});
Promise.all(promiseArray)
  .then(() => {
    mongoose.connect(dbURL).then(() => {
      Dog.collection.drop();
      Dog.create(dog_data)
        .then(dog => {
          console.log(`All the dogs inserted`);
          mongoose.disconnect();
        })
        .catch(err => {
          console.log(err);
        });
    });
  })
  .catch(e => console.log("Error " + e));

