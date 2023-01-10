const mongoose = require("mongoose");

const ApplicationSchema = new mongoose.Schema(
  {
    userId: String,
    title: {
      type: String,
      required: [true, "Title is required"],
      minLength: [5, "Title must be at least 5 characters"],
    },
    company: {
      type: String,
      required: [true, "Company is required"],
      minLength: [5, "Company must be at least 5 characters"],
    },
    status: String,
  },
  { timestamps: true }
);

module.exports = {
  ApplicationModel: mongoose.model("Application", ApplicationSchema),
  ApplicationSchema,
};
