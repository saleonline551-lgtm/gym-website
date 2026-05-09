import React, { useEffect, useState } from "react";
import axios from "axios";

function Admin() {

  const [memberships, setMemberships] = useState([]);

  useEffect(() => {

    fetchMemberships();

  }, []);

  const fetchMemberships = async () => {

    try {

      const res = await axios.get(
        "https://gym-backend-8dou.onrender.com/api/membership"
      );

      setMemberships(res.data);

    } catch (error) {

      console.log(error);

    }

  };


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
            className="bg-gray-900 p-6 rounded-xl flex justify-between items-center"
          >

            <div>

              <h2 className="text-2xl font-bold">
                {item.name}
              </h2>

              <p className="mt-2 text-gray-300">
                {item.email}
              </p>

              <p className="mt-2 text-red-500">
                {item.plan}
              </p>

            </div>

            <button
              onClick={() => deleteMembership(item._id)}
              className="bg-red-500 px-6 py-3 rounded-lg hover:bg-red-600"
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