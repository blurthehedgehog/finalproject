const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email:    { type: String, required: true, unique: true },
  country:  { type: String },   
failedLoginAttempts: { type: Number, default: 0 },
lockUntil: { type: Date, default: null },
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);
