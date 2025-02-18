import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdown, setDropdown] = useState(null);

  const toggleMenu = () => setIsOpen(!isOpen);
  const toggleDropdown = (menu) => {
    setDropdown(dropdown === menu ? null : menu);
  };

  return (
    <nav className="bg-blue-600 p-4 text-white">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">InsureEase</h1>
        <div className="md:hidden" onClick={toggleMenu}>
          {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </div>
        <ul className={`md:flex md:space-x-6 absolute md:static bg-blue-600 w-full left-0 md:w-auto p-4 md:p-0 ${isOpen ? "top-16" : "top-[-400px]"} transition-all duration-300`}>
          {['Category', 'Claim', 'Support'].map((item) => (
            <li key={item} className="relative">
              <button onClick={() => toggleDropdown(item)} className="hover:underline p-2">
                {item}
              </button>
              {dropdown === item && (
                <ul className="absolute left-0 mt-2 w-40 bg-white text-black rounded shadow-lg">
                  <li className="p-2 hover:bg-gray-200">Option 1</li>
                  <li className="p-2 hover:bg-gray-200">Option 2</li>
                  <li className="p-2 hover:bg-gray-200">Option 3</li>
                </ul>
              )}
            </li>
          ))}
          {/* link tag to be added */}
           <li>
            <a href="/#" className="hover:underline p-2 block">
              Vault
            </a>
          </li>
          <li className="relative">
            <button onClick={() => toggleDropdown('User')} className="hover:underline p-2">
              Account
            </button>
            {dropdown === 'User' && (
              <ul className="absolute left-0 mt-2 w-40 bg-white text-black rounded shadow-lg">
                <li className="p-2 hover:bg-gray-200"><Link to="/register">Sign Up</Link></li>
                <li className="p-2 hover:bg-gray-200"><Link to="/login">Log in</Link></li>
                <li className="p-2 hover:bg-gray-200">Logout</li>
              </ul>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
