const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DogSchema = Schema({
  reference_id:number,
  center_id: String,
  name: String,
  breed: String,
  gender: {type:String,enum:['Macho','Hembra']},
  age: Number,
  size: {type:String,enum:['Pequeño','Mediano','Grande']},
  color: String,
  hair: String,
  description: String,
  picture_url: String,
 {
  timestamps: {
    createdAt: "created_at",
    updatedAt: "updated_at"
  }
});

const Dog = mongoose.model("Dog", DogSchema);

module.exports = Dog;

