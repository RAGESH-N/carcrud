const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true, validate: { validator: v => /^\d{10}$/.test(v) }},
  email: { type: String, required: true, unique: true, validate: { validator: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) }},
  password: { type: String, required: true },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  loyaltyPoints: { type: Number, default: 0 },
  eligibleForDiscountedRides: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
