const mongoose = require("mongoose");

const fieldNameObj = {
  company: "company",
  position: "position",
  date: "date",
  sentCoverLetter: "sentCoverLetter",
  reachedOut: "reachedOut",
  notes: "notes"
}


const ApplicationSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: [true]
    },
    company: {
      type: String,
      required: [true, fieldNameObj.company + " is required"],
      minLength: [1, fieldNameObj.company + " must be at least 1 character"],
    },
    position: {
      type: String,
      required: [true, fieldNameObj.position + " is required"],
      minLength: [1, fieldNameObj.position + " must be at least 1 character"],
    },
    date: {
      type: Date,
      required: [true, fieldNameObj.date + " is required"]
    },
    sentCoverLetter: {
      type: Boolean,
      required: [true]
    },
    reachedOut: {
      type: Boolean,
      required: [true]
    },
    notes: {
      type: String,
      required: [false],
    }
  },
  { timestamps: true }
);

module.exports = {
  ApplicationModel: mongoose.model("Application", ApplicationSchema),
  ApplicationSchema,
};
