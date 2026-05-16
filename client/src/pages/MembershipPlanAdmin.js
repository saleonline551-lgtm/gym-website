import React, {
  useEffect,
  useState
} from "react";

import axios from "axios";

function MembershipPlanAdmin() {

  const [plans,
    setPlans] =
    useState([]);

  const [title,
    setTitle] =
    useState("");

  const [price,
    setPrice] =
    useState("");

  const [duration,
    setDuration] =
    useState("");

  const [features,
    setFeatures] =
    useState("");

  const fetchPlans =
    async () => {

      try {

        const res =
          await axios.get(
            "https://gym-backend-8dou.onrender.com/api/membership-plans"
          );

        setPlans(res.data);

      } catch (error) {

        console.log(error);

      }

    };

  useEffect(() => {

    fetchPlans();

  }, []);

  const addPlan =
    async (e) => {

      e.preventDefault();

      try {

        await axios.post(
          "https://gym-backend-8dou.onrender.com/api/membership-plans",

          {
            title,
            price,
            duration,

            features:
              features.split(","),
          }
        );

        setTitle("");
        setPrice("");
        setDuration("");
        setFeatures("");

        fetchPlans();

      } catch (error) {

        console.log(error);

      }

    };

  const deletePlan =
    async (id) => {

      try {

        await axios.delete(
          `https://gym-backend-8dou.onrender.com/api/membership-plans/${id}`
        );

        fetchPlans();

      } catch (error) {

        console.log(error);

      }

    };

  return (

    <div className="min-h-screen bg-black text-white p-10">

      <h1 className="text-5xl font-bold text-red-500 mb-10">
        Membership Plans
      </h1>

      <form
        onSubmit={addPlan}
        className="bg-gray-900 p-8 rounded-2xl mb-10"
      >

        <input
          type="text"
          placeholder="Plan Title"
          value={title}
          onChange={(e) =>
            setTitle(e.target.value)
          }
          className="w-full p-4 mb-5 rounded-xl bg-black"
        />

        <input
          type="text"
          placeholder="Price"
          value={price}
          onChange={(e) =>
            setPrice(e.target.value)
          }
          className="w-full p-4 mb-5 rounded-xl bg-black"
        />

        <input
          type="text"
          placeholder="Duration"
          value={duration}
          onChange={(e) =>
            setDuration(e.target.value)
          }
          className="w-full p-4 mb-5 rounded-xl bg-black"
        />

        <textarea
          placeholder="Features separated by comma"
          value={features}
          onChange={(e) =>
            setFeatures(e.target.value)
          }
          className="w-full p-4 mb-5 rounded-xl bg-black"
        />

        <button
          className="bg-red-500 px-8 py-4 rounded-xl"
        >
          Add Plan
        </button>

      </form>

      <div className="space-y-6">

        {plans.map((plan) => (

          <div
            key={plan._id}
            className="bg-gray-900 p-8 rounded-2xl"
          >

            <h1 className="text-4xl font-bold">
              {plan.title}
            </h1>

            <p className="text-2xl text-red-500 mt-3">
              ₹ {plan.price}
            </p>

            <p className="text-gray-400 mt-2">
              {plan.duration}
            </p>

            <ul className="mt-5 space-y-2">

              {plan.features.map(
                (feature, index) => (

                  <li key={index}>
                    • {feature}
                  </li>

                )
              )}

            </ul>

            <button
              onClick={() =>
                deletePlan(plan._id)
              }
              className="bg-red-500 px-6 py-3 rounded-xl mt-6"
            >
              Delete
            </button>

          </div>

        ))}

      </div>

    </div>

  );

}

export default MembershipPlanAdmin;