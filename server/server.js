const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config();

const authRoutes =
require("./routes/authRoutes");

const membershipRoutes =
require("./routes/membershipRoutes");

const trainerRoutes =
require("./routes/trainerRoutes");

const announcementRoutes =
require("./routes/announcementRoutes");

const app = express();

app.use(cors());
app.use(express.json());


// ROUTES
app.use(
  "/api/auth",
  authRoutes
);

app.use(
  "/api/membership",
  membershipRoutes
);

app.use(
  "/api/trainers",
  trainerRoutes
);

app.use(
  "/api/announcements",
  announcementRoutes
);


// DATABASE
mongoose.connect(process.env.MONGO_URI)

.then(() =>
  console.log("MongoDB Connected")
)

.catch((err) =>
  console.log(err)
);


// TEST ROUTE
app.get("/", (req, res) => {

  res.send("Gym API Running");

});


// SERVER
const PORT =
process.env.PORT || 5000;

app.listen(PORT, () => {

  console.log(
    `Server running on ${PORT}`
  );

});