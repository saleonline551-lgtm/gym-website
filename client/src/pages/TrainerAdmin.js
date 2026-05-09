import React, {
  useEffect,
  useState
} from "react";

import axios from "axios";

import {
  useNavigate
} from "react-router-dom";

function TrainerAdmin() {

  const navigate =
    useNavigate();

  const [bookings, setBookings] =
    useState([]);

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const fetchBookings =
    async () => {

      try {

        const res =
          await axios.get(
            "https://gym-backend-8dou.onrender.com/api/trainers"
          );

        setBookings(res.data);

      } catch (error) {

        console.log(error);

      }

    };

  useEffect(() => {

    if (
      user?.role !== "admin"
    ) {

      navigate("/dashboard");

      return;

    }

    fetchBookings();

  }, [navigate, user?.role]);

  const deleteBooking =
    async (id) => {

      try {

        await axios.delete(
          `https://gym-backend-8dou.onrender.com/api/trainers/${id}`
        );

        fetchBookings();

      } catch (error) {

        console.log(error);

      }

    };

  return (

    <div className="min-h-screen bg-black text-white p-10">

      <h1 className="text-5xl font-bold text-red-500 mb-10">
        Trainer Bookings
      </h1>

      <div className="space-y-6">

        {bookings.map((booking) => (

          <div
            key={booking._id}
            className="bg-gray-900 p-6 rounded-2xl"
          >

            <h1 className="text-3xl font-bold">
              {booking.name}
            </h1>

            <p className="text-gray-400 mt-2">
              {booking.email}
            </p>

            <div className="flex justify-between items-center mt-5">

              <div>

                <p className="text-red-500 text-2xl">
                  {booking.trainer}
                </p>

                <p className="text-gray-400 mt-2">
                  {booking.timing}
                </p>

              </div>

              <button
                onClick={() =>
                  deleteBooking(
                    booking._id
                  )
                }
                className="bg-red-500 px-6 py-3 rounded-xl hover:bg-red-700"
              >
                Delete
              </button>

            </div>

          </div>

        ))}

      </div>

    </div>

  );
}

export default TrainerAdmin;