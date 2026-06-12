const express = require("express");

const Contact =
require("../models/Contact");

const router = express.Router();


// SEND MESSAGE
router.post("/", async (req, res) => {

  try {

    const contact =
      await Contact.create(
        req.body
      );

    res.status(201).json({

      message:
        "Message Sent Successfully",

      contact,

    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

});


// GET ALL MESSAGES
router.get("/", async (req, res) => {

  try {

    const contacts =
      await Contact.find()
      .sort({ createdAt: -1 })
      .exec();

    res.status(200).json(
      contacts
    );

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

});


// DELETE MESSAGE
router.delete("/:id", async (req, res) => {

  try {

    await Contact.findByIdAndDelete(
      req.params.id
    ).exec();

    res.status(200).json({

      message:
        "Message Deleted",

    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

});

module.exports = router;