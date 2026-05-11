import React from "react";

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Success from "./pages/Success";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

import Dashboard from "./pages/Dashboard";

import Membership from "./pages/Membership";

import Trainer from "./pages/Trainer";

import BMI from "./pages/BMI";

import Contact from "./pages/Contact";

import Payment from "./pages/Payment";

import Admin from "./pages/Admin";

import TrainerAdmin from "./pages/TrainerAdmin";

import AnnouncementAdmin from "./pages/AnnouncementAdmin";

import GalleryAdmin from "./pages/GalleryAdmin";

import DietAdmin from "./pages/DietAdmin";

import AttendanceAdmin from "./pages/AttendanceAdmin";

import ContactAdmin from "./pages/ContactAdmin";

import WorkoutAdmin from "./pages/WorkoutAdmin";

import AdminRoute from "./components/AdminRoute";

import ProtectedRoute from "./components/ProtectedRoute";

function App() {

  return (

    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/membership"
          element={<Membership />}
        />

        <Route
          path="/trainer"
          element={<Trainer />}
        />

        <Route
          path="/bmi"
          element={<BMI />}
        />

        <Route
          path="/contact"
          element={<Contact />}
        />

        <Route
          path="/payment"
          element={<Payment />}
        />

        {/* SUCCESS PAGE */}
        <Route
          path="/success"
          element={<Success />}
        />

        <Route
          path="/admin"
          element={
            <AdminRoute>
              <Admin />
            </AdminRoute>
          }
        />

        <Route
          path="/trainer-admin"
          element={
            <AdminRoute>
              <TrainerAdmin />
            </AdminRoute>
          }
        />

        <Route
          path="/announcement-admin"
          element={
            <AdminRoute>
              <AnnouncementAdmin />
            </AdminRoute>
          }
        />

        <Route
          path="/gallery-admin"
          element={
            <AdminRoute>
              <GalleryAdmin />
            </AdminRoute>
          }
        />

        <Route
          path="/diet-admin"
          element={
            <AdminRoute>
              <DietAdmin />
            </AdminRoute>
          }
        />

        <Route
          path="/attendance-admin"
          element={
            <AdminRoute>
              <AttendanceAdmin />
            </AdminRoute>
          }
        />

        <Route
          path="/contact-admin"
          element={
            <AdminRoute>
              <ContactAdmin />
            </AdminRoute>
          }
        />

        <Route
          path="/workout-admin"
          element={
            <AdminRoute>
              <WorkoutAdmin />
            </AdminRoute>
          }
        />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

      </Routes>

    </BrowserRouter>

  );

}

export default App;