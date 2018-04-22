const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CenterSchema = Schema({
  name: String,
  admin_id: String,
  authorized: {type:Boolean,default:false},
  address: String,
  lat: Number,
  long: Number,
  phone: Number,
  email: String,
  website_url: String,
  description: String,
  logo_url: String,
  banner_url: String,
  role: {type:String,enum:['User','Admin','Superadmin'],default:'User'}
});

const Center = mongoose.model("Center", UserSchema);

module.exports = Center;
