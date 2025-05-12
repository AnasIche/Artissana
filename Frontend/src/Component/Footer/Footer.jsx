import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#2C3E50] text-white py-6">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-4">
        {/* Logo */}
        <div className="text-2xl font-bold text-[#ECF0F1]">Artisanal</div>

        {/* Navigation Links */}
        <ul className="flex space-x-6 my-4 md:my-0">
          <li>
            <a href="#" className="hover:text-[#E67E22] text-[#ECF0F1]">
              Home
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-[#E67E22] text-[#ECF0F1]">
              About
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-[#E67E22] text-[#ECF0F1]">
              Artisan
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-[#E67E22] text-[#ECF0F1]">
              Contact Us
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-[#E67E22] text-[#ECF0F1]">
              Shop
            </a>
          </li>
        </ul>

        {/* Social Media Icons */}
        <div className="flex space-x-4 text-[#ECF0F1]">
          <a href="#" className="hover:text-[#E67E22] text-xl">
            <FaFacebook />
          </a>
          <a href="#" className="hover:text-[#E67E22] text-xl">
            <FaInstagram />
          </a>
          <a href="#" className="hover:text-[#E67E22] text-xl">
            <FaTwitter />
          </a>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center text-[#BDC3C7] text-sm mt-4">
        © 2025 Artisanal. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
