const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // Insecure without hashing
  phone: { type: String, required: true },
  role: { type: String, enum: ["student", "instructor", "admin"], default: "student" },
  dob: { type: Date, required: true },
  gender: { type: String, enum: ["Male", "Female", "Other"], required: true },
});

const User = mongoose.model("User", UserSchema);
module.exports = User;
