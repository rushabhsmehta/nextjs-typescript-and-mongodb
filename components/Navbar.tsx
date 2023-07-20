import { useState } from 'react';
import Image from 'next/image';
import { FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa';

const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="flex items-center justify-between py-0 px-6 bg-transparent">
      <div className="flex items-center">
        <Image src="/company-logo.png" alt="Company Logo" width={120} height={40} />
      </div>

      <div className={`md:flex ${isMobileMenuOpen ? 'flex' : 'hidden'}`}>
        <input type="text" className="w-40 md:w-auto bg-gray-200 rounded-md py-2 px-4 focus:outline-none" placeholder="Search" />

        <div className="ml-4 flex items-center space-x-2">
          <a href="#" className="text-white">
            <FaFacebookF />
          </a>
          <a href="#" className="text-white">
            <FaTwitter />
          </a>
          <a href="#" className="text-white">
            <FaInstagram />
          </a>
        </div>
      </div>

      <button className="md:hidden text-white" onClick={toggleMobileMenu}>
        {isMobileMenuOpen ? (
          <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        )}
      </button>
    </nav>
  );
};

export default Navbar;
