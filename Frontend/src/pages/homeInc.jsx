import React from "react";

function HomeInsurance() {
  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold mb-4">Home Insurance</h2>

      <p className="mb-4">
        Protect your home from unforeseen damages caused by natural disasters, theft, and accidents.
      </p>

      <h3 className="text-xl font-semibold mb-2">Key Benefits</h3>
      <ul className="list-disc pl-6 mb-4">
        <li>Coverage for fire, floods, and earthquakes</li>
        <li>Protection against burglary and theft</li>
        <li>Liability cover for injuries to guests</li>
        <li>Coverage for valuable home contents</li>
      </ul>

      <h3 className="text-xl font-semibold mb-2">Who Should Buy?</h3>
      <p className="mb-4">Homeowners and tenants looking for financial security.</p>

      <h3 className="text-xl font-semibold mb-2">Frequently Asked Questions</h3>
      <ul className="list-disc pl-6">
        <li><strong>Is my furniture covered?</strong> Yes, if you opt for content insurance.</li>
        <li><strong>Does home insurance cover water damage?</strong> Yes, in case of floods or plumbing failures.</li>
        <li><strong>Can I include jewelry in my policy?</strong> Yes, valuable items can be covered.</li>
      </ul>
    </div>
  );
}

export default HomeInsurance;
