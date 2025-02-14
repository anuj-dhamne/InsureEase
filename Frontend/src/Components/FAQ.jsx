import { useState } from "react";
import { FaPlus, FaMinus } from "react-icons/fa";

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqData = [
    {
      question: "What is InsureEase?",
      answer: "InsureEase is an innovative insurance platform that simplifies policy management, fraud detection, and claims processing.",
    },
    {
      question: "How do I purchase an insurance plan?",
      answer: "You can explore various plans on our website, compare benefits, and purchase a plan directly through our secure platform.",
    },
    {
      question: "What documents are required for a claim?",
      answer: "Typically, you need your policy details, proof of loss, and identification. Specific requirements depend on the claim type.",
    },
    {
      question: "How can I contact customer support?",
      answer: "Our 24/7 customer support is available via chat, email, or phone. Visit our Support page for more details.",
    },
  ];

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold text-center mb-6">Frequently Asked Questions</h2>

      <div className="max-w-2xl mx-auto space-y-4">
        {faqData.map((faq, index) => (
          <div key={index} className="bg-white border rounded-lg shadow p-4">
            <button
              onClick={() => toggleFAQ(index)}
              className="flex justify-between items-center w-full text-left text-lg font-medium"
            >
              <span>{faq.question}</span>
              {openIndex === index ? <FaMinus /> : <FaPlus />}
            </button>
            {openIndex === index && (
              <p className="mt-3 text-gray-600 transition-all">{faq.answer}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
