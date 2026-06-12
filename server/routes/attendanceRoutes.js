const express = require("express");

const Attendance = require("../models/Attendance");
const User = require("../models/User");

const router = express.Router();

// MARK ATTENDANCE
router.post("/", async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email }).exec();

    if (!user) {
      return res.status(404).json({
        message: "User Not Found",
      });
    }

    const attendance = await Attendance.create({
      userId: user._id,
      name: user.name,
      email: user.email,
    });

    res.status(201).json({
      message: "Attendance Marked",
      attendance,
    });

  } catch (error) {

    console.log("POST ERROR");
    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
});

// GET ALL ATTENDANCE
router.get("/", async (req, res) => {
try {
const attendance = await Attendance.find()
.sort({ createdAt: -1 })
.exec();


res.status(200).json(attendance);


} catch (error) {

   console.log("==============");
  console.log(error);
  console.log(error.stack);
  console.log("=============="); 

res.status(500).json({
message: error.message,
});
}
});

// GET USER ATTENDANCE HISTORY
router.get("/user/:email", async (req, res) => {
  try {

    const attendance = await Attendance.find({
      email: req.params.email,
    })
      .sort({ createdAt: -1 })
      .exec();

    res.status(200).json(attendance);

  } catch (error) {

    console.log("GET USER ERROR");
    console.log(error);

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
    ).exec();

    res.status(200).json({
      message: "Attendance Deleted",
    });

  } catch (error) {

    console.log("DELETE ERROR");
    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
});
module.exports = router;
