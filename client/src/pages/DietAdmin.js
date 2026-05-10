import React, {
  useEffect,
  useState
} from "react";

import axios from "axios";

import {
  useNavigate
} from "react-router-dom";

function DietAdmin() {

  const navigate =
    useNavigate();

  const [title, setTitle] =
    useState("");

  const [description,
    setDescription] =
    useState("");

  const [diets,
    setDiets] =
    useState([]);

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const fetchDiets =
    async () => {

      try {

        const res =
          await axios.get(
            "https://gym-backend-8dou.onrender.com/api/diets"
          );

        setDiets(res.data);

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

    fetchDiets();

  }, [navigate, user?.role]);

  const addDiet =
    async (e) => {

      e.preventDefault();

      try {

        await axios.post(
          "https://gym-backend-8dou.onrender.com/api/diets",
          {
            title,
            description,
          }
        );

        setTitle("");
        setDescription("");

        fetchDiets();

      } catch (error) {

        console.log(error);

      }

    };

  const deleteDiet =
    async (id) => {

      try {

        await axios.delete(
          `https://gym-backend-8dou.onrender.com/api/diets/${id}`
        );

        fetchDiets();

      } catch (error) {

        console.log(error);

      }

    };

  return (

    <div className="min-h-screen bg-black text-white p-10">

      <h1 className="text-5xl font-bold text-red-500 mb-10">
        Diet Plans
      </h1>

      {/* FORM */}
      <form
        onSubmit={addDiet}
        className="bg-gray-900 p-8 rounded-2xl mb-10"
      >

        <input
          type="text"
          placeholder="Diet Title"
          value={title}
          onChange={(e) =>
            setTitle(e.target.value)
          }
          className="w-full p-4 mb-5 rounded-xl bg-black outline-none"
        />

        <textarea
          placeholder="Diet Description"
          value={description}
          onChange={(e) =>
            setDescription(
              e.target.value
            )
          }
          className="w-full p-4 mb-5 rounded-xl bg-black outline-none h-40"
        />

        <button
          className="bg-red-500 px-8 py-4 rounded-xl hover:bg-red-600"
        >
          Add Diet
        </button>

      </form>


      {/* LIST */}
      <div className="space-y-6">

        {diets.map((diet) => (

          <div
            key={diet._id}
            className="bg-gray-900 p-6 rounded-2xl"
          >

            <h1 className="text-3xl font-bold">
              {diet.title}
            </h1>

            <p className="text-gray-400 mt-4">
              {diet.description}
            </p>

            <button
              onClick={() =>
                deleteDiet(diet._id)
              }
              className="bg-red-500 px-6 py-3 rounded-xl mt-5 hover:bg-red-700"
            >
              Delete
            </button>

          </div>

        ))}

      </div>

    </div>

  );
}

export default DietAdmin;