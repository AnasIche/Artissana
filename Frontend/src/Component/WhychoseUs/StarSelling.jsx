import React from 'react';
import { Lock, RotateCcw, Phone } from 'lucide-react';

function Seling() {
  return (
    <div className="min-h-screen ">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="flex flex-col md:flex-row">
            {/* Left side - Image */}
            <div className="md:w-1/2">
              <img
                src="https://images.pexels.com/photos/1094767/pexels-photo-1094767.jpeg"
                alt="Artisan craftwork"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Right side - Content */}
            <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center bg-[#ECF0F1]">
              <p className="text-[#2C3E50] mb-4 uppercase text-sm tracking-wide">What are you waiting for</p>
              <h1 className="text-4xl font-bold text-[#2C3E50] mb-8">
                START SELLING AROUND<br />THE WORLD.
              </h1>

              <button className="bg-[#2C3E50] text-white py-3 px-6 rounded-full mb-4 hover:bg-[#1F3A93] transition-colors">
                Sell on Artizal
              </button>

              <button className="bg-white text-[#E67E22] py-3 px-6 rounded-full border-2 border-[#E67E22] hover:bg-[#F5F5DC] transition-colors">
                Sign up for free
              </button>
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="grid grid-cols-1 md:grid-cols-3 border-t border-[#BDC3C7] bg-white">
            <div className="flex items-center justify-center p-8 text-center border-b md:border-b-0 md:border-r border-[#BDC3C7]">
              <div className="flex flex-col items-center">
                <Lock className="w-6 h-6 mb-3 text-[#E67E22]" />
                <span className="uppercase text-sm font-medium text-[#2C3E50]">Paiement sécurisé</span>
              </div>
            </div>

            <div className="flex items-center justify-center p-8 text-center border-b md:border-b-0 md:border-r border-[#BDC3C7]">
              <div className="flex flex-col items-center">
                <RotateCcw className="w-6 h-6 mb-3 text-[#E67E22]" />
                <span className="uppercase text-sm font-medium text-[#2C3E50]">Money back guarantee</span>
              </div>
            </div>

            <div className="flex items-center justify-center p-8 text-center">
              <div className="flex flex-col items-center">
                <Phone className="w-6 h-6 mb-3 text-[#E67E22]" />
                <span className="uppercase text-sm font-medium text-[#2C3E50]">Customer support</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Seling;
