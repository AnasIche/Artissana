import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Exempleartisan = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;

    gsap.fromTo(
      section,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      }
    );
  }, []);

  const items = [
    {
      image: "/images/chaise.jpg",
      title: "L'Art du Tissage Marocain",
    },
    {
      image: "/images/jeld.jpg",
      title: "Sacoche Traditionnelle",
    },
    {
      image: "/images/m5eda.jpg",
      title: "Motifs et Couleurs du Maroc",
    },
    {
      image: "/images/cuisine.jpg",
      title: "Éclat Artisanal",
    },
    {
      image: "/images/Flam.jpg",
      title: "Morroccan Craftsmanship",
    },
    {
      image: "/images/zerbia.jpg",
      title: "Moroccan Textiles",
    },
   
  ];

  return (
    <section
      ref={sectionRef}
      className="bg-[#F5F5DC] text-center py-12 px-4"
    >
      <h2 className="text-[#2C3E50] text-xl font-bold">
        Insight from Moroc Artisan
      </h2>
      <p className="text-[#8F9779] italic text-sm mt-2">
        Stay updated with the latest trends, stories, and innovation in Moroccan craftsmanship.
      </p>

      <div className="flex flex-wrap justify-center gap-6 mt-10">
        {items.map((item, index) => (
          <div
            key={index}
            className="max-w-xs text-center bg-white p-4 rounded-xl shadow-md border border-[#ECF0F1]"
          >
            <div className="w-40 h-40 mx-auto rounded-full overflow-hidden border-4 border-[#2C3E50]">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover"
              />
            </div>
            <p className="text-[#2C3E50] mt-4 font-medium">{item.title}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Exempleartisan;
