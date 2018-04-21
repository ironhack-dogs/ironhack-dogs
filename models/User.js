const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = Schema({
  name: String,
  email: String,
  password: String
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
