import React, { useState } from 'react';
import { TrendingUp, Star, Menu, Search } from 'lucide-react';
import { Link } from 'react-router-dom';  // Importation de Link
import Footer from "../Footer/Footer";

function About() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const testimonials = Array(12).fill(null).map((_, i) => (
    <img
      key={i}
      src={`https://i.pravatar.cc/50?img=${i + 1}`}
      alt="Customer"
      className="w-8 h-8 rounded-full border-2 border-white -ml-2 first:ml-0"
    />
  ));
  
  return (
    <>
      {/* Header */}
      <nav className="bg-[#2C3E50] shadow-sm text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden p-2 rounded-md hover:bg-[#1F3A93]">
                <Menu className="h-6 w-6" />
              </button>
              <h1 className="text-xl font-semibold ml-2">Artisanal</h1>
            </div>

            <div className="hidden md:flex items-center space-x-6">
            {["Home", "Shop", "About", "contact"].map(link => (
          <Link key={link} to={link === "Home" ? "/" : `/${link.toLowerCase()}`} className="hover:text-[#E67E22]">{link}</Link>
            ))}

            </div>

            <div className="flex items-center">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search products..."
                  className="w-64 px-4 py-2 rounded-full border border-[#BDC3C7] text-black focus:ring-[#2C3E50]"
                />
                <Search className="absolute right-3 top-2.5 h-5 w-5 text-[#BDC3C7]" />
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="min-h-screen bg-[#ECF0F1] flex items-center justify-center p-8">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column */}
          <div className="space-y-8">
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="text-4xl font-bold flex items-center gap-2 text-[#2C3E50]">
                30,000+ <TrendingUp className="text-[#A3B18A]" size={32} />
              </div>
              <p className="text-gray-600 mt-2">
                Sales in July 2021 with 5 star ratings and happy clients.
              </p>
              <div className="flex flex-wrap mt-6">
                {testimonials}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            <div>
              <div className="text-[#E67E22] font-medium mb-2">A BIT</div>
              <h1 className="text-5xl font-bold mb-6 text-[#2C3E50]">ABOUT US</h1>
              <p className="text-gray-600 leading-relaxed">
                From they fine john he give of rich he. They age and draw mrs like. 
                Improving end distrusts may instantly was household applauded incommode. 
                Why kept very ever home mrs. Considered sympathize ten uncommonly 
                occasional assistance sufficient not.
              </p>
              <button className="mt-8 bg-[#E67E22] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#D35400] transition-colors">
                EXPLORE MORE
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default About;
