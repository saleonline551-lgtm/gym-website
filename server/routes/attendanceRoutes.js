const express = require("express");

const Attendance =
require("../models/Attendance");

const User =
require("../models/User");

const router = express.Router();


// MARK ATTENDANCE

router.post("/", async (req, res) => {

  try {

    const {
      email
    } = req.body;

    // FIND USER

    const user =
      await User.findOne({
        email
      });

    if (!user) {

      return res.status(404).json({

        message:
          "User Not Found",

      });

    }

    // SAVE ATTENDANCE

    const attendance =
      await Attendance.create({

        userId:
          user._id,

        name:
          user.name,

        email:
          user.email,

      });

    res.status(201).json({

      message:
        "Attendance Marked",

      attendance,

    });

  } catch (error) {

    res.status(500).json({

      message:
        error.message,

    });

  }

});


// GET ALL ATTENDANCE

router.get("/", async (req, res) => {

  try {

    const attendance =
      await Attendance.find()
      .sort({
        createdAt: -1
      });

    res.status(200).json(
      attendance
    );

  } catch (error) {

    res.status(500).json({

      message:
        error.message,

    });

  }

});


// GET USER ATTENDANCE HISTORY

router.get("/user/:email", async (req, res) => {

  try {

    const attendance =
      await Attendance.find({

        email:
          req.params.email,

      }).sort({
        createdAt: -1
      });

    res.status(200).json(
      attendance
    );

  } catch (error) {

    res.status(500).json({

      message:
        error.message,

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

      message:
        error.message,

    });

  }

});

module.exports = router;