import { FaArrowRight, FaArrowDown } from "react-icons/fa";

const HowItWorks = () => {
  const steps = [
    {
      image: "https://tse4.mm.bing.net/th?id=OIP.skJphL_eoklvM0ao__lT7wHaHa&pid=Api&P=0&h=180",
      title: "Step 1: Choose a Plan",
      description: "Select the best insurance plan based on your needs.",
    },
    {
      image: "https://tse1.mm.bing.net/th?id=OIP.O5wyrGxAgL-nREy0bW0TPQHaHa&pid=Api&P=0&h=180",
      title: "Step 2: Fill in Details",
      description: "Provide your information to get the best quotes.",
    },
    {
      image: "https://tse1.mm.bing.net/th?id=OIP.eDaOuQva4IJkQUpxTVr1FwHaHa&pid=Api&P=0&h=180",
      title: "Step 3: Get Insured",
      description: "Make the payment and enjoy your coverage.",
    },
  ];

  return (
    <div className="container mx-auto p-6 text-center">
      <h2 className="text-2xl font-bold mb-6">How InsureEase Works?</h2>
      <div className="flex flex-col md:flex-row items-center justify-center space-y-6 md:space-y-0 md:space-x-8">
        {steps.map((step, index) => (
          <div key={index} className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4">
            {/* Step Card */}
            <div className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center text-center w-48">
              <img src={step.image} alt={step.title} className="w-16 h-16 object-cover rounded-lg" />
              <h3 className="text-lg font-bold mt-2">{step.title}</h3>
              <p className="text-gray-600 text-sm">{step.description}</p>
            </div>

            {/* Conditional Arrow (Horizontal for large screens, Vertical for small screens) */}
            {index < steps.length - 1 && (
              <div className="text-3xl text-gray-500 hidden md:block">
                <FaArrowRight />
              </div>
            )}
            {index < steps.length - 1 && (
              <div className="text-3xl text-gray-500 md:hidden">
                <FaArrowDown />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default HowItWorks;
