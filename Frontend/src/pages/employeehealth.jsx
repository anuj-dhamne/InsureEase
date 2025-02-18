import React from "react";

function EmployeeHealthInsurance() {
  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold mb-4">Employee Group Health Insurance</h2>
      
      <p className="mb-4">
        Provide your employees with comprehensive health coverage, ensuring their well-being and productivity.
      </p>
      
      <h3 className="text-xl font-semibold mb-2">Key Benefits</h3>
      <ul className="list-disc pl-6 mb-4">
        <li>Cashless hospitalization across 5,000+ hospitals</li>
        <li>Flexible policy customization based on team size</li>
        <li>Pre-existing disease coverage</li>
        <li>Outpatient & maternity benefits</li>
        <li>Tax benefits for employers</li>
      </ul>

      <h3 className="text-xl font-semibold mb-2">Who Should Buy?</h3>
      <p className="mb-4">
        Companies of all sizes, from startups to enterprises, looking to offer competitive employee benefits.
      </p>

      <h3 className="text-xl font-semibold mb-2">Frequently Asked Questions</h3>
      <ul className="list-disc pl-6">
        <li><strong>Does this cover pre-existing conditions?</strong> Yes, after a waiting period.</li>
        <li><strong>Can I add family members?</strong> Yes, at an additional cost.</li>
        <li><strong>What are the tax benefits?</strong> Premiums are deductible under corporate tax laws.</li>
      </ul>
    </div>
  );
}

export default EmployeeHealthInsurance;
