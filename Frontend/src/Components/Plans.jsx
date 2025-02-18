import { useNavigate } from "react-router-dom";
import { useState } from "react";

// Import images
import termLifeImg from "../images/protection_16275716.gif";
import healthImg from "../images/solidarity_17862555.gif";
import investmentImg from "../images/dollar_12147287.gif";
import carImg from "../images/car-insurance_7920873.gif";
import bikeImg from "../images/scooter_17850341.gif";
import familyHealthImg from "../images/family_17447499.gif";
import travelImg from "../images/travel_8112689.gif";
import termWomenImg from "../images/prisoner_14168068.gif";
import childSavingsImg from "../images/baby_15745096.gif";
import retirementImg from "../images/walking_11202419.gif";
import employeeHealthImg from "../images/career_17438234.gif";
import homeImg from "../images/home_17905786.gif";

function Plans() {
  const navigate = useNavigate();

  // Define available insurance pages
  const availableRoutes = [
    "car",
    "bike",
    "health",
    "travel",
    "home",
    "life",
    "term-life",
    "term-women",
    "employee-health",
    "retirement",
    "child-savings",
    "investment",
    "family-health"
  ];
  

  // Store plans in state (Removed Return Premium & Guaranteed Return)
  const [plansData] = useState([
    { id: "term-life", image: termLifeImg, title: "Term Life Insurance", badge: "Upto 15% Discount" },
    { id: "health", image: healthImg, title: "Health Insurance", badge: "FREE Home Visit" },
    { id: "investment", image: investmentImg, title: "Investment Plans", badge: "In-Built Life Cover" },
    { id: "car", image: carImg, title: "Car Insurance", badge: "Upto 91% Discount" },
    { id: "bike", image: bikeImg, title: "2 Wheeler Insurance", badge: "Upto 85% Discount" },
    { id: "family-health", image: familyHealthImg, title: "Family Health Insurance", badge: "Upto 25% Discount" },
    { id: "travel", image: travelImg, title: "Travel Insurance" },
    { id: "term-women", image: termWomenImg, title: "Term Insurance (Women)", badge: "Upto 20% Cheaper" },
    { id: "child-savings", image: childSavingsImg, title: "Child Savings Plans", badge: "Premium Waiver" },
    { id: "retirement", image: retirementImg, title: "Retirement Plans" },
    { id: "employee-health", image: employeeHealthImg, title: "Employee Group Health Insurance", badge: "Upto 65% Discount" },
    { id: "home", image: homeImg, title: "Home Insurance", badge: "Upto 25% Discount" },
  ]);

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-xl font-bold mb-4 text-center">Our Insurance Plans</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
        {plansData.map((plan) => (
          <div
            key={plan.id}
            className={`bg-white shadow-lg rounded-xl p-4 transition-all cursor-pointer relative ${
              availableRoutes.includes(plan.id) ? "hover:shadow-2xl" : "opacity-50 cursor-not-allowed"
            }`}
            onClick={() => availableRoutes.includes(plan.id) && navigate(`/insurance/${plan.id}`)}
          >
            {plan.badge && (
              <span className="absolute top-0 left-0 bg-green-200 text-green-800 text-xs px-2 py-1 rounded-tr-lg rounded-bl-lg">
                {plan.badge}
              </span>
            )}
            <img src={plan.image} alt={plan.title} className="w-full rounded-lg" />
            <h3 className="text-center font-semibold mt-2">{plan.title}</h3>
          </div>
        ))}
      </div>
      <div className="text-center mt-6">
        <button
          className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
          onClick={() => navigate("/plans")}
        >
          View all products
        </button>
      </div>
    </div>
  );
}

export default Plans;
