import React, {
  useEffect,
  useState,
  useCallback
} from "react";

import axios from "axios";

function Admin() {

  const [memberships, setMemberships] =
    useState([]);

  const fetchMemberships = useCallback(
    async () => {

      try {

        const res = await axios.get(
          "https://gym-backend-8dou.onrender.com/api/membership"
        );

        setMemberships(res.data);

      } catch (error) {

        console.log(error);

      }

    },
    []
  );

  useEffect(() => {

    fetchMemberships();

  }, [fetchMemberships]);

  const deleteMembership = async (id) => {

    try {

      await axios.delete(
        `https://gym-backend-8dou.onrender.com/api/membership/${id}`
      );

      fetchMemberships();

    } catch (error) {

      console.log(error);

    }

  };

  return (

    <div className="min-h-screen bg-black text-white p-10">

      <h1 className="text-5xl font-bold text-red-500 mb-10">
        Admin Panel
      </h1>

      <div className="grid gap-6">

        {memberships.map((item) => (

          <div
            key={item._id}
            className="bg-gray-900 p-6 rounded-2xl flex justify-between items-center"
          >

            <div>

              <h2 className="text-2xl font-bold">
                {item.name}
              </h2>

              <p className="text-gray-400 mt-2">
                {item.email}
              </p>

              <p className="text-red-500 mt-2">
                {item.plan}
              </p>

            </div>

            <button
              onClick={() =>
                deleteMembership(item._id)
              }
              className="bg-red-500 px-6 py-3 rounded-xl hover:bg-red-600"
            >
              Delete
            </button>

          </div>

        ))}

      </div>

    </div>

  );
}

export default Admin;