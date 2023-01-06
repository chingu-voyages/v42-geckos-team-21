const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "is required"],
    },
    lastName: {
      type: String,
      required: [true, "is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      validate: {
        validator: (val) => /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(val),
        message: "Please enter a valid email",
      },
    },
    password: {
      type: String,
      required: [true, "is required"],
    },
  },
  // created at, updated at
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
