const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RequestSchema = Schema(
  {
    user: [{ type: Schema.Types.ObjectId, ref: "User" }],
    subject: String,
    status: {
      type: String,
      enum: ["Accepted", "Pending", "Denied"],
      default: "Pending"
    },
    message: String
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
  }
);

const Request = mongoose.model("Request", RequestSchema);
module.exports = Request;
