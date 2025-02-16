import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navbar } from "./Components";
import Part1 from "./Components/Part1";
import Plans from "./Components/Plans";
import HowItWorks from "./Components/HowItWorks";
import WhyInsureEase from "./Components/WhyInsureEase";
import CoreFunc from "./Components/CoreFunc";
import Calculators from "./Components/Calculators";
import FAQ from "./Components/FAQ";
import Footer from "./Components/Footer";

// Importing all individual insurance pages
import CarInsurance from "./pages/car";
import TravelInsurance from "./pages/travel";
import HomeInsurance from "./pages/home";
import HealthInsurance from "./pages/health";
import LifeInsurance from "./pages/termlifeinsurance";
import BikeInsurance from "./pages/bike";
import FamilyHealthInsurance from "./pages/familyhealth";
import TermWomenInsurance from "./pages/termlifewomen";
import InvestmentInsurance from "./pages/invest";
import EmployeeHealthInsurance from "./pages/employeehealth";
import ChildSavingsInsurance from "./pages/childsaving";
import RetirementInsurance from "./pages/retirementinsurance";




function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Main Page */}
        <Route
          path="/"
          element={
            <>
              <Part1 />
              <Plans />
              <HowItWorks />
              <WhyInsureEase />
              <CoreFunc />
              <Calculators />
              <FAQ />
            </>
          }
        />

        {/* Insurance Pages */}
        <Route path="/insurance/car" element={<CarInsurance />} />
        <Route path="/insurance/travel" element={<TravelInsurance />} />
        <Route path="/insurance/home" element={<HomeInsurance />} />
        <Route path="/insurance/health" element={<HealthInsurance />} />
        <Route path="/insurance/term-life" element={<LifeInsurance />} />
        <Route path="/insurance/bike" element={<BikeInsurance />} />
        <Route path="/insurance/family-health" element={<FamilyHealthInsurance />} />
        <Route path="/insurance/term-women" element={<TermWomenInsurance/>} />
        <Route path="/insurance/investment" element={<InvestmentInsurance />} />
        <Route path="/insurance/employee-health" element={<EmployeeHealthInsurance />} />
        <Route path="/insurance/child-savings" element={<ChildSavingsInsurance />} />
        <Route path="/insurance/retirement" element={<RetirementInsurance />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
