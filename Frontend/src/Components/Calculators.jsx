import { useNavigate } from "react-router-dom";

const Calculators = () => {
//   const navigate = useNavigate();

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold text-center mb-6">Our Calculators</h2>
      
      {/* Calculator Sections */}
      <div className="grid md:grid-cols-3 gap-6">
        
        {/* Investment Calculators */}
        <div className="bg-white shadow-lg rounded-lg p-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Investment Calculators</h3>
            <img src="https://tse4.mm.bing.net/th?id=OIP.55fhWNrsKiTWF9211uw48wHaHa&pid=Api&P=0&h=180" alt="Investment" className="w-10 h-10" />
          </div>
          <ul className="text-gray-600 space-y-1 mt-2">
            <li>Fixed Deposit Calculator</li>
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

        {/* Policy Premium Calculators */}
        <div className="bg-white shadow-lg rounded-lg p-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Policy Premium Calculators</h3>
            <img src="https://tse3.mm.bing.net/th?id=OIP.madWgYmD7tv6PLw1Tzi9dgHaEh&pid=Api&P=0&h=180" alt="Policy Premium" className="w-10 h-10" />
          </div>
          <ul className="text-gray-600 space-y-1 mt-2">
            <li>Car Insurance Premium Calculator</li>
            <li>Health Insurance Premium Estimator</li>
            <li>Home Insurance Cost Estimator</li>
          </ul>
        </div>
      </div>

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
