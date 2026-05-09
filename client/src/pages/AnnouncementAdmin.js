import React, {
  useEffect,
  useState
} from "react";

import axios from "axios";

import {
  useNavigate
} from "react-router-dom";

function AnnouncementAdmin() {

  const navigate =
    useNavigate();

  const [title, setTitle] =
    useState("");

  const [message, setMessage] =
    useState("");

  const [announcements,
    setAnnouncements] =
    useState([]);

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const fetchAnnouncements =
    async () => {

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

    };

  useEffect(() => {

    if (
      user?.role !== "admin"
    ) {

      navigate("/dashboard");

      return;

    }

    fetchAnnouncements();

  }, [navigate, user?.role]);

  const postAnnouncement =
    async (e) => {

      e.preventDefault();

      try {

        await axios.post(
          "https://gym-backend-8dou.onrender.com/api/announcements",
          {
            title,
            message,
          }
        );

        setTitle("");
        setMessage("");

        fetchAnnouncements();

      } catch (error) {

        console.log(error);

      }

    };

  const deleteAnnouncement =
    async (id) => {

      try {

        await axios.delete(
          `https://gym-backend-8dou.onrender.com/api/announcements/${id}`
        );

        fetchAnnouncements();

      } catch (error) {

        console.log(error);

      }

    };

  return (

    <div className="min-h-screen bg-black text-white p-10">

      <h1 className="text-5xl font-bold text-red-500 mb-10">
        Gym Announcements
      </h1>

      {/* FORM */}
      <form
        onSubmit={postAnnouncement}
        className="bg-gray-900 p-8 rounded-2xl mb-10"
      >

        <input
          type="text"
          placeholder="Announcement Title"
          value={title}
          onChange={(e) =>
            setTitle(e.target.value)
          }
          className="w-full p-4 mb-5 rounded-xl bg-black outline-none"
        />

        <textarea
          placeholder="Announcement Message"
          value={message}
          onChange={(e) =>
            setMessage(e.target.value)
          }
          className="w-full p-4 mb-5 rounded-xl bg-black outline-none h-40"
        />

        <button
          className="bg-red-500 px-8 py-4 rounded-xl hover:bg-red-600"
        >
          Post Announcement
        </button>

      </form>


      {/* LIST */}
      <div className="space-y-6">

        {announcements.map(
          (announcement) => (

            <div
              key={announcement._id}
              className="bg-gray-900 p-6 rounded-2xl"
            >

              <h1 className="text-3xl font-bold">
                {announcement.title}
              </h1>

              <p className="text-gray-400 mt-4">
                {announcement.message}
              </p>

              <button
                onClick={() =>
                  deleteAnnouncement(
                    announcement._id
                  )
                }
                className="bg-red-500 px-6 py-3 rounded-xl mt-5 hover:bg-red-700"
              >
                Delete
              </button>

            </div>

          )
        )}

      </div>

    </div>

  );
}

export default AnnouncementAdmin;