const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DogSchema = Schema(
  {
    reference_id: Number,
    center: {type : Schema.Types.ObjectId, ref: 'Center'},
    name: String,
    breed: String,
    gender: { type: String, enum: ["Macho", "Hembra"] },
    birthday:Date,
    size: { type: String, enum: ["Pequeño", "Mediano", "Grande"] },
    color: String,
    hair: String,
    description: String,
    picture_url: String,
    permiso:{type:String, enum: ["true", "false"],default:"false"}
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
  }
);

const Dog = mongoose.model("Dog", DogSchema);
module.exports = Dog;
