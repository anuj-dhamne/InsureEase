import React, { use, useState } from "react";
import { useNavigate } from "react-router-dom";
import FixedDepositCalculator from "./FixedDepositCalculator";
import CarInsuranceCalculator from "./CarInsuranceCalculator";

const Calculators = () => {
  const navigate=useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeCalculator, setActiveCalculator] = useState(null);

  // Open modal and set the selected calculator
  const openModal = (calculator) => {
    setActiveCalculator(calculator);
    setIsModalOpen(true);
  };

  // Close modal
  const closeModal = () => {
    setIsModalOpen(false);
    setActiveCalculator(null);
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold text-center mb-6">Our Calculators</h2>

      {/* Calculator Sections */}
      <div className="grid md:grid-cols-3 gap-6 bg-white">
        {/* Investment Calculators */}
        <div className="bg-white shadow-lg rounded-lg p-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Investment Calculators</h3>
            <img src="https://tse4.mm.bing.net/th?id=OIP.55fhWNrsKiTWF9211uw48wHaHa&pid=Api&P=0&h=180" alt="Investment" className="w-10 h-10" />
          </div>
          <ul className="text-gray-600 space-y-1 mt-2">
            <li className="cursor-pointer text-black-600 hover:underline" onClick={() => openModal("FixedDeposit")}>Fixed Deposit Calculator</li>
            <li>Mutual Fund SIP Calculator</li>
            <li>Retirement Calculator</li>
          </ul>
        </div>

        {/* Term Insurance Calculators */}
        <div className="bg-white shadow-lg rounded-lg p-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Term Insurance Calculators</h3>
            <img src="https://tse1.mm.bing.net/th?id=OIP.TIUD_KzdvqZSYf8j6stqFAAAAA&pid=Api&P=0&h=180" alt="Term Insurance" className="w-10 h-10" />
          </div>
          <ul className="text-gray-600 space-y-1 mt-2">
            <li>Life Cover Calculator</li>
            <li>Term Insurance Premium Estimator</li>
            <li>Human Life Value Calculator</li>
          </ul>
        </div>

        {/* Car Insurance Premium Calculator */}
        <div className="bg-white shadow-lg rounded-lg p-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Insurance Premium Calculator</h3>
            <img src="https://tse3.mm.bing.net/th?id=OIP.madWgYmD7tv6PLw1Tzi9dgHaEh&pid=Api&P=0&h=180" alt="Car Insurance" className="w-10 h-10" />
          </div>
          <ul className="text-gray-600 space-y-1 mt-2">
            <li className="cursor-pointer text-black-600 hover:underline" onClick={() => openModal("CarInsurance")}>Car Insurance Premium</li>
            <li>Health Insurance Premium Estimator</li>
            <li>Home Insurance Cost Estimator</li>
          </ul>
        </div>
      </div>

      {/* Modal for Calculators */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-white bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-3">
              {activeCalculator === "FixedDeposit" ? "Fixed Deposit Calculator" : "Car Insurance Premium Calculator"}
            </h2>

            {/* Render the selected calculator */}
            {activeCalculator === "FixedDeposit" && <FixedDepositCalculator />}
            {activeCalculator === "CarInsurance" && <CarInsuranceCalculator />}

            <button onClick={closeModal} className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700">Close</button>
          </div>
        </div>
      )}
      {/* More Button */}
      <div className="text-center mt-6">
        <button 
          onClick={null}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          More
        </button>
      </div>
    </div>
  );
};

export default Calculators;
