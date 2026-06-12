import React, {
  useEffect,
  useState,
  useCallback
} from "react";

import axios from "axios";
import QRCode from "react-qr-code";
import {
  useNavigate
} from "react-router-dom";

function Dashboard() {

  const navigate =
    useNavigate();

  const [memberships,
    setMemberships] =
    useState([]);

  const [myMembership,
    setMyMembership] =
    useState(null);

  const [announcements,
    setAnnouncements] =
    useState([]);

  const [gallery,
    setGallery] =
    useState([]);

  const [attendance,
    setAttendance] =
    useState([]);

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const fetchMemberships =
    useCallback(async () => {

      try {

        const res =
          await axios.get(
            "https://gym-backend-8dou.onrender.com/api/membership"
          );

        setMemberships(
          res.data
        );

        const userMembership =
          res.data.find(
            (item) =>
              item.email ===
              user?.email
          );

        setMyMembership(
          userMembership
        );

      } catch (error) {

        console.log(error);

      }

    }, [user]);

  const fetchAnnouncements =
    useCallback(async () => {

      try {

        const res =
          await axios.get(
            "https://gym-backend-8dou.onrender.com/api/announcements"
          );

        setAnnouncements(
          res.data
        );

      } catch (error) {

        console.log(error);

      }

    }, []);

  const fetchGallery =
    useCallback(async () => {

      try {

        const res =
          await axios.get(
            "https://gym-backend-8dou.onrender.com/api/gallery"
          );

        setGallery(
          res.data
        );

      } catch (error) {

        console.log(error);

      }

    }, []);

  const fetchAttendance =
    useCallback(async () => {

      try {

        const res =
          await axios.get(
            "https://gym-backend-8dou.onrender.com/api/attendance"
          );

        const userAttendance =
          res.data.filter(
            (item) =>
              item.email ===
              user?.email
          );

        setAttendance(
          userAttendance
        );

      } catch (error) {

        console.log(error);

      }

    }, [user]);

  useEffect(() => {

    fetchMemberships();

    fetchAnnouncements();

    fetchGallery();

    fetchAttendance();

  }, [
    fetchMemberships,
    fetchAnnouncements,
    fetchGallery,
    fetchAttendance
  ]);

  const logout = () => {

    localStorage.removeItem(
      "token"
    );

    localStorage.removeItem(
      "user"
    );

    navigate("/login");

  };

  // MEMBERSHIP ALERT
  const getRemainingDays = () => {

    if (!myMembership)
      return null;

    const today =
      new Date();

    const expiry =
      new Date(
        myMembership.expiryDate
      );

    const difference =
      expiry - today;

    const days =
      Math.ceil(
        difference /
        (
          1000 * 60 * 60 * 24
        )
      );

    return days;

  };

  const remainingDays =
    getRemainingDays();

    let membershipAlert = null;

if (myMembership) {
  if (remainingDays <= 0) {
    membershipAlert = (
      <div className="bg-red-600 p-6 rounded-2xl mb-10">
        <h1 className="text-3xl font-bold">
          Membership Expired ❌
        </h1>

        <p className="mt-3 text-xl">
          Renew your membership to continue gym access.
        </p>
      </div>
    );
  } else if (remainingDays <= 5) {
    membershipAlert = (
      <div className="bg-yellow-500 text-black p-6 rounded-2xl mb-10">
        <h1 className="text-3xl font-bold">
          Membership Expiring Soon ⚠️
        </h1>

        <p className="mt-3 text-xl">
          Your membership will expire in {remainingDays} days.
        </p>
      </div>
    );
  }
}

  return (

    <div className="min-h-screen bg-black text-white p-10">

      {/* TOP */}
      <div className="flex justify-between items-center mb-10">

        <div>

          <h1 className="text-5xl font-bold text-red-500">
            POWER GYM
          </h1>

          <p className="text-gray-400 mt-2">
            Welcome Back 🔥
          </p>

        </div>

        <button
          onClick={logout}
          className="bg-red-500 px-6 py-3 rounded-lg hover:bg-red-600"
        >
          Logout
        </button>

      </div>


     {/* EXPIRY ALERT */}
{membershipAlert}


  
      {/* PROFILE CARD + QR */}

{/* USER PROFILE + MEMBERSHIP + QR */}

<div className="grid lg:grid-cols-3 gap-8 mb-10">

  {/* USER PROFILE */}

  <div className="bg-gray-900 p-8 rounded-3xl">

    <h1 className="text-5xl font-bold mb-8">
      User Profile
    </h1>

    <div className="space-y-6">

      <p className="text-3xl">

        <span className="text-red-500">
          Name:
        </span>{" "}

        {user?.name}

      </p>

      <p className="text-3xl">

        <span className="text-red-500">
          Email:
        </span>{" "}

        {user?.email}

      </p>

      <p className="text-3xl">

        <span className="text-red-500">
          Status:
        </span>{" "}

        {
          remainingDays > 0
            ? "Active"
            : "Expired"
        }

      </p>

    </div>

  </div>


  {/* MEMBERSHIP DETAILS */}

  <div className="bg-gray-900 p-8 rounded-3xl">

    <h1 className="text-5xl font-bold mb-8">
      Membership Details
    </h1>

    <div className="space-y-6">

      <p className="text-3xl">

        <span className="text-red-500">
          Plan:
        </span>{" "}

        {myMembership?.plan}

      </p>

      <p className="text-3xl">

        <span className="text-red-500">
          Remaining Days:
        </span>{" "}

        {
          isNaN(remainingDays)
            ? "No Expiry"
            : remainingDays
        }

      </p>

      <p className="text-3xl">

        <span className="text-red-500">
          Join Date:
        </span>{" "}

        {
          myMembership?.startDate
            ? new Date(
                myMembership.startDate
              ).toLocaleDateString()
            : "N/A"
        }

      </p>

      <p className="text-3xl">

        <span className="text-red-500">
          Expiry Date:
        </span>{" "}

        {
          myMembership?.expiryDate
            ? new Date(
                myMembership.expiryDate
              ).toLocaleDateString()
            : "N/A"
        }

      </p>

    </div>

  </div>


  {/* QR CODE */}

  <div className="bg-black border border-red-500 p-8 rounded-3xl flex flex-col justify-center items-center">

    <h1 className="text-4xl font-bold text-red-500 mb-6">
      Gym Entry QR
    </h1>

    <div className="bg-white p-4 rounded-2xl">

      <QRCode

        value={JSON.stringify({

          name: user?.name,

          email: user?.email,

        })}

        size={180}

      />

    </div>

    <p className="text-gray-400 mt-5 text-center text-xl">
      Scan For Attendance
    </p>

  </div>

</div>

{/* DAILY WORKOUT */}

<div className="bg-gray-900 p-8 rounded-2xl mb-10">

  <h1 className="text-4xl font-bold mb-6 text-red-500">
    Daily Workout
  </h1>

  <div>

  <p className="text-2xl font-semibold">

    {
      myMembership?.workoutPlan ||
      "No Workout Assigned"
    }

  </p>

  <p className="text-gray-400 mt-3">

    Updated On:
    {" "}

    {
      myMembership?.workoutUpdatedAt
        ? new Date(
            myMembership.workoutUpdatedAt
          ).toLocaleDateString()
        : "Not Updated"
    }

  </p>

</div>

</div>


{/* DAILY DIET */}

<div className="bg-gray-900 p-8 rounded-2xl mb-10">

  <h1 className="text-4xl font-bold mb-6 text-red-500">
    Daily Diet
  </h1>

  <div>

  <p className="text-2xl font-semibold">

    {
      myMembership?.dietPlan ||
      "No Diet Assigned"
    }

  </p>

  <p className="text-gray-400 mt-3">

    Updated On:
    {" "}

    {
      myMembership?.dietUpdatedAt
        ? new Date(
            myMembership.dietUpdatedAt
          ).toLocaleDateString()
        : "Not Updated"
    }

  </p>

</div>

</div>

      {/* STATS */}
      <div className="grid md:grid-cols-4 gap-8 mb-12">

        <div
  data-aos="fade-up"
  className="bg-gray-900 p-8 rounded-2xl hover:border hover:border-red-500 transition duration-300"
>

          <h2 className="text-2xl text-gray-400">
            Total Memberships
          </h2>

          <h1 className="text-5xl font-bold mt-4 text-red-500">
            {memberships.length}
          </h1>

        </div>

        <div
  data-aos="fade-up"
  className="bg-gray-900 p-8 rounded-2xl hover:border hover:border-red-500 transition duration-300"
>

          <h2 className="text-2xl text-gray-400">
            Active Trainers
          </h2>

          <h1 className="text-5xl font-bold mt-4 text-red-500">
            15
          </h1>

        </div>

      <div
  data-aos="fade-up"
  className="bg-gray-900 p-8 rounded-2xl hover:border hover:border-red-500 transition duration-300"
>

          <h2 className="text-2xl text-gray-400">
            Membership Plans
          </h2>

          <h1 className="text-5xl font-bold mt-4 text-red-500">
            3
          </h1>

        </div>

        <div
  data-aos="fade-up"
  className="bg-gray-900 p-8 rounded-2xl hover:border hover:border-red-500 transition duration-300"
>

          <h2 className="text-2xl text-gray-400">
            Attendance
          </h2>

          <h1 className="text-5xl font-bold mt-4 text-red-500">
            {attendance.length}
          </h1>

        </div>

      </div>


      {/* ATTENDANCE */}
      <div className="bg-gray-900 p-8 rounded-2xl mb-12">

        <h1 className="text-4xl font-bold mb-8 text-red-500">
          Attendance History
        </h1>

        <div className="space-y-6">

          {attendance.length > 0 ? (

            attendance.map((item) => (

              <div
                key={item._id}
                className="bg-black p-6 rounded-2xl border border-gray-800 flex justify-between items-center"
              >

                <div>

                  <h1 className="text-2xl font-bold">
                    Present
                  </h1>

                  <p className="text-gray-400 mt-2">

                    {
                      new Date(
                        item.date
                      ).toLocaleDateString()
                    }

                  </p>

                </div>

                <span className="bg-green-500 px-5 py-3 rounded-xl text-black font-bold">
                  Present
                </span>

              </div>

            ))

          ) : (

            <p className="text-gray-400">
              No Attendance Found
            </p>

          )}

        </div>

      </div>


      {/* ANNOUNCEMENTS */}
      <div className="bg-gray-900 p-8 rounded-2xl mb-12">

        <h1 className="text-4xl font-bold mb-8 text-red-500">
          Gym Announcements
        </h1>

        <div className="space-y-6">

          {announcements.length > 0 ? (

            announcements.map(
              (announcement) => (

                <div
                  key={announcement._id}
                  className="bg-black p-6 rounded-2xl border border-gray-800"
                >

                  <h1 className="text-3xl font-bold">
                    {announcement.title}
                  </h1>

                  <p className="text-gray-400 mt-4">
                    {announcement.message}
                  </p>

                </div>

              )
            )

          ) : (

            <p className="text-gray-400">
              No Announcements
            </p>

          )}

        </div>

      </div>


      {/* GALLERY */}
      <div className="bg-gray-900 p-8 rounded-2xl">

        <h1 className="text-4xl font-bold mb-8 text-red-500">
          Gym Gallery
        </h1>

        <div className="grid md:grid-cols-3 gap-6">

          {gallery.length > 0 ? (

            gallery.map((item) => (

              <div
  key={item._id}
  data-aos="zoom-in"
  className="bg-black p-4 rounded-2xl border border-gray-800 hover:border-red-500 transition duration-300"
>

                <img
                  src={item.image}
                  alt=""
                  className="w-full h-64 object-cover rounded-xl hover:scale-105 transition duration-500"
                />

              </div>

            ))

          ) : (

            <p className="text-gray-400">
              No Images Found
            </p>

          )}

        </div>

      </div>

    </div>

  );

}

export default Dashboard;