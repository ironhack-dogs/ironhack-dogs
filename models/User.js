const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true },
    telephoneNumber: { type: String },
    password: { type: String, required: true },
    name: String,
    surname: String,
    picture_url: String,
    isAdmin: { type: Boolean, default: false },
    favorites: [{ type : Schema.Types.ObjectId, ref: 'Dog', default: [] }],
    role: {
      type: String,
      enum: ["User", "Admin", "Superadmin"],
      default: "User"
    }
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
  }
);

const User = mongoose.model("User", UserSchema);

module.exports = User;
