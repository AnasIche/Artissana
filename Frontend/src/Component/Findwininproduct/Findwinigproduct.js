import React from "react";
import ProductCard from "./Productcard";

const products = [
  {
    id: 1,
    image: "/images/d1.jpg",
    title: "Walnut Wooden Salad Bowl",
    country: "Morocco",
  },
  {
    id: 2,
    image: "/images/Tajine2.png",
    title: "Modern 4-Tier Wall Shelf",
    country: "Morocco",
  },
  {
    id: 3,
    image: "/images/zerbia3.png",
    title: "Modern 4-Tier Wall Shelf",
    country: "Morocco",
  },
  {
    id: 4,
    image: "/images/cuisine2.png",
    title: "Modern 4-Tier Wall Shelf",
    country: "Morocco",
  },
  {
    id: 5,
    image: "/images/bag.png",
    title: "Modern 4-Tier Wall Shelf",
    country: "Morocco",
  },
  {
    id: 6,
    image: "/images/bel555.png",
    title: "Modern 4-Tier Wall Shelf",
    country: "Morocco",
  },
];

const ProductList = () => {
  return (
    <div className="p-8  min-h-screen">
      <h1 className="text-2xl font-bold text-center mb-6 text-[#2C3E50]">
        FIND YOUR NEXT WINNING PRODUCT
      </h1>
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 place-items-center">
        {products.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>

      <div className="flex justify-center mt-8">
        <button className="bg-[#2C3E50] text-white py-2 px-6 rounded-lg shadow-md transition-transform duration-300 hover:bg-[#E67E22] hover:scale-105">
          See more
        </button>
      </div>
    </div>
  );
};

export default ProductList;
