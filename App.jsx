import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home';
import { Login, Register } from './Components';
import FixedDepositCalculator from './Components/FixedDepositCalculator';
import CarInsuranceCalculator from './Components/CarInsuranceCalculator';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/fixed-deposit-calculator",  // Route for FD Calculator
    element: <FixedDepositCalculator />,
  },
  {
    path: "/car-insurance-calculator",  // Route for Car Insurance Calculator
    element: <CarInsuranceCalculator />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
