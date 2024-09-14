const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const { Schema } = mongoose;

// Email regex pattern
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

// Define the user schema
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true, // Ensures unique usernames
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true, // Ensures unique emails
      trim: true,
      lowercase: true,
      match: [emailRegex, "Please enter a valid email address"], // Custom validation
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// Hash the password before saving the user
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    const salt = await bcrypt.genSalt(12); // Increase salt rounds for security
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Create and export the User model
const User = mongoose.model("User", userSchema);

module.exports = User;
