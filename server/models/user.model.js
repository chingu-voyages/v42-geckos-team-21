const mongoose = require("mongoose");
const bcrypt = require("bcrypt")

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

// creates a virtual field used JUST for validations, this is not saved in the database ['confirmPassword'] needs to match field in postman/frontend form
UserSchema.virtual('confirmPassword')
  .get( ()=> this._confirmPassword)
  .set( value => this._confirmPassword = value)

// before(pre) running other model validations [required: true]
// validate if confirm password matches password 
UserSchema.pre('validate', function(next){
  if (this.password !== this.get('confirmPassword')) {
    // creates a validation error message (similar to above required: [true, "error message"])
    this.invalidate('confirmPassword', 'Passwords must match')
  }
  next()
})

// before(pre) saving to database, encrypt the users password
UserSchema.pre('save', function(next) {
  bcrypt
    .hash(this.password, 10)
    .then( hash => { 
      this.password = hash
      next()
    })
})

module.exports = mongoose.model("User", UserSchema);
