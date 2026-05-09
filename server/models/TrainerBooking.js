const mongoose = require("mongoose");

const trainerBookingSchema =
  new mongoose.Schema(

    {

      name: {
        type: String,
        required: true,
      },

      email: {
        type: String,
        required: true,
      },

      trainer: {
        type: String,
        required: true,
      },

      timing: {
        type: String,
        required: true,
      },

      status: {
        type: String,
        default: "Booked",
      },

    },

    {
      timestamps: true,
    }

  );

module.exports = mongoose.model(
  "TrainerBooking",
  trainerBookingSchema
);