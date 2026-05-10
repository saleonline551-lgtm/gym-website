const express = require("express");

const Membership =
require("../models/Membership");

const router = express.Router();


// CREATE MEMBERSHIP
router.post("/", async (req, res) => {

  try {

    const joinDate =
      new Date();

    const expiryDate =
      new Date();

    expiryDate.setMonth(
      expiryDate.getMonth() + 1
    );

    const membership =
      await Membership.create({

        ...req.body,

        joinDate,

        expiryDate,

      });

    res.status(201).json({

      message:
        "Membership Booked",

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

    res.status(200).json(
      memberships
    );

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

});


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

    const newExpiryDate =
      new Date(
        membership.expiryDate
      );

    newExpiryDate.setMonth(
      newExpiryDate.getMonth() + 1
    );

    membership.expiryDate =
      newExpiryDate;

    await membership.save();

    res.status(200).json({

      message:
        "Membership Renewed",

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