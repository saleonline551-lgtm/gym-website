const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const helmet = require("helmet");
const compression = require("compression");
const rateLimit = require("express-rate-limit");
const hpp = require("hpp");

require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const membershipRoutes = require("./routes/membershipRoutes");
const trainerRoutes = require("./routes/trainerRoutes");
const announcementRoutes = require("./routes/announcementRoutes");
const galleryRoutes = require("./routes/galleryRoutes");
const dietRoutes = require("./routes/dietRoutes");
const attendanceRoutes = require("./routes/attendanceRoutes");
const contactRoutes = require("./routes/contactRoutes");
const workoutRoutes = require("./routes/workoutRoutes");

const membershipPlanRoutes = require("./routes/membershipPlanRoutes");
const testimonialRoutes = require("./routes/testimonialRoutes");
const aboutGymRoutes = require("./routes/aboutGymRoutes");

const app = express();

app.disable("x-powered-by");



app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://gym-website.vercel.app",
      "https://gym-website-eta-nine.vercel.app"
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);


app.use(express.json({limit: "10kb"}));
/* SECURITY */

app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);

app.use(compression());

app.use(hpp());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: {
    message: "Too many requests. Please try again later.",
  },
});

app.use(limiter);

app.use((req, res, next) => {
  res.setHeader("Cache-Control", "no-store");
  next();
});

/* API ROUTES */

app.use("/api/auth", authRoutes);
app.use("/api/membership", membershipRoutes);
app.use("/api/trainers", trainerRoutes);
app.use("/api/announcements", announcementRoutes);
app.use("/api/gallery", galleryRoutes);
app.use("/api/diets", dietRoutes);
app.use("/api/attendance", attendanceRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/workouts", workoutRoutes);

app.use("/api/membership-plans", membershipPlanRoutes);
app.use("/api/testimonials", testimonialRoutes);
app.use("/api/about-gym", aboutGymRoutes);

/* DATABASE */

mongoose
.connect(process.env.MONGO_URI)
.then(() => {
console.log("MongoDB Connected");
})
.catch((err) => {
console.log(err);
});

/* TEST ROUTE */

app.get("/", (req, res) => {
res.send("Gym API Running");
});

/* SERVER */

const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV !== "test") {
app.listen(PORT, () => {
console.log(`Server running on ${PORT}`);
});
}

module.exports = app;
