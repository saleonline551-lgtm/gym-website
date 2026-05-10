const express = require("express");

const Diet =
require("../models/Diet");

const router = express.Router();


// CREATE DIET
router.post("/", async (req, res) => {

  try {

    const diet =
      await Diet.create(
        req.body
      );

    res.status(201).json({

      message:
        "Diet Plan Added",

      diet,

    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

});


// GET DIETS
router.get("/", async (req, res) => {

  try {

    const diets =
      await Diet.find()
      .sort({ createdAt: -1 });

    res.status(200).json(
      diets
    );

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

});


// DELETE DIET
router.delete("/:id", async (req, res) => {

  try {

    await Diet.findByIdAndDelete(
      req.params.id
    );

    res.status(200).json({
      message:
        "Diet Deleted",
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

});

module.exports = router;