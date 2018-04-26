require("dotenv").config();
const mongoose = require("mongoose");
const Center = require("../../models/Center");
const center_data = require("./center_data");
mongoose.connect("mongodb://Madridadopta:1234@ds014808.mlab.com:14808/madrid-adopta").then (() => {
  Center.collection.drop();
  
  Center.create(center_data)
  .then((center) => {
    console.log(`All the centers inserted`, `Center list: ${center}`);
    mongoose.disconnect();
  })
  .catch((err) => {
    console.log(err)
  })
})
