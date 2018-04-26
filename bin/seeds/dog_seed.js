require("dotenv").config();
const dogNames = require("dog-names");
const mongoose = require("mongoose");
const Dog = require("../../models/Dog");
const dog_data = require("./dog_data");
const dBURL = process.env.DBURL;
const APIHandler = require("../../APIHandler/APIHandler");
const dogAPI = new APIHandler("https://dog.ceo/api/breeds");
const moment = require("moment");
const momentRandom = require('moment-random');

const promiseArray = [];
const genders = ["Macho", "Hembra"];
const sizes = ["Pequeño", "Mediano", "Grande"];
const colors = ["Negro", "Blanco", "Marrón","Canela","Gris"];
const breeds = ["Pastor Alemán", "Labrador", "Corgi", "Bulldog", "Mestizo","Galgo"];
const hairs = ["Corto", "Medio", "Largo"]

const prueba = (dog) => {
  return new Promise(resolve => {
    dogAPI.getOneRegister().then(data => {
      dog.picture_url = data.message;
      dog.name = dogNames.allRandom();
      dog.birthday = moment(momentRandom("2018-02-25", "2014-12-25")).format('YYYY MM DD')
      dog.center = "5addb2588cc03f34689efd87";
      dog.gender = genders[Math.round(Math.random())];
      dog.size = sizes[Math.floor(Math.random() * 3)];
      dog.color = colors[Math.floor(Math.random() * 5)];
      dog.breed = breeds[Math.floor(Math.random() * 6)];
      dog.hair = hairs[Math.floor(Math.random() * 3)];
      dog.description = "Morbi eu elit ultricies, tristique purus nec, euismod est. Vivamus aliquam odio eu commodo porta. Duis ultrices magna pellentesque ornare dictum. Nullam arcu neque, mattis id aliquet ac, cursus et lacus. Nulla ut iaculis massa. Aliquam imperdiet ex sem, tristique vulputate ante pretium id. Suspendisse molestie luctus interdum. Quisque ornare arcu dolor, sit amet cursus nisi vestibulum id. Sed cursus a eros viverra iaculis. Aenean in elit ut odio sollicitudin tincidunt. Pellentesque quis dapibus libero. Sed cursus dolor ex, id congue diam porttitor id. Integer sollicitudin eget justo eget viverra. "
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

