require("dotenv").config();
const mongoose = require("mongoose");
const Dog = require("../../models/Dog");
const dog_data = require("./dog_data");
const dbURL = "mongodb://localhost/madridadopta";

mongoose.connect(dbURL).then (() => {
  Dog.collection.drop();
  
  Dog.create(dog_data)
  .then((dog) => {
    console.log(`All the dogs inserted`, `Dog list: ${dog}`);
    mongoose.disconnect();
  })
  .catch((err) => {
    console.log(err)
  })
})
