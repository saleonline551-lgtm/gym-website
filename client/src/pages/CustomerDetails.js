/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-use-before-define */

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

  // USE EFFECT

  useEffect(() => {

    fetchCustomer();

    fetchAttendance();

  }, []);

  if (!customer) {

    return (

      <div className="min-h-screen bg-black text-white flex justify-center items-center text-3xl">

        Loading...

      </div>

    );

  }

  return (

    <div className="min-h-screen bg-black text-white p-10">

      <button
        onClick={() =>
          navigate("/admin")
        }
        className="bg-red-500 px-6 py-3 rounded-xl mb-8"
      >
        Back
      </button>

      {/* CUSTOMER DETAILS */}

      <div className="bg-gray-900 p-10 rounded-2xl mb-10">

        <h1 className="text-5xl font-bold text-red-500 mb-10">
          Customer Details
        </h1>

        <div className="space-y-5 text-2xl">

          <p>

            <span className="text-red-500">
              Name:
            </span>{" "}

            {customer.name}

          </p>

          <p>

            <span className="text-red-500">
              Email:
            </span>{" "}

            {customer.email}

          </p>

          <p>

            <span className="text-red-500">
              Plan:
            </span>{" "}

            {customer.plan}

          </p>

          <p>

            <span className="text-red-500">
              Status:
            </span>{" "}

            {
              new Date(
                customer.expiryDate
              ) > new Date()

                ? "Active"

                : "Expired"
            }

          </p>

          <p>

            <span className="text-red-500">
              Join Date:
            </span>{" "}

            {
              new Date(
                customer.joinDate
              ).toLocaleDateString()
            }

          </p>

          <p>

            <span className="text-red-500">
              Expiry Date:
            </span>{" "}

            {
              new Date(
                customer.expiryDate
              ).toLocaleDateString()
            }

          </p>

        </div>

      </div>

      {/* ATTENDANCE */}

      <div className="bg-gray-900 p-10 rounded-2xl">

        <h1 className="text-4xl font-bold text-red-500 mb-8">
          Attendance History
        </h1>

        <div className="space-y-5">

          {attendance.length > 0 ? (

            attendance.map((item) => (

              <div
                key={item._id}
                className="bg-black p-6 rounded-2xl flex justify-between items-center"
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

            <p className="text-gray-400">
              No Attendance Found
            </p>

          )}

        </div>

      </div>

    </div>

  );

}

export default CustomerDetails;