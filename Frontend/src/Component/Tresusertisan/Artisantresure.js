import React from "react";

const Artisantresure = () => {
  return (
    <section className="bg-gray-100 text-center py-12 px-6">
      <h2 className="text-red-500 text-lg font-semibold mb-4">
        Unveiling Artisan Treasures
      </h2>
      <p className="text-gray-800 text-xl font-bold max-w-2xl mx-auto">
        Our platform <span className="text-red-500">connects you</span> with
        Morocco’s finest artisans, offering unique and exquisite handcrafted
        products.
      </p>
      <div className="flex flex-wrap justify-center items-center gap-6 mt-6">
        <div className="flex items-center gap-2">
          <span className="text-red-500 text-xl">✋</span>
          <p className="text-gray-700">Authentic Craftsmanship</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-red-500 text-xl">🌍</span>
          <p className="text-gray-700">Globally Sourced Materials</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-red-500 text-xl">⭐</span>
          <p className="text-gray-700">Exclusive Designs</p>
        </div>
      </div>
    </section>
  );
};

export default Artisantresure;