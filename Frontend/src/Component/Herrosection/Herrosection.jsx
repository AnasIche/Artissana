import { useRef, useEffect } from "react";
import { ArrowRight } from "lucide-react";
import Navbar from "../NavBare/Navebare";
import backgroundVideo from "../../assets/Hommepage.mp4";
import Tresureartisan from "../Tresusertisan/Artisantresure";
import Exempleartisan from "../Tresusertisan/Exempleartisan";
import WhyChooseUs from "../WhychoseUs/Waychoseus";
import ProductList from "../Findwininproduct/Findwinigproduct";
import Footer from "../Footer/Footer";
import Seling from "../WhychoseUs/StarSelling";

export default function HeroSection() {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 1;
    }
  }, []);

  return (
    <>
      <Navbar />

      <section className="relative isolate px-6 pt-14 lg:px-8 bg-[#F5F5DC] h-screen">
        {/* Vidéo de fond */}
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-[-1]"
        >
          <source src={backgroundVideo} type="video/mp4" />
          Votre navigateur ne supporte pas la balise vidéo.
        </video>

        {/* Calque noir */}
        <div className="absolute inset-0 bg-black opacity-60 z-0" aria-hidden="true" />

        {/* Flou artistique (conservé, mais discret) */}
        <div
          className="absolute inset-x-0 top-0 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
          aria-hidden="true"
        >
          <div className="relative left-[calc(50%-11rem)] aspect-1155/678 w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#E67E22] to-[#2C3E50] opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" />
        </div>

        {/* Contenu principal */}
        <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56 text-center z-10 relative">
          <h1 className="text-5xl font-semibold tracking-tight text-white sm:text-7xl">
            We're changing the <br /> way people connect
          </h1>
          <p className="mt-8 text-lg font-medium text-gray-200 sm:text-xl">
            Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat
            commodo. Elit sunt amet fugiat veniam occaecat.
          </p>

          <div className="mt-10 flex items-center justify-center gap-x-6">
            <a
              href="#"
              className="rounded-md bg-[#2C3E50] px-4 py-2.5 text-sm font-semibold text-white shadow-md hover:bg-[#1F3A93] flex items-center gap-x-2 transition-colors duration-200"
            >
              <span>Get started</span>
              <ArrowRight size={20} className="text-white" />
            </a>
            <a
              href="#"
              className="text-sm font-semibold text-[#E67E22] hover:text-[#D35400] flex items-center gap-x-2 transition-colors duration-200"
            >
              <span>Learn more</span>
              <ArrowRight size={20} className="text-[#E67E22]" />
            </a>
          </div>
        </div>
      </section>

      {/* Sections supplémentaires */}
      <Tresureartisan />
      <Exempleartisan />
      <ProductList />
      <WhyChooseUs />
      <Seling/>
      <Footer />
    </>
  );
}
