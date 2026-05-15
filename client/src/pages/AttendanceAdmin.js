import React, {
  useEffect,
  useState
} from "react";

import axios from "axios";

import {
  useNavigate
} from "react-router-dom";

import {
  QrReader
} from "react-qr-reader";

function AttendanceAdmin() {

  const navigate =
    useNavigate();

  const [attendance,
    setAttendance] =
    useState([]);

  const [name, setName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [scanResult,
    setScanResult] =
    useState("");

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  // FETCH ATTENDANCE

  const fetchAttendance =
    async () => {

      try {

        const res =
          await axios.get(
            "https://gym-backend-8dou.onrender.com/api/attendance"
          );

        setAttendance(
          res.data
        );

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

    fetchAttendance();

  }, [navigate, user?.role]);

  // MANUAL ATTENDANCE

  const markAttendance =
    async (e) => {

      e.preventDefault();

      try {

        await axios.post(
          "https://gym-backend-8dou.onrender.com/api/attendance",
          {
            name,
            email,
          }
        );

        setName("");
        setEmail("");

        fetchAttendance();

        alert(
          "Attendance Marked"
        );

      } catch (error) {

        console.log(error);

      }

    };

  // DELETE ATTENDANCE

  const deleteAttendance =
    async (id) => {

      try {

        await axios.delete(
          `https://gym-backend-8dou.onrender.com/api/attendance/${id}`
        );

        fetchAttendance();

      } catch (error) {

        console.log(error);

      }

    };

  return (

    <div className="min-h-screen bg-black text-white p-10">

      <h1 className="text-5xl font-bold text-red-500 mb-10">
        Attendance System
      </h1>

      {/* QR SCANNER */}

      <div className="bg-gray-900 p-8 rounded-2xl mb-10">

        <h1 className="text-4xl font-bold text-red-500 mb-8">
          QR Attendance Scanner
        </h1>

        <div className="bg-black p-5 rounded-2xl overflow-hidden">

          <QrReader

            constraints={{
              facingMode:
                "environment"
            }}

            onResult={async (
              result,
              error
            ) => {

              if (!!result) {

                const text =
                  result?.text;

                setScanResult(
                  text
                );

                try {

                  const data =
                    JSON.parse(
                      text
                    );

                  // SAVE ATTENDANCE

                  await axios.post(
                    "https://gym-backend-8dou.onrender.com/api/attendance",
                    {

                      name:
                        data.name,

                      email:
                        data.email,

                    }
                  );

                  fetchAttendance();

                  alert(
                    "Attendance Marked Successfully"
                  );

                } catch (err) {

                  console.log(err);

                }

              }

              if (!!error) {

                console.log(error);

              }

            }}

            style={{
              width: "100%"
            }}

          />

        </div>

        {scanResult && (

          <div className="mt-6 bg-black p-5 rounded-xl">

            <p className="text-green-500 text-xl">
              QR Detected Successfully ✅
            </p>

          </div>

        )}

      </div>

      {/* MANUAL FORM */}

      <form
        onSubmit={markAttendance}
        className="bg-gray-900 p-8 rounded-2xl mb-10"
      >

        <h1 className="text-3xl font-bold mb-6 text-red-500">
          Manual Attendance
        </h1>

        <input
          type="text"
          placeholder="Member Name"
          value={name}
          onChange={(e) =>
            setName(
              e.target.value
            )
          }
          className="w-full p-4 mb-5 rounded-xl bg-black outline-none"
        />

        <input
          type="email"
          placeholder="Member Email"
          value={email}
          onChange={(e) =>
            setEmail(
              e.target.value
            )
          }
          className="w-full p-4 mb-5 rounded-xl bg-black outline-none"
        />

        <button
          className="bg-red-500 px-8 py-4 rounded-xl hover:bg-red-600"
        >
          Mark Attendance
        </button>

      </form>

      {/* LIST */}

      <div className="space-y-6">

        {attendance.map((item) => (

          <div
            key={item._id}
            className="bg-gray-900 p-6 rounded-2xl"
          >

            <h1 className="text-3xl font-bold">
              {item.name}
            </h1>

            <p className="text-gray-400 mt-2">
              {item.email}
            </p>

            <div className="flex justify-between items-center mt-5">

              <div>

                <span className="bg-green-500 px-4 py-2 rounded-xl text-black font-bold">
                  Present
                </span>

                <p className="text-gray-400 mt-3">

                  {
                    new Date(
                      item.date
                    ).toLocaleDateString()
                  }

                </p>

              </div>

              <button
                onClick={() =>
                  deleteAttendance(
                    item._id
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

export default AttendanceAdmin;