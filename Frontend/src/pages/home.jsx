import React from 'react'
import {Navbar,Part1,Plans,HowItWorks,WhyInsureEase,CoreFunc,Calculators,FAQ,Footer,Chatbot} from "../Components/index.js"

function Home() {
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

export default Home