require("dotenv").config();
const mongoose = require("mongoose");
const User = require("../../models/User");
const user_data = require("./user_data");
const dbURL = process.env.DBURL;

mongoose.connect("mongodb://Madridadopta:1234@ds014808.mlab.com:14808/madrid-adopta").then (() => {
  User.collection.drop();
  
  User.create(user_data)
  .then((user) => {
    console.log(`All the users inserted`, `User list: ${user}`);
    mongoose.disconnect();
  })
  .catch((err) => {
    console.log(err)
  })
})
