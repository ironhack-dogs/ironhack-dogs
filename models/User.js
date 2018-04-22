const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = Schema({
  username: String,
  email: String,
  password: String,
  name: String,
  surname: String,
  picture_url: String,
  role: {type:String,enum:['User','Admin','Superadmin'],default:'User'}
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
