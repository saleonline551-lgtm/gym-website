const mongoose = require("mongoose");

const membershipPlanSchema =
  new mongoose.Schema(

    {

      title: {
        type: String,
        required: true,
      },

      price: {
        type: String,
        required: true,
      },

      duration: {
        type: String,
        required: true,
      },

      features: [
        {
          type: String,
        },
      ],

    },

    {
      timestamps: true,
    }

  );

module.exports = mongoose.model(
  "MembershipPlan",
  membershipPlanSchema
);