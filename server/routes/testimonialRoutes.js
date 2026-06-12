const express = require("express");

const Testimonial =
require("../models/Testimonial");

const router =
  express.Router();


// CREATE TESTIMONIAL

router.post("/", async (req, res) => {

  try {

    const testimonial =
      await Testimonial.create(
        req.body
      );

    res.status(201).json(testimonial);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

});


// GET ALL TESTIMONIALS

router.get("/", async (req, res) => {

  try {

    const testimonials =
      await Testimonial.find()
      .sort({ createdAt: -1 }).exec();

    res.status(200).json(
      testimonials
    );

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

});


// UPDATE TESTIMONIAL

router.put("/:id", async (req, res) => {

  try {

    const testimonial =
      await Testimonial.findByIdAndUpdate(

        req.params.id,

        req.body,

        {
          new: true,
        }

      ).exec();

    res.status(200).json(
      testimonial
    );

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

});


// DELETE TESTIMONIAL

router.delete("/:id", async (req, res) => {

  try {

    await Testimonial.findByIdAndDelete(
      req.params.id
    ).exec();

    res.status(200).json({

      message:
        "Testimonial Deleted",

    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

});

module.exports = router;