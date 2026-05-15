const mongoose = require("mongoose");

const membershipSchema = new mongoose.Schema({

  name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
  },

  mobile: {
    type: String,
  },

  plan: {
    type: String,
    required: true,
  },

  amount: {
    type: Number,
    default: 0,
  },

  startDate: {
    type: Date,
    default: Date.now,
  },

  expiryDate: {
    type: Date,
    required: true,
  },

  status: {
    type: String,
    default: "active",
  },

}, {
  timestamps: true,
});

module.exports = mongoose.model(
  "Membership",
  membershipSchema
);