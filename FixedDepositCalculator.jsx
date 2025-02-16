import React, { useState } from "react";

const FixedDepositCalculator = () => {
  const [principal, setPrincipal] = useState("");
  const [rate, setRate] = useState("");
  const [time, setTime] = useState("");
  const [maturityAmount, setMaturityAmount] = useState(null);

  const calculateMaturity = () => {
    const P = parseFloat(principal);
    const r = parseFloat(rate);
    const t = parseFloat(time);

    if (isNaN(P) || isNaN(r) || isNaN(t) || P <= 0 || r <= 0 || t <= 0) {
      alert("Please enter valid positive numbers.");
      return;
    }

    const A = P * Math.pow(1 + r / 100, t); // Compound interest formula
    setMaturityAmount(A.toFixed(2));
  };

  return (
    <div className="p-5 bg-white shadow-md rounded-md">
      <h2 className="text-xl font-bold mb-3">Fixed Deposit Calculator</h2>

      <div className="space-y-2">
        <input
          type="number"
          placeholder="Enter Principal Amount (₹)"
          value={principal}
          onChange={(e) => setPrincipal(e.target.value)}
          className="w-full p-2 border rounded"
        />

        <input
          type="number"
          placeholder="Enter Annual Interest Rate (%)"
          value={rate}
          onChange={(e) => setRate(e.target.value)}
          className="w-full p-2 border rounded"
        />

        <input
          type="number"
          placeholder="Enter Time Period (Years)"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          className="w-full p-2 border rounded"
        />

        <button
          onClick={calculateMaturity}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Calculate
        </button>

        {maturityAmount && (
          <p className="mt-3 text-lg font-bold">
            Maturity Amount: ₹{maturityAmount}
          </p>
        )}
      </div>
    </div>
  );
};

export default FixedDepositCalculator;
