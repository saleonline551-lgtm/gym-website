const express = require("express");

const Announcement =
require("../models/Announcement");

const router = express.Router();


// CREATE ANNOUNCEMENT
router.post("/", async (req, res) => {

  try {

    const announcement =
      await Announcement.create(
        req.body
      );

    res.status(201).json({

      message:
        "Announcement Posted",

      announcement,

    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

});


// GET ALL ANNOUNCEMENTS
router.get("/", async (req, res) => {
  try {
    const announcements = await Announcement
      .find()
      .sort({ createdAt: -1 })
      .exec();

    res.status(200).json(announcements);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});


// DELETE ANNOUNCEMENT
router.delete("/:id", async (req, res) => {
  try {
    await Announcement
      .findByIdAndDelete(req.params.id)
      .exec();

    res.status(200).json({
      message: "Announcement Deleted",
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;