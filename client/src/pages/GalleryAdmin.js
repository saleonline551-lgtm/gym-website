import React, {
  useEffect,
  useState
} from "react";

import axios from "axios";

import {
  useNavigate
} from "react-router-dom";

function GalleryAdmin() {

  const navigate =
    useNavigate();

  const [image, setImage] =
    useState("");

  const [gallery,
    setGallery] =
    useState([]);

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const fetchGallery =
    async () => {

      try {

        const res =
          await axios.get(
            "https://gym-backend-8dou.onrender.com/api/gallery"
          );

        setGallery(res.data);

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

    fetchGallery();

  }, [navigate, user?.role]);

  const addImage =
    async (e) => {

      e.preventDefault();

      try {

        await axios.post(
          "https://gym-backend-8dou.onrender.com/api/gallery",
          {
            image,
          }
        );

        setImage("");

        fetchGallery();

      } catch (error) {

        console.log(error);

      }

    };

  const deleteImage =
    async (id) => {

      try {

        await axios.delete(
          `https://gym-backend-8dou.onrender.com/api/gallery/${id}`
        );

        fetchGallery();

      } catch (error) {

        console.log(error);

      }

    };

  return (

    <div className="min-h-screen bg-black text-white p-10">

      <h1 className="text-5xl font-bold text-red-500 mb-10">
        Gym Gallery
      </h1>

      {/* FORM */}
      <form
        onSubmit={addImage}
        className="bg-gray-900 p-8 rounded-2xl mb-10"
      >

        <input
          type="text"
          placeholder="Paste Image URL"
          value={image}
          onChange={(e) =>
            setImage(e.target.value)
          }
          className="w-full p-4 mb-5 rounded-xl bg-black outline-none"
        />

        <button
          className="bg-red-500 px-8 py-4 rounded-xl hover:bg-red-600"
        >
          Add Image
        </button>

      </form>


      {/* GALLERY */}
      <div className="grid md:grid-cols-3 gap-6">

        {gallery.map((item) => (

          <div
            key={item._id}
            className="bg-gray-900 p-4 rounded-2xl"
          >

            <img
              src={item.image}
              alt=""
              className="w-full h-64 object-cover rounded-xl"
            />

            <button
              onClick={() =>
                deleteImage(item._id)
              }
              className="bg-red-500 w-full py-3 rounded-xl mt-4 hover:bg-red-700"
            >
              Delete
            </button>

          </div>

        ))}

      </div>

    </div>

  );
}

export default GalleryAdmin;