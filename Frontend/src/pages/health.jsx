import React from "react";

function HealthInsurance() {
  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold mb-4">Health Insurance</h2>

      <p className="mb-4">
        Ensure financial security against medical expenses with comprehensive health insurance coverage.
      </p>

      <h3 className="text-xl font-semibold mb-2">Key Benefits</h3>
      <ul className="list-disc pl-6 mb-4">
        <li>Coverage for hospitalization and medical expenses</li>
        <li>Cashless treatment at network hospitals</li>
        <li>Pre- and post-hospitalization cost coverage</li>
        <li>Critical illness and daycare procedure benefits</li>
      </ul>

      <h3 className="text-xl font-semibold mb-2">Who Should Buy?</h3>
      <p className="mb-4">Anyone looking to protect their health and finances against medical emergencies.</p>

      <h3 className="text-xl font-semibold mb-2">Frequently Asked Questions</h3>
      <ul className="list-disc pl-6">
        <li><strong>Is health insurance necessary?</strong> Yes, it helps cover medical costs and ensures quality healthcare.</li>
        <li><strong>Can I add family members?</strong> Yes, family floater plans provide coverage for the entire family.</li>
        <li><strong>Does it cover pre-existing diseases?</strong> Some plans cover pre-existing conditions after a waiting period.</li>
      </ul>
    </div>
  );
}

export default HealthInsurance;
