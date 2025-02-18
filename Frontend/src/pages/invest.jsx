import React from "react";

function InvestmentInsurance() {
  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold mb-4">Investment Insurance</h2>
      
      <p className="mb-4">
        Secure your future with investment plans that combine wealth creation and life protection.
      </p>
      
      <h3 className="text-xl font-semibold mb-2">Key Benefits</h3>
      <ul className="list-disc pl-6 mb-4">
        <li>Dual benefit of investment and life cover</li>
        <li>Tax-saving under Section 80C</li>
        <li>Guaranteed returns with market-linked growth</li>
        <li>Flexible withdrawal options</li>
      </ul>

      <h3 className="text-xl font-semibold mb-2">Who Should Buy?</h3>
      <p className="mb-4">
        Ideal for individuals looking for financial security along with returns on their investment.
      </p>

      <h3 className="text-xl font-semibold mb-2">Frequently Asked Questions</h3>
      <ul className="list-disc pl-6">
        <li><strong>Are returns guaranteed?</strong> Some plans offer fixed returns, while others are market-linked.</li>
        <li><strong>What is the lock-in period?</strong> Typically 5 years for tax-saving plans.</li>
        <li><strong>Can I withdraw money anytime?</strong> Yes, after the lock-in period.</li>
      </ul>
    </div>
  );
}

export default InvestmentInsurance;
