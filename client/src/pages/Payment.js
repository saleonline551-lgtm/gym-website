import React, {
  useState
} from "react";

import {
  useNavigate
} from "react-router-dom";

import {
  FaCreditCard
} from "react-icons/fa";

function Payment() {

  const navigate =
    useNavigate();

  const [loading,
    setLoading] =
    useState(false);

  const [cardNumber,
    setCardNumber] =
    useState("");

  const [cardName,
    setCardName] =
    useState("");

  const [expiry,
    setExpiry] =
    useState("");

  const [cvv,
    setCvv] =
    useState("");

  const handlePayment =
    (e) => {

      e.preventDefault();

      setLoading(true);

      setTimeout(() => {

        navigate("/success");

      }, 2500);

    };

  return (

    <div className="min-h-screen bg-black flex justify-center items-center px-5">

      <div
        data-aos="zoom-in"
        className="bg-gray-900 text-white p-10 rounded-3xl w-full max-w-lg border border-gray-800 shadow-2xl"
      >

        <div className="flex justify-center mb-6">

          <div className="bg-red-500 p-5 rounded-full text-4xl">
            <FaCreditCard />
          </div>

        </div>

        <h1 className="text-5xl font-bold text-center text-red-500 mb-3">
          Secure Payment
        </h1>

        <p className="text-center text-gray-400 mb-10">
          Complete your membership payment
        </p>

        <form
          onSubmit={handlePayment}
        >

          <input
            type="text"
            placeholder="Card Number"
            value={cardNumber}
            onChange={(e) =>
              setCardNumber(
                e.target.value
              )
            }
            className="w-full p-4 mb-5 rounded-xl bg-black outline-none border border-gray-700"
            required
          />

          <input
            type="text"
            placeholder="Card Holder Name"
            value={cardName}
            onChange={(e) =>
              setCardName(
                e.target.value
              )
            }
            className="w-full p-4 mb-5 rounded-xl bg-black outline-none border border-gray-700"
            required
          />

          <div className="grid grid-cols-2 gap-5">

            <input
              type="text"
              placeholder="MM/YY"
              value={expiry}
              onChange={(e) =>
                setExpiry(
                  e.target.value
                )
              }
              className="w-full p-4 mb-5 rounded-xl bg-black outline-none border border-gray-700"
              required
            />

            <input
              type="password"
              placeholder="CVV"
              value={cvv}
              onChange={(e) =>
                setCvv(
                  e.target.value
                )
              }
              className="w-full p-4 mb-5 rounded-xl bg-black outline-none border border-gray-700"
              required
            />

          </div>

          <button
            disabled={loading}
            className="w-full bg-red-500 py-4 rounded-xl hover:bg-red-600 transition text-xl font-bold"
          >

            {
              loading
                ? "Processing Payment..."
                : "Pay Now"
            }

          </button>

        </form>

      </div>

    </div>

  );

}

export default Payment;