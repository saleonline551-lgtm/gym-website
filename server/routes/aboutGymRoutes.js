const express = require("express");

const AboutGym =
require("../models/AboutGym");

const router =
  express.Router();


// CREATE ABOUT DATA

router.post("/", async (req, res) => {

  try {

    const about =
      await AboutGym.create(
        req.body
      );

    res.status(201).json(
      about
    );

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

});


// GET ABOUT DATA

router.get("/", async (req, res) => {

  try {

    const about =
      await AboutGym.findOne();

    res.status(200).json(
      about
    );

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

});


// UPDATE ABOUT DATA

router.put("/:id", async (req, res) => {

  try {

    const about =
      await AboutGym.findByIdAndUpdate(

        req.params.id,

        req.body,

        {
          new: true,
        }

      );

    res.status(200).json(
      about
    );

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

});


// DELETE ABOUT DATA

router.delete("/:id", async (req, res) => {

  try {

    await AboutGym.findByIdAndDelete(
      req.params.id
    );

    res.status(200).json({

      message:
        "About Gym Deleted",

    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

});

module.exports = router;