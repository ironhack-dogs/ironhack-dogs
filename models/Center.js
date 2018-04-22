const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CenterSchema = Schema({
  name: String,
  admin_id: String,
  authorized: {type:Boolean,default:false},
  location: { type: { type: String }, coordinates: [Number] },
  phone: Number,
  email: String,
  website_url: String,
  description: String,
  logo_url: String,
  banner_url: String,
  role: {type:String,enum:['User','Admin','Superadmin'],default:'User'},                             {
  timestamps: {
    createdAt: "created_at",
    updatedAt: "updated_at"
  }
});

const Center = mongoose.model("Center", CenterSchema);
CenterSchema.index({ location: "2dsphere" });

module.exports = Center;
