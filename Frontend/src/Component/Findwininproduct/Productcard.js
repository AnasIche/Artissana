import React from "react";

const ProductCard = ({ image, title, country }) => {
  return (
    <div className="bg-[#F5F5DC] shadow-md rounded-lg overflow-hidden p-4 border border-[#ECF0F1]">
      <img className="w-full h-40 object-cover rounded" src={image} alt={title} />
      <h2 className="text-lg font-semibold mt-2 text-[#2C3E50]">{title}</h2>
      <p className="text-[#BDC3C7]">{country}</p>
      <button className="mt-3 w-full bg-[#2C3E50] text-white py-2 rounded hover:bg-[#E67E22] transition-colors duration-200">
        Register to see offers
      </button>
    </div>
  );
};

export default ProductCard;
