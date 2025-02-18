import React from "react";

function BikeInsurance() {
  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold mb-4">Bike Insurance</h2>

      <p className="mb-4">
        Secure your two-wheeler from accidental damages, theft, and legal liabilities.
      </p>

      <h3 className="text-xl font-semibold mb-2">Key Benefits</h3>
      <ul className="list-disc pl-6 mb-4">
        <li>Third-party and comprehensive coverage</li>
        <li>Cashless repair at network garages</li>
        <li>24/7 roadside assistance</li>
        <li>Protection against theft, fire, and accidents</li>
      </ul>

      <h3 className="text-xl font-semibold mb-2">Who Should Buy?</h3>
      <p className="mb-4">Bike owners who want financial protection for their vehicle.</p>

      <h3 className="text-xl font-semibold mb-2">Frequently Asked Questions</h3>
      <ul className="list-disc pl-6">
        <li><strong>Is bike insurance mandatory?</strong> Yes, at least third-party insurance is legally required.</li>
        <li><strong>Can I transfer my policy if I sell my bike?</strong> Yes, the policy can be transferred to the new owner.</li>
        <li><strong>What happens if I lose my bike?</strong> Comprehensive insurance covers theft.</li>
      </ul>
    </div>
  );
}

export default BikeInsurance;
