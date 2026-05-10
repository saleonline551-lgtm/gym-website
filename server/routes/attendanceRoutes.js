const express = require("express");

const Attendance =
require("../models/Attendance");

const router = express.Router();


// MARK ATTENDANCE
router.post("/", async (req, res) => {

  try {

    const attendance =
      await Attendance.create(
        req.body
      );

    res.status(201).json({

      message:
        "Attendance Marked",

      attendance,

    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

});


// GET ATTENDANCE
router.get("/", async (req, res) => {

  try {

    const attendance =
      await Attendance.find()
      .sort({ createdAt: -1 });

    res.status(200).json(
      attendance
    );

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

});


// DELETE ATTENDANCE
router.delete("/:id", async (req, res) => {

  try {

    await Attendance.findByIdAndDelete(
      req.params.id
    );

    res.status(200).json({
      message:
        "Attendance Deleted",
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

});

module.exports = router;