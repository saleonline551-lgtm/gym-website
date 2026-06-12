const express = require("express");

const Gallery =
require("../models/Gallery");

const router = express.Router();


// ADD IMAGE
router.post("/", async (req, res) => {

  try {

    const image =
      await Gallery.create(
        req.body
      );

    res.status(201).json({

      message:
        "Image Added",

      image,

    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

});


// GET IMAGES
router.get("/", async (req, res) => {

  try {

    const images =
      await Gallery.find()
      .sort({ createdAt: -1 })
      .exec();

    res.status(200).json(
      images
    );

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

});


// DELETE IMAGE
router.delete("/:id", async (req, res) => {

  try {

    await Gallery.findByIdAndDelete(
      req.params.id
    ).exec();

    res.status(200).json({
      message: "Image Deleted",
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

});

module.exports = router;