const express = require("express");

const Membership = require("../models/Membership");

const router = express.Router();


// CREATE MEMBERSHIP
router.post("/", async (req, res) => {

  try {

    const membership = await Membership.create(
      req.body
    );

    res.status(201).json({
      message: "Membership Booked",
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

    const memberships = await Membership.find();

    res.status(200).json(memberships);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

});

module.exports = router;