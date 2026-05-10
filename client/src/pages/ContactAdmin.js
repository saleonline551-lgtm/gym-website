import React, {
  useEffect,
  useState
} from "react";

import axios from "axios";

import {
  useNavigate
} from "react-router-dom";

function ContactAdmin() {

  const navigate =
    useNavigate();

  const [contacts,
    setContacts] =
    useState([]);

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const fetchContacts =
    async () => {

      try {

        const res =
          await axios.get(
            "https://gym-backend-8dou.onrender.com/api/contact"
          );

        setContacts(
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

    fetchContacts();

  }, [navigate, user?.role]);

  const deleteMessage =
    async (id) => {

      try {

        await axios.delete(
          `https://gym-backend-8dou.onrender.com/api/contact/${id}`
        );

        fetchContacts();

      } catch (error) {

        console.log(error);

      }

    };

  return (

    <div className="min-h-screen bg-black text-white p-10">

      <h1 className="text-5xl font-bold text-red-500 mb-10">
        Support Messages
      </h1>

      <div className="space-y-6">

        {contacts.length > 0 ? (

          contacts.map((contact) => (

            <div
              key={contact._id}
              className="bg-gray-900 p-8 rounded-2xl"
            >

              <h1 className="text-3xl font-bold">
                {contact.name}
              </h1>

              <p className="text-gray-400 mt-2">
                {contact.email}
              </p>

              <p className="mt-5 text-xl">
                {contact.message}
              </p>

              <button
                onClick={() =>
                  deleteMessage(
                    contact._id
                  )
                }
                className="bg-red-500 px-6 py-3 rounded-xl mt-6 hover:bg-red-700"
              >
                Delete
              </button>

            </div>

          ))

        ) : (

          <p className="text-gray-400 text-xl">
            No Messages Found
          </p>

        )}

      </div>

    </div>

  );
}

export default ContactAdmin;