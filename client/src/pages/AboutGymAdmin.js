import React, {
  useEffect,
  useState
} from "react";

import axios from "axios";

function AboutGymAdmin() {

  const [about,
    setAbout] =
    useState(null);

  const [title,
    setTitle] =
    useState("");

  const [description,
    setDescription] =
    useState("");

  const [experience,
    setExperience] =
    useState("");

  const [trainers,
    setTrainers] =
    useState("");

  const [members,
    setMembers] =
    useState("");

  const fetchAbout =
    async () => {

      try {

        const res =
          await axios.get(
            "https://gym-backend-8dou.onrender.com/api/about-gym"
          );

        setAbout(res.data);

      } catch (error) {

        console.log(error);

      }

    };

  useEffect(() => {

    fetchAbout();

  }, []);

  const saveAbout =
    async (e) => {

      e.preventDefault();

      try {

        if (about) {

          await axios.put(

            `https://gym-backend-8dou.onrender.com/api/about-gym/${about._id}`,

            {
              title,
              description,
              experience,
              trainers,
              members,
            }

          );

        } else {

          await axios.post(
            "https://gym-backend-8dou.onrender.com/api/about-gym",

            {
              title,
              description,
              experience,
              trainers,
              members,
            }

          );

        }

        fetchAbout();

      } catch (error) {

        console.log(error);

      }

    };

  return (

    <div className="min-h-screen bg-black text-white p-10">

      <h1 className="text-5xl font-bold text-red-500 mb-10">
        About Our Gym
      </h1>

      <form
        onSubmit={saveAbout}
        className="bg-gray-900 p-8 rounded-2xl"
      >

        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) =>
            setTitle(e.target.value)
          }
          className="w-full p-4 mb-5 rounded-xl bg-black"
        />

        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) =>
            setDescription(e.target.value)
          }
          className="w-full p-4 mb-5 rounded-xl bg-black"
        />

        <input
          type="text"
          placeholder="Years Of Experience"
          value={experience}
          onChange={(e) =>
            setExperience(e.target.value)
          }
          className="w-full p-4 mb-5 rounded-xl bg-black"
        />

        <input
          type="text"
          placeholder="Total Trainers"
          value={trainers}
          onChange={(e) =>
            setTrainers(e.target.value)
          }
          className="w-full p-4 mb-5 rounded-xl bg-black"
        />

        <input
          type="text"
          placeholder="Total Members"
          value={members}
          onChange={(e) =>
            setMembers(e.target.value)
          }
          className="w-full p-4 mb-5 rounded-xl bg-black"
        />

        <button
          className="bg-red-500 px-8 py-4 rounded-xl"
        >
          Save About Gym
        </button>

      </form>

    </div>

  );

}

export default AboutGymAdmin;