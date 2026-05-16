const mongoose = require("mongoose");

const aboutGymSchema =
  new mongoose.Schema(

    {

      title: {
        type: String,
        required: true,
      },

      description: {
        type: String,
        required: true,
      },

      experience: {
        type: String,
        required: true,
      },

      trainers: {
        type: String,
        required: true,
      },

      members: {
        type: String,
        required: true,
      },

    },

    {
      timestamps: true,
    }

  );

module.exports = mongoose.model(
  "AboutGym",
  aboutGymSchema
);