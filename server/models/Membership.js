const mongoose = require("mongoose");

const membershipSchema =
  new mongoose.Schema({

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

    trainer: {
      type: String,
    },

    status: {
      type: String,
      default: "Active",
    },

    joinDate: {
      type: Date,
      default: Date.now,
    },

    expiryDate: {
      type: Date,
    },

    // DAILY WORKOUT

    workoutPlan: {
      type: String,
      default: "",
    },

    // DAILY DIET

    dietPlan: {
      type: String,
      default: "",
    },

  }, {

    timestamps: true,

  });

module.exports =
  mongoose.model(
    "Membership",
    membershipSchema
  );