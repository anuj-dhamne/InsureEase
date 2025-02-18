import React from "react";

function CarInsurance() {
  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold mb-4">Car Insurance</h2>

      <p className="mb-4">
        Protect your vehicle against damages, accidents, and theft with a reliable car insurance policy.
      </p>

      <h3 className="text-xl font-semibold mb-2">Key Benefits</h3>
      <ul className="list-disc pl-6 mb-4">
        <li>Comprehensive coverage for accidental damages</li>
        <li>Third-party liability protection</li>
        <li>Cashless repair facility at network garages</li>
        <li>Coverage for theft, fire, and natural disasters</li>
      </ul>

      <h3 className="text-xl font-semibold mb-2">Who Should Buy?</h3>
      <p className="mb-4">Car owners looking for financial security against unforeseen damages.</p>

      <h3 className="text-xl font-semibold mb-2">Frequently Asked Questions</h3>
      <ul className="list-disc pl-6">
        <li><strong>Is car insurance mandatory?</strong> Yes, third-party insurance is required by law.</li>
        <li><strong>Can I renew my policy online?</strong> Yes, renewal is possible online with instant policy issuance.</li>
        <li><strong>What is a No-Claim Bonus (NCB)?</strong> A discount for policyholders who don’t make claims.</li>
      </ul>
    </div>
  );
}

export default CarInsurance;
