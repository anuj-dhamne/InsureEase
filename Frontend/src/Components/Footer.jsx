import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-blue-900 text-white pt-10">
      <div className="container mx-auto px-6 grid md:grid-cols-4 gap-8 text-sm">
        
        {/* About Us */}
        <div>
          <h3 className="text-lg font-semibold">About InsureEase</h3>
          <p className="mt-2 text-gray-300">
            Your trusted partner for seamless and secure insurance solutions.
            We offer smart policies, fraud detection, and 24/7 support.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold">Quick Links</h3>
          <ul className="mt-2 space-y-2">
            <li><a href="/" className="hover:underline">Home</a></li>
            <li><a href="/vault" className="hover:underline">Vault</a></li>
            <li><a href="/plans" className="hover:underline">Plans</a></li>
            <li><a href="/calculators" className="hover:underline">Calculators</a></li>
            <li><a href="/support" className="hover:underline">Support</a></li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="text-lg font-semibold">Support</h3>
          <ul className="mt-2 space-y-2">
            <li><a href="/faq" className="hover:underline">FAQs</a></li>
            <li><a href="/claims" className="hover:underline">Claim Process</a></li>
            <li><a href="/contact" className="hover:underline">Customer Support</a></li>
          </ul>
        </div>

        {/* Social Media & Newsletter */}
        <div>
          <h3 className="text-lg font-semibold">Follow Us</h3>
          <div className="flex space-x-4 mt-2">
            <a href="https://facebook.com" className="hover:text-gray-300"><FaFacebook size={20} /></a>
            <a href="https://twitter.com" className="hover:text-gray-300"><FaTwitter size={20} /></a>
            <a href="https://linkedin.com" className="hover:text-gray-300"><FaLinkedin size={20} /></a>
            <a href="https://instagram.com" className="hover:text-gray-300"><FaInstagram size={20} /></a>
          </div>
          <h3 className="text-lg font-semibold mt-6">Subscribe to Updates</h3>
          <div className="mt-2">
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="p-2 w-full rounded text-black"
            />
            <button className="mt-2 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* Copyright & Terms */}
      <div className="mt-10 border-t border-gray-700 text-center py-4 text-sm text-gray-400">
        <p>&copy; {new Date().getFullYear()} InsureEase. All rights reserved.</p>
        <p><a href="/terms" className="hover:underline">Terms & Conditions</a> | <a href="/privacy" className="hover:underline">Privacy Policy</a></p>
      </div>
    </footer>
  );
};

export default Footer;
