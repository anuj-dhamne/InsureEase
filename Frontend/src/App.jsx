import './App.css'
import Home from './pages/Home'
import { createBrowserRouter, RouterProvider } from 'react-router'
import { createRoot } from 'react-dom/client'
import { Login, Register } from './Components'
import CarInsuranceCalculator from './Components/CarInsuranceCalculator';
import FixedDepositCalculator from './Components/FixedDepositCalculator';
import CarInsurance from "./pages/car";
import TravelInsurance from "./pages/travel";
import HomeInsurance from "./pages/homeInc";
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
  const router = createBrowserRouter([
    {
      path: "/",
      element: "",
      children: [
        {
          path: "",
          element: <Home />
        },
        {
          path: "login",
          element: <Login />
        },
        {
          path: "register",
          element: <Register />
        },
        {
          path: "/fixed-deposit-calculator",  // Route for FD Calculator
          element: <FixedDepositCalculator />,
        },
        {
          path: "/car-insurance-calculator",  // Route for Car Insurance Calculator
          element: <CarInsuranceCalculator />,
        },
        {
          path: "/insurance/car",  
          element: <CarInsurance/>,
        },
        {
          path: "/insurance/travel",  
          element: <TravelInsurance/>,
        },
        {
          path: "/insurance/home",  
          element:<HomeInsurance /> ,
        },
        {
          path: "/insurance/health",  
          element:<HealthInsurance /> ,
        },
        {
          path: "/insurance/term-life",  
          element:<LifeInsurance /> ,
        },
        {
          path: "/insurance/bike",  
          element:<BikeInsurance/>,
        },
        {
          path: "/insurance/family-health",  
          element:<FamilyHealthInsurance/>,
        },
        {
          path: "/insurance/term-women",  
          element:<TermWomenInsurance/>,
        },
        {
          path: "/insurance/term-women",  
          element:<TermWomenInsurance/>,
        },
        {
          path: "/insurance/investment",  
          element:<InvestmentInsurance/>,
        },
        {
          path: "/insurance/employee-health",  
          element:<EmployeeHealthInsurance/>,
        },
        {
          path: "/insurance/child-saving",  
          element:<ChildSavingsInsurance/>,
        },
        {
          path: "/insurance/retirement",  
          element:<RetirementInsurance/>,
        },
        

      ]
    }
  ])
  return (
    <RouterProvider router={router}>
      <Home />
    </RouterProvider>

  )
}

export default App;