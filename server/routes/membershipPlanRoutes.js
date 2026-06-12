const express = require("express");

const MembershipPlan =
require("../models/MembershipPlan");

const router =
  express.Router();


// CREATE PLAN

router.post("/", async (req, res) => {

  try {

    const plan =
      await MembershipPlan.create(
        req.body
      );

    res.status(201).json(plan);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

});


// GET ALL PLANS

router.get("/", async (req, res) => {

  try {

    const plans =
      await MembershipPlan.find()
      .sort({ createdAt: -1 })
      .exec();

    res.status(200).json(plans);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

});


// UPDATE PLAN

router.put("/:id", async (req, res) => {

  try {

    const plan =
      await MembershipPlan.findByIdAndUpdate(

        req.params.id,

        req.body,

        {
          new: true,
        }

      ).exec();

    res.status(200).json(plan);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

});


// DELETE PLAN

router.delete("/:id", async (req, res) => {

  try {

    await MembershipPlan.findByIdAndDelete(
      req.params.id
    ).exec();

    res.status(200).json({

      message:
        "Plan Deleted",

    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

});

module.exports = router;