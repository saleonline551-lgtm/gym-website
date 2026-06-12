const express = require("express");

const Workout =
require("../models/Workout");

const router = express.Router();


// CREATE WORKOUT
router.post("/", async (req, res) => {

  try {

    const workout =
      await Workout.create(
        req.body
      );

    res.status(201).json({

      message:
        "Workout Added",

      workout,

    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

});


// GET WORKOUTS
router.get("/", async (req, res) => {

  try {

    const workouts =
      await Workout.find()
      .sort({ createdAt: -1 }).exec();

    res.status(200).json(
      workouts
    );

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

});


// DELETE WORKOUT
router.delete("/:id", async (req, res) => {

  try {

    await Workout.findByIdAndDelete(
      req.params.id
    ).exec();

    res.status(200).json({

      message:
        "Workout Deleted",

    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

});

module.exports = router;