const mongoose = require("mongoose");

const workoutSchema =
  new mongoose.Schema(

    {

      title: {
        type: String,
        required: true,
      },

      category: {
        type: String,
        required: true,
      },

      exercises: {
        type: String,
        required: true,
      },

    },

    {
      timestamps: true,
    }

  );

module.exports = mongoose.model(
  "Workout",
  workoutSchema
);