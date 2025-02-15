import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
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
import Chatbot from './Components/Chatbot';

function App() {

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
  <Chatbot />
  </>
  
  )
}

export default App
