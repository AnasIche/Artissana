import React from 'react';
import { ClipboardList, ShoppingBag, Globe2, Package, LineChart, Cog } from 'lucide-react';

function WyAs() {
  return (
    <div className="min-h-screen bg-[#F5F5DC] py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-[#2C3E50] mb-16">WHAT MAKES US SPECIAL</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Free Registration */}
          <div className="bg-white p-8 rounded-lg text-center shadow-sm">
            <div className="flex justify-center mb-6">
              <ClipboardList className="w-16 h-16 text-[#E67E22]" />
            </div>
            <h3 className="text-xl font-semibold text-[#2C3E50] mb-4">FREE REGISTRATION</h3>
            <p className="text-[#2C3E50]/70">
              Register for free, whether you are a supplier or a marketer.
            </p>
          </div>

          {/* Extensive Product Catalog */}
          <div className="bg-white p-8 rounded-lg text-center shadow-sm">
            <div className="flex justify-center mb-6">
              <ShoppingBag className="w-16 h-16 text-[#E67E22]" />
            </div>
            <h3 className="text-xl font-semibold text-[#2C3E50] mb-4">EXTENSIVE PRODUCT CATALOG</h3>
            <p className="text-[#2C3E50]/70">
              Explore our wide range of products for a variety of options.
            </p>
          </div>

          {/* Sell Worldwide */}
          <div className="bg-white p-8 rounded-lg text-center shadow-sm">
            <div className="flex justify-center mb-6">
              <Globe2 className="w-16 h-16 text-[#A3B18A]" />
            </div>
            <h3 className="text-xl font-semibold text-[#2C3E50] mb-4">SELL WORLDWIDE</h3>
            <p className="text-[#2C3E50]/70">
              Sell your products anywhere and expand your reach to more customers.
            </p>
          </div>

          {/* Product Management */}
          <div className="bg-white p-8 rounded-lg text-center shadow-sm">
            <div className="flex justify-center mb-6">
              <Package className="w-16 h-16 text-[#A3B18A]" />
            </div>
            <h3 className="text-xl font-semibold text-[#2C3E50] mb-4">PRODUCT MANAGEMENT</h3>
            <p className="text-[#2C3E50]/70">
              Efficiently manage your product listings and inventory.
            </p>
          </div>

          {/* Performance Dashboard */}
          <div className="bg-white p-8 rounded-lg text-center shadow-sm">
            <div className="flex justify-center mb-6">
              <LineChart className="w-16 h-16 text-[#1F3A93]" />
            </div>
            <h3 className="text-xl font-semibold text-[#2C3E50] mb-4">PERFORMANCE DASHBOARD</h3>
            <p className="text-[#2C3E50]/70">
              Track your sales and performance metrics in real-time.
            </p>
          </div>

          {/* Automated Order Processing */}
          <div className="bg-white p-8 rounded-lg text-center shadow-sm">
            <div className="flex justify-center mb-6">
              <Cog className="w-16 h-16 text-[#1F3A93]" />
            </div>
            <h3 className="text-xl font-semibold text-[#2C3E50] mb-4">AUTOMATED ORDER PROCESSING</h3>
            <p className="text-[#2C3E50]/70">
              Streamline your order fulfillment with automation.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WyAs;
