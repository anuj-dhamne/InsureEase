import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
const CoreFunc = () => {
  const slides = [
    {
      image: "https://tse3.mm.bing.net/th?id=OIP.Jv14faNVs03UnYuVyvq6fgHaHa&pid=Api&P=0&h=180",
      title: "Insurance Fraudster",
      description: "Get the best car insurance with affordable premiums.",
    },
    {
      image: "https://tse4.mm.bing.net/th?id=OIP.TroWYIWGZ-NMall3d-OS1wHaHa&pid=Api&P=0&h=180",
      title: "Customer Care 24 * 7",
      description: "Secure your future with the best health insurance plans.",
    },
    {
      image: "https://tse3.mm.bing.net/th?id=OIP.F1L5EshwlyKX4IGpOQoaBQAAAA&pid=Api&P=0&h=180",
      title: "Fraud detection policy",
      description: "Protect your home with comprehensive coverage.",
    },
    {
      image: "https://tse3.mm.bing.net/th?id=OIP.2rcNjbeW3qmwvEt-Lx_7IAHaG3&pid=Api&P=0&h=180",
      title: "Ask any Quetions",
      description: "Travel stress-free with our reliable insurance plans.",
    },
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000, 
    cssEase: "linear", // Smooth transition
    pauseOnHover: false, // Don't stop when hovered
    responsive: [
      {
        breakpoint: 768, // For tablets & mobiles
        settings: {
          slidesToShow: 1, // Show 1 at a time on smaller screens
        },
      },
    ],
  };

  return (
    <div className="container mx-auto p-6">
      {/* <h2 className="text-2xl font-bold text-center mb-6">Our Insurance Plans</h2> */}
      <Slider {...settings}>
        {slides.map((slide, index) => (
          <div
            key={index}
            className="bg-white shadow-lg rounded-lg flex items-center p-4 mx-2 h-36"
          >
            {/* Left Text Content */}
            <div className="flex-1">
              <h3 className="text-lg font-semibold">{slide.title}</h3>
              <p className="text-gray-600">{slide.description}</p>
            </div>

            {/* Right Image */}
            <div className="w-24 h-24 flex-shrink-0">
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default CoreFunc;
