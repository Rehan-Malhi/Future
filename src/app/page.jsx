// import dynamic from "next/dynamic";
import HeroFutureStar from "@/components/Hero";
import WhyChooseUs from "@/components/why-choose-us";
import FeaturedProducts from "@/components/Featured";
import FactoryMomentsGallery from "@/components/FactoryMomentsGallery";
import FactoryVideoSection from "@/components/FactoryVideoSection";
import FeaturedKits from "@/components/Ft-ball";
import FutureStarStatsSection from "@/components/Stats";
import FaqSection from "@/components/FaqSection";
export default function Home() {
  return (
    <>
      <HeroFutureStar />
      <FeaturedKits/>
      <WhyChooseUs />
      <FactoryVideoSection />
      <FeaturedProducts />
      <FutureStarStatsSection />  
      <FactoryMomentsGallery />
      <FaqSection />
    </>
  );
}
