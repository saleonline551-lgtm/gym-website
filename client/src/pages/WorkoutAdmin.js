import React, {
  useEffect,
  useState
} from "react";

import axios from "axios";

import {
  useNavigate
} from "react-router-dom";

import AdminSidebar from "../components/AdminSidebar";

function WorkoutAdmin() {

  const navigate =
    useNavigate();

  const [title,
    setTitle] =
    useState("");

  const [category,
    setCategory] =
    useState("");

  const [exercises,
    setExercises] =
    useState("");

  const [workouts,
    setWorkouts] =
    useState([]);

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const fetchWorkouts =
    async () => {

      try {

        const res =
          await axios.get(
            "https://gym-backend-8dou.onrender.com/api/workouts"
          );

        setWorkouts(
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

    fetchWorkouts();

  }, [navigate, user?.role]);

  const addWorkout =
    async (e) => {

      e.preventDefault();

      try {

        await axios.post(
          "https://gym-backend-8dou.onrender.com/api/workouts",
          {
            title,
            category,
            exercises,
          }
        );

        setTitle("");
        setCategory("");
        setExercises("");

        fetchWorkouts();

      } catch (error) {

        console.log(error);

      }

    };

  const deleteWorkout =
    async (id) => {

      try {

        await axios.delete(
          `https://gym-backend-8dou.onrender.com/api/workouts/${id}`
        );

        fetchWorkouts();

      } catch (error) {

        console.log(error);

      }

    };

  return (

    <div className="flex bg-black text-white min-h-screen">

      <AdminSidebar />

      <div className="flex-1 p-10">

        <h1 className="text-5xl font-bold text-red-500 mb-10">
          Workout Plans
        </h1>

        {/* FORM */}
        <form
          onSubmit={addWorkout}
          className="bg-gray-900 p-8 rounded-2xl mb-10"
        >

          <input
            type="text"
            placeholder="Workout Title"
            value={title}
            onChange={(e) =>
              setTitle(
                e.target.value
              )
            }
            className="w-full p-4 mb-5 rounded-xl bg-black outline-none"
          />

          <input
            type="text"
            placeholder="Category"
            value={category}
            onChange={(e) =>
              setCategory(
                e.target.value
              )
            }
            className="w-full p-4 mb-5 rounded-xl bg-black outline-none"
          />

          <textarea
            placeholder="Exercises"
            value={exercises}
            onChange={(e) =>
              setExercises(
                e.target.value
              )
            }
            className="w-full p-4 mb-5 rounded-xl bg-black outline-none h-40"
          />

          <button
            className="bg-red-500 px-8 py-4 rounded-xl hover:bg-red-600"
          >
            Add Workout
          </button>

        </form>


        {/* LIST */}
        <div className="space-y-6">

          {workouts.map((workout) => (

            <div
              key={workout._id}
              className="bg-gray-900 p-6 rounded-2xl"
            >

              <h1 className="text-3xl font-bold">
                {workout.title}
              </h1>

              <p className="text-red-500 mt-2">
                {workout.category}
              </p>

              <p className="text-gray-400 mt-4 whitespace-pre-line">
                {workout.exercises}
              </p>

              <button
                onClick={() =>
                  deleteWorkout(
                    workout._id
                  )
                }
                className="bg-red-500 px-6 py-3 rounded-xl mt-5 hover:bg-red-700"
              >
                Delete
              </button>

            </div>

          ))}

        </div>

      </div>

    </div>

  );
}

export default WorkoutAdmin;