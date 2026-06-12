const express = require("express");

const TrainerBooking =
require("../models/TrainerBooking");

const router = express.Router();


// CREATE BOOKING
router.post("/", async (req, res) => {

  try {

    const booking =
      await TrainerBooking.create(
        req.body
      );

    res.status(201).json({

      message:
        "Trainer Booked Successfully",

      booking,

    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

});


// GET BOOKINGS
router.get("/", async (req, res) => {

  try {

    const bookings =
      await TrainerBooking.find().exec();

    res.status(200).json(bookings);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

});


// DELETE BOOKING
router.delete("/:id", async (req, res) => {

  try {

    await TrainerBooking.findByIdAndDelete(
      req.params.id
    ).exec();

    res.status(200).json({
      message: "Booking Deleted",
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

});

module.exports = router;