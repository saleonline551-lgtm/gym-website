/* eslint-disable react-hooks/exhaustive-deps */
import React, {
  useEffect,
  useState
} from "react";

import axios from "axios";

import {
  useParams,
  useNavigate
} from "react-router-dom";

function CustomerDetails() {

  const {
    email
  } = useParams();

  const navigate =
    useNavigate();

  const [customer,
    setCustomer] =
    useState(null);

  const [attendance,
    setAttendance] =
    useState([]);

  // FETCH DATA

  useEffect(() => {

  const loadData = async () => {

    await fetchCustomer();

    await fetchAttendance();

  };

  loadData();

}, [email]);

  // FETCH CUSTOMER

  const fetchCustomer =
    async () => {

      try {

        const res =
          await axios.get(
            "https://gym-backend-8dou.onrender.com/api/membership"
          );

        const member =
          res.data.find(
            (item) =>
              item.email === email
          );

        setCustomer(member);

      } catch (error) {

        console.log(error);

      }

    };

  // FETCH ATTENDANCE

  const fetchAttendance =
    async () => {

      try {

        const res =
          await axios.get(
            `https://gym-backend-8dou.onrender.com/api/attendance/user/${email}`
          );

        setAttendance(
          res.data
        );

      } catch (error) {

        console.log(error);

      }

    };

  if (!customer) {

    return (

      <div className="min-h-screen bg-black text-white flex justify-center items-center text-3xl">

        Loading...

      </div>

    );

  }

  const updateWorkout =
  async () => {

    try {

      await axios.put(

        `https://gym-backend-8dou.onrender.com/api/membership/update-plan/${customer._id}`,

        {
          workoutPlan:
            customer.workoutPlan,

          dietPlan:
            customer.dietPlan,
        }

      );

      alert(
        "Workout Updated Successfully"
      );

    } catch (error) {

      console.log(error);

    }

  };

const updateDiet =
  async () => {

    try {

      await axios.put(

        `https://gym-backend-8dou.onrender.com/api/membership/update-plan/${customer._id}`,

        {
          workoutPlan:
            customer.workoutPlan,

          dietPlan:
            customer.dietPlan,
        }

      );

      alert(
        "Diet Updated Successfully"
      );

    } catch (error) {

      console.log(error);

    }

  };

  return (

    <div className="min-h-screen bg-black text-white p-10">

      {/* BACK BUTTON */}

      <button
        onClick={() =>
          navigate("/admin")
        }
        className="bg-red-500 px-6 py-3 rounded-xl mb-8 hover:bg-red-700 transition"
      >
        Back
      </button>

      {/* PROFILE SECTION */}

      <div className="bg-gray-900 p-10 rounded-3xl mb-10 border border-gray-800">

        {/* TOP BAR */}

        <div className="flex flex-col md:flex-row justify-between md:items-center gap-6 mb-10">

          <div>

            <h1 className="text-5xl font-bold text-red-500">
              Customer Profile
            </h1>

            <p className="text-gray-400 mt-3 text-lg">
              Complete customer analytics & activity
            </p>

          </div>

          <div>

            <span
              className={`px-6 py-3 rounded-2xl font-bold text-lg ${
                new Date(
                  customer.expiryDate
                ) > new Date()

                  ? "bg-green-500 text-black"

                  : "bg-red-500 text-white"
              }`}
            >

              {
                new Date(
                  customer.expiryDate
                ) > new Date()

                  ? "ACTIVE"

                  : "EXPIRED"
              }

            </span>

          </div>

        </div>

        {/* GRID */}

        <div className="grid md:grid-cols-2 gap-8">

          {/* NAME */}

          <div className="bg-black p-6 rounded-2xl border border-gray-800">

            <p className="text-gray-400 text-lg">
              Customer Name
            </p>

            <h1 className="text-3xl font-bold mt-2">
              {customer.name}
            </h1>

          </div>

          {/* EMAIL */}

          <div className="bg-black p-6 rounded-2xl border border-gray-800">

            <p className="text-gray-400 text-lg">
              Email Address
            </p>

            <h1 className="text-2xl font-bold mt-2 break-all">
              {customer.email}
            </h1>

          </div>

          {/* PLAN */}

          <div className="bg-black p-6 rounded-2xl border border-gray-800">

            <p className="text-gray-400 text-lg">
              Membership Plan
            </p>

            <h1 className="text-3xl font-bold text-red-500 mt-2">
              {customer.plan}
            </h1>

          </div>

          {/* ATTENDANCE */}

          <div className="bg-black p-6 rounded-2xl border border-gray-800">

            <p className="text-gray-400 text-lg">
              Attendance Records
            </p>

            <h1 className="text-3xl font-bold mt-2">
              {attendance.length}
            </h1>

          </div>

        </div>

      </div>

      {/* DAILY WORKOUT */}

      {/* DAILY WORKOUT */}

<div className="bg-gray-900 p-10 rounded-3xl mb-10 border border-gray-800">

  <h1 className="text-4xl font-bold text-red-500 mb-8">
    Daily Workout
  </h1>

  <textarea

    value={customer.workoutPlan}

    onChange={(e) =>
      setCustomer({

        ...customer,

        workoutPlan:
          e.target.value,

      })
    }

    className="w-full bg-black p-8 rounded-2xl border border-gray-800 outline-none text-white text-xl"

    rows="6"

    placeholder="Enter Workout Plan..."

  />

  <button

    onClick={updateWorkout}

    className="bg-red-500 hover:bg-red-700 transition px-8 py-4 rounded-2xl text-xl font-bold mt-6"
  >
    Update Workout
  </button>

</div>

      {/* DAILY DIET */}

      {/* DAILY DIET */}

<div className="bg-gray-900 p-10 rounded-3xl mb-10 border border-gray-800">

  <h1 className="text-4xl font-bold text-red-500 mb-8">
    Daily Diet
  </h1>

  <textarea

    value={customer.dietPlan}

    onChange={(e) =>
      setCustomer({

        ...customer,

        dietPlan:
          e.target.value,

      })
    }

    className="w-full bg-black p-8 rounded-2xl border border-gray-800 outline-none text-white text-xl"

    rows="6"

    placeholder="Enter Diet Plan..."

  />

  <button

    onClick={updateDiet}

    className="bg-red-500 hover:bg-red-700 transition px-8 py-4 rounded-2xl text-xl font-bold mt-6"
  >
    Update Diet
  </button>

</div>

      {/* ATTENDANCE HISTORY */}

      <div className="bg-gray-900 p-10 rounded-3xl border border-gray-800">

        <h1 className="text-4xl font-bold text-red-500 mb-8">
          Attendance History
        </h1>

        <div className="space-y-5">

          {attendance.length > 0 ? (

            attendance.map((item) => (

              <div
                key={item._id}
                className="bg-black p-6 rounded-2xl flex justify-between items-center border border-gray-800"
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

                <span className="bg-green-500 px-5 py-2 rounded-xl text-black font-bold">
                  Present
                </span>

              </div>

            ))

          ) : (

            <p className="text-gray-400 text-xl">
              No Attendance Found
            </p>

          )}

        </div>

      </div>

    </div>

  );

}

export default CustomerDetails;