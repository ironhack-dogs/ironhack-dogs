const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CenterSchema = Schema({
  centerName: { type: String, required: true },
  telephoneNumber: { type: String },
  location: { type: { type: String }, coordinates: [Number] },
  admin: String
}, {
  timestamps: {
    createdAt: "created_at",
    updatedAt: "updated_at"
  }
});

const Center = mongoose.model("Center", CenterSchema);
CenterSchema.index({ location: "2dsphere" });

module.exports = Center;
