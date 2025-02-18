import React from "react";

function FamilyHealthInsurance() {
  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold mb-4">Family Health Insurance</h2>

      <p className="mb-4">
        Secure your entire family's health with a single comprehensive insurance plan.
      </p>

      <h3 className="text-xl font-semibold mb-2">Key Benefits</h3>
      <ul className="list-disc pl-6 mb-4">
        <li>Single policy covering all family members</li>
        <li>Cashless treatment at partnered hospitals</li>
        <li>Coverage for critical illnesses and surgeries</li>
        <li>Preventive healthcare and wellness benefits</li>
      </ul>

      <h3 className="text-xl font-semibold mb-2">Who Should Buy?</h3>
      <p className="mb-4">Families looking for cost-effective healthcare security.</p>

      <h3 className="text-xl font-semibold mb-2">Frequently Asked Questions</h3>
      <ul className="list-disc pl-6">
        <li><strong>Can I add parents to the policy?</strong> Yes, many plans allow coverage for parents.</li>
        <li><strong>Does it cover maternity expenses?</strong> Some plans include maternity benefits.</li>
      </ul>
    </div>
  );
}

export default FamilyHealthInsurance;
