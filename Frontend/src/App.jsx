import './App.css'
import { Navbar } from './Components'
import Part1 from './Components/Part1'
import Plans from './Components/Plans'
import HowItWorks from './Components/HowItWorks'
import WhyInsureEase from './Components/WhyInsureEase'
import CoreFunc from './Components/CoreFunc'
import Calculators from './Components/Calculators'
import Footer from './Components/Footer'
import FAQ from './Components/FAQ'

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
          element: <Login/>
        },
        {
          path: "register",
          element: <Register/>
        },
       
      ]
    }
  ])
  return (
  <>
  <Navbar/>
  <Part1/>
  <Plans/>
  <HowItWorks/>
  <WhyInsureEase/>
  <CoreFunc/>
  <Calculators/>
  <FAQ/>
  <Footer/>
  </>
  )
}

export default App
