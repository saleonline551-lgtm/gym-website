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

  plan: {
    type: String,
    required: true,
  },

}, {
  timestamps: true,
});

module.exports = mongoose.model(
  "Membership",
  membershipSchema
);