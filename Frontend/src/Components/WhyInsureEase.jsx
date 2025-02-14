import { FaCheckCircle } from "react-icons/fa";

const WhyInsureEase = () => {
  const points = [
    "Comprehensive and customizable insurance plans.",
    "Hassle-free claims process with 24/7 support.",
    "Competitive pricing with no hidden charges.",
    "AI-powered policy recommendations.",
    "Quick and secure online application.",
  ];

  return (
    <div className="container mx-auto p-6 text-center">
      <h2 className="text-2xl font-bold mb-4">What Makes InsureEase Different?</h2>
      <div className="bg-white shadow-md rounded-lg p-6 max-w-2xl mx-auto">
        <ul className="text-left space-y-3">
          {points.map((point, index) => (
            <li key={index} className="flex items-center space-x-3 text-gray-700">
              <FaCheckCircle className="text-green-500 text-lg" />
              <span>{point}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default WhyInsureEase;
