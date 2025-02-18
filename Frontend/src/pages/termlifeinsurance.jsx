import React from "react";

function TermLifeInsurance() {
  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold mb-4">Term Life Insurance</h2>

      <p className="mb-4">
        Secure your family's future with a comprehensive term life insurance plan that provides financial protection.
      </p>

      <h3 className="text-xl font-semibold mb-2">Key Benefits</h3>
      <ul className="list-disc pl-6 mb-4">
        <li>High coverage at affordable premiums</li>
        <li>Tax benefits under Section 80C</li>
        <li>Option to add riders like accidental death cover</li>
        <li>Flexible payout options</li>
      </ul>

      <h3 className="text-xl font-semibold mb-2">Who Should Buy?</h3>
      <p className="mb-4">Individuals looking for long-term financial security for their family.</p>

      <h3 className="text-xl font-semibold mb-2">Frequently Asked Questions</h3>
      <ul className="list-disc pl-6">
        <li><strong>What is the ideal age to buy term insurance?</strong> The earlier, the better for lower premiums.</li>
        <li><strong>Can I add critical illness coverage?</strong> Yes, you can add riders for extra coverage.</li>
      </ul>
    </div>
  );
}

export default TermLifeInsurance;
