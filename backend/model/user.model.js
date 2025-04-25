const { Schema, model } = require("mongoose");

const useScema = new Schema(
  {
    name: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
      unique: true,
    },
    password: {
      type: String,
      require: true,
    },
  
    role: {
      type: String,
      default: "user",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);
const userModel = model("user", useScema);
module.exports = userModel;
