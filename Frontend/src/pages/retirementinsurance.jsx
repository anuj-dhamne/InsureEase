import React from "react";

function RetirementInsurance() {
  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold mb-4">Retirement Insurance</h2>

      <p className="mb-4">
        Enjoy financial independence after retirement with a steady income and life coverage.
      </p>

      <h3 className="text-xl font-semibold mb-2">Key Benefits</h3>
      <ul className="list-disc pl-6 mb-4">
        <li>Guaranteed lifelong pension</li>
        <li>Multiple annuity options</li>
        <li>Tax benefits on premiums paid</li>
        <li>Death benefits for dependents</li>
      </ul>

      <h3 className="text-xl font-semibold mb-2">Who Should Buy?</h3>
      <p className="mb-4">Individuals planning a financially stable post-retirement life.</p>

      <h3 className="text-xl font-semibold mb-2">Frequently Asked Questions</h3>
      <ul className="list-disc pl-6">
        <li><strong>When can I start receiving pension payments?</strong> You can choose an annuity plan starting from age 55 or 60.</li>
        <li><strong>Can I withdraw funds early?</strong> Some plans allow partial withdrawals after the lock-in period.</li>
        <li><strong>Is there a lump sum payout option?</strong> Yes, some plans offer a one-time maturity benefit.</li>
      </ul>
    </div>
  );
}

export default RetirementInsurance;
