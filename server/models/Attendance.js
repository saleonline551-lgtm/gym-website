const mongoose = require("mongoose");

const attendanceSchema =
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

      status: {
        type: String,
        default: "Present",
      },

      date: {
        type: Date,
        default: Date.now,
      },

    },

    {
      timestamps: true,
    }

  );

module.exports = mongoose.model(
  "Attendance",
  attendanceSchema
);