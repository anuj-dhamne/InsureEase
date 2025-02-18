import React, { useState } from "react";

const CarInsuranceCalculator = () => {
  const [carValue, setCarValue] = useState("");
  const [age, setAge] = useState("");
  const [driverExperience, setDriverExperience] = useState("");
  const [premium, setPremium] = useState(null);

  const calculatePremium = () => {
    const value = parseFloat(carValue);
    const carAge = parseInt(age);
    const experience = parseInt(driverExperience);

    if (isNaN(value) || isNaN(carAge) || isNaN(experience) || value <= 0 || carAge < 0 || experience < 0) {
      alert("Please enter valid numbers.");
      return;
    }

    const basePremium = 5000; // Base charge
    const depreciationFactor = carAge * 0.02; // 2% depreciation per year
    const riskFactor = experience < 2 ? 3000 : 1000; // Higher premium for new drivers

    const totalPremium = basePremium + (value * depreciationFactor) + riskFactor;
    setPremium(totalPremium.toFixed(2));
  };

  return (
    <div className="p-5 bg-white shadow-md rounded-md">
      <h2 className="text-xl font-bold mb-3">Car Insurance Premium Calculator</h2>

      <div className="space-y-2">
        <input
          type="number"
          placeholder="Enter Car Value (₹)"
          value={carValue}
          onChange={(e) => setCarValue(e.target.value)}
          className="w-full p-2 border rounded"
        />

        <input
          type="number"
          placeholder="Enter Car Age (Years)"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          className="w-full p-2 border rounded"
        />

        <input
          type="number"
          placeholder="Enter Driver's Experience (Years)"
          value={driverExperience}
          onChange={(e) => setDriverExperience(e.target.value)}
          className="w-full p-2 border rounded"
        />

        <button
          onClick={calculatePremium}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Calculate
        </button>

        {premium && (
          <p className="mt-3 text-lg font-bold">
            Estimated Premium: ₹{premium}
          </p>
        )}
      </div>
    </div>
  );
};

export default CarInsuranceCalculator;
