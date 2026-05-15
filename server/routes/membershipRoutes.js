const express = require("express");

const Membership =
require("../models/Membership");

const router = express.Router();


// CREATE MEMBERSHIP

router.post("/", async (req, res) => {

  try {

    const {
      name,
      email,
      mobile,
      plan,
      amount
    } = req.body;

    // START DATE

    const startDate =
      new Date();

    // EXPIRY DATE

    const expiryDate =
      new Date();

    // PLAN LOGIC

    if (plan === "Monthly") {

      expiryDate.setDate(
        expiryDate.getDate() + 30
      );

    } else if (plan === "Quarterly") {

      expiryDate.setDate(
        expiryDate.getDate() + 90
      );

    } else if (plan === "Yearly") {

      expiryDate.setDate(
        expiryDate.getDate() + 365
      );

    }

    // CREATE MEMBERSHIP

    const membership =
      await Membership.create({

        name,
        email,
        mobile,
        plan,
        amount,

        startDate,

        expiryDate,

        status: "active",

        // DAILY WORKOUT

        workoutPlan: "",

        // DAILY DIET

        dietPlan: "",

      });

    res.status(201).json({

      message:
        "Membership Activated Successfully",

      membership,

    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

});


// GET ALL MEMBERSHIPS

router.get("/", async (req, res) => {

  try {

    const memberships =
      await Membership.find();

    // AUTO EXPIRE CHECK

    const updatedMemberships =
      memberships.map((m) => {

        if (
          new Date(m.expiryDate) <
          new Date()
        ) {

          m.status = "expired";

        }

        return m;

      });

    res.status(200).json(
      updatedMemberships
    );

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

});


// GET SINGLE CUSTOMER

router.get(
  "/customer/:email",

  async (req, res) => {

    try {

      const customer =
        await Membership.findOne({

          email:
            req.params.email,

        });

      if (!customer) {

        return res.status(404).json({

          message:
            "Customer Not Found",

        });

      }

      res.status(200).json(
        customer
      );

    } catch (error) {

      res.status(500).json({
        message: error.message,
      });

    }

  }
);


// UPDATE WORKOUT & DIET PLAN

router.put(
  "/update-plan/:id",

  async (req, res) => {

    try {

      const {
        workoutPlan,
        dietPlan
      } = req.body;

      const membership =
        await Membership.findByIdAndUpdate(

          req.params.id,

          {

            workoutPlan,

            dietPlan,

          },

          {
            new: true,
          }

        );

      res.status(200).json({

        message:
          "Workout & Diet Updated",

        membership,

      });

    } catch (error) {

      res.status(500).json({
        message: error.message,
      });

    }

  }
);


// RENEW MEMBERSHIP

router.put("/renew/:id", async (req, res) => {

  try {

    const membership =
      await Membership.findById(
        req.params.id
      );

    if (!membership) {

      return res.status(404).json({
        message:
          "Membership Not Found",
      });

    }

    // NEW EXPIRY

    const newExpiryDate =
      new Date(
        membership.expiryDate
      );

    if (
      membership.plan === "Monthly"
    ) {

      newExpiryDate.setDate(
        newExpiryDate.getDate() + 30
      );

    } else if (
      membership.plan === "Quarterly"
    ) {

      newExpiryDate.setDate(
        newExpiryDate.getDate() + 90
      );

    } else if (
      membership.plan === "Yearly"
    ) {

      newExpiryDate.setDate(
        newExpiryDate.getDate() + 365
      );

    }

    membership.expiryDate =
      newExpiryDate;

    membership.status =
      "active";

    await membership.save();

    res.status(200).json({

      message:
        "Membership Renewed Successfully",

      membership,

    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

});


// DELETE MEMBERSHIP

router.delete("/:id", async (req, res) => {

  try {

    await Membership.findByIdAndDelete(
      req.params.id
    );

    res.status(200).json({

      message:
        "Membership Deleted",

    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

});

module.exports = router;