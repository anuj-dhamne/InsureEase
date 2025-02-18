import React from "react";

function ChildInsurance() {
  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold mb-4">Child Saving Insurance</h2>

      <p className="mb-4">
        Secure your child’s future with financial support for education and other life goals.
      </p>

      <h3 className="text-xl font-semibold mb-2">Key Benefits</h3>
      <ul className="list-disc pl-6 mb-4">
        <li>Guaranteed financial support for higher education</li>
        <li>Flexible payout options</li>
        <li>Tax-free maturity benefits</li>
        <li>Premium waiver in case of an unforeseen event</li>
      </ul>

      <h3 className="text-xl font-semibold mb-2">Who Should Buy?</h3>
      <p className="mb-4">Parents who want to build a secure financial future for their children.</p>

      <h3 className="text-xl font-semibold mb-2">Frequently Asked Questions</h3>
      <ul className="list-disc pl-6">
        <li><strong>Can I withdraw funds before maturity?</strong> Partial withdrawals are allowed in some policies.</li>
        <li><strong>Is there a lock-in period?</strong> Yes, most policies have a 5-year lock-in period.</li>
        <li><strong>What happens if the policyholder dies?</strong> The insurer waives future premiums, ensuring continued benefits.</li>
      </ul>
    </div>
  );
}

export default ChildInsurance;
