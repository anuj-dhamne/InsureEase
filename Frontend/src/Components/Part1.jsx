import React from 'react'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


function Part1() {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
      };
  return (
    <div className="flex flex-col md:flex-row w-full p-6 gap-4 items-center">
    <div className="md:w-3/5 w-full bg-gray-200 p-4"> 
      <Slider {...settings}>
        <img src="https://images.unsplash.com/photo-1637763723578-79a4ca9225f7?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGluc3VycmFuY2UlMjBwb2xpY3l8ZW58MHx8MHx8fDA%3D" alt="Insurance 1" className="w-full" />
        <img src="https://media.istockphoto.com/id/1028736004/photo/never-overlook-the-fine-print.webp?a=1&b=1&s=612x612&w=0&k=20&c=7nEDzlgH44ffFHjFju_SNiBCGnyhEvEaxd7sE0MkoHY=" alt="Insurance 2" className="w-full" />
        <img src="https://media.istockphoto.com/id/1226082621/photo/insurance-concept-stack-of-wooden-blocks-with-words-life-health-legal-expenses-business-house.webp?a=1&b=1&s=612x612&w=0&k=20&c=SKh5ZBMYRLJLzCCU8h9qTW9wQDVq10f8dHE-agObOsQ=" alt="Insurance 3" className="w-full" />
      </Slider>
    </div>
    <div className="md:w-2/5 w-full bg-gray-100 p-4 text-center">
      <h2 className="text-2xl font-bold">Insurance Plans</h2>
      <p className="text-gray-600">Secure your future with our best insurance policies.</p>
    </div>
  </div>
  )
}

export default Part1