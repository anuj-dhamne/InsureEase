import React from "react";

function TravelInsurance() {
  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold mb-4">Travel Insurance</h2>

      <p className="mb-4">
        Stay protected from unexpected travel-related expenses, including medical emergencies and trip cancellations.
      </p>

      <h3 className="text-xl font-semibold mb-2">Key Benefits</h3>
      <ul className="list-disc pl-6 mb-4">
        <li>Coverage for flight cancellations and delays</li>
        <li>Medical emergency and hospitalization cover</li>
        <li>Lost baggage and passport assistance</li>
        <li>Accidental death or disability benefit</li>
      </ul>

      <h3 className="text-xl font-semibold mb-2">Who Should Buy?</h3>
      <p className="mb-4">Frequent travelers, vacationers, and business travelers seeking financial security.</p>

      <h3 className="text-xl font-semibold mb-2">Frequently Asked Questions</h3>
      <ul className="list-disc pl-6">
        <li><strong>Does it cover COVID-19?</strong> Yes, if explicitly included in the policy.</li>
        <li><strong>What happens if my flight gets canceled?</strong> You can claim reimbursement under specific conditions.</li>
        <li><strong>Is adventure sports covered?</strong> Some plans offer adventure sports coverage.</li>
      </ul>
    </div>
  );
}

export default TravelInsurance;
