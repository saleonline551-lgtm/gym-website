const mongoose = require("mongoose");

const membershipSchema = new mongoose.Schema(

  {

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

    status: {
      type: String,
      default: "Active",
    },

  },

  {
    timestamps: true,
  }

);

module.exports = mongoose.model(
  "Membership",
  membershipSchema
);