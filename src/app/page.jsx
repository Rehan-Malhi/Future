// import dynamic from "next/dynamic";
import HeroFutureStar from "@/components/Hero";
import WhyChooseUs from "@/components/why-choose-us";
import FeaturedProducts from "@/components/Featured";
import FactoryMomentsGallery from "@/components/FactoryMomentsGallery";
import FutureStarStatsSection from "@/components/Stats";
import FaqSection from "@/components/FaqSection";
export default function Home() {
  return (
    <>
      <HeroFutureStar />
      <WhyChooseUs />
      <FeaturedProducts />
      <FutureStarStatsSection />  
      <FactoryMomentsGallery />
      <FaqSection />
    </>
  );
}
