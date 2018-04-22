const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DogSchema = Schema({
  name: { type: String, required: true },
  center: { type: String, required: true },
  breed: { type: String, required: true },
  birthday: Date,
  imgUrl: String
}, {
  timestamps: {
    createdAt: "created_at",
    updatedAt: "updated_at"
  }
});

const Dog = mongoose.model("Dog", DogSchema);

module.exports = Dog;