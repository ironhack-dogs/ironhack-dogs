const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CenterSchema = Schema(
  {
    name: String,
    admin_id: String,
    address:String,
    location: { type: { type: String }, coordinates: [Number] },
    phone: String,
    email: String,
    website_url: String,
    facebook_url: String,
    twitter_handle: String,
    instagram_handle: String,
    description: String,
    logo_url: String,
    banner_url: String
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
  }
);

const Center = mongoose.model("Center", CenterSchema);
CenterSchema.index({ location: "2dsphere" });

module.exports = Center;
