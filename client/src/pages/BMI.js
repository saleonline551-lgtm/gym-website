import React, {
  useState
} from "react";

function BMI() {

  const [height,
    setHeight] =
    useState("");

  const [weight,
    setWeight] =
    useState("");

  const [bmi,
    setBMI] =
    useState(null);

  const [status,
    setStatus] =
    useState("");

  const calculateBMI = () => {

    const heightInMeter =
      height / 100;

    const bmiValue =
      (
        weight /
        (
          heightInMeter *
          heightInMeter
        )
      ).toFixed(1);

    setBMI(bmiValue);

    if (bmiValue < 18.5) {

      setStatus(
        "Underweight"
      );

    } else if (
      bmiValue >= 18.5 &&
      bmiValue < 25
    ) {

      setStatus("Normal");

    } else if (
      bmiValue >= 25 &&
      bmiValue < 30
    ) {

      setStatus(
        "Overweight"
      );

    } else {

      setStatus("Obese");

    }

  };

  return (

    <div className="min-h-screen bg-black text-white flex justify-center items-center px-5">

      <div className="bg-gray-900 p-10 rounded-2xl w-full max-w-lg">

        <h1 className="text-5xl font-bold text-center text-red-500 mb-10">
          BMI Calculator
        </h1>

        <input
          type="number"
          placeholder="Height (cm)"
          value={height}
          onChange={(e) =>
            setHeight(
              e.target.value
            )
          }
          className="w-full p-4 mb-5 rounded-xl bg-black outline-none"
        />

        <input
          type="number"
          placeholder="Weight (kg)"
          value={weight}
          onChange={(e) =>
            setWeight(
              e.target.value
            )
          }
          className="w-full p-4 mb-5 rounded-xl bg-black outline-none"
        />

        <button
          onClick={calculateBMI}
          className="w-full bg-red-500 py-4 rounded-xl hover:bg-red-600"
        >
          Calculate BMI
        </button>

        {bmi && (

          <div className="bg-black p-6 rounded-2xl mt-8 text-center">

            <h1 className="text-5xl font-bold text-red-500">
              {bmi}
            </h1>

            <p className="text-2xl mt-4">
              {status}
            </p>

          </div>

        )}

      </div>

    </div>

  );
}

export default BMI;