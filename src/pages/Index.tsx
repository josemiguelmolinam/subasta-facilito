import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { PopularCategories } from "@/components/PopularCategories";
import { LatestAuctions } from "@/components/LatestAuctions";
import { HowItWorks } from "@/components/HowItWorks";
import { Testimonials } from "@/components/Testimonials";
import { Statistics } from "@/components/Statistics";
import { FeaturedSection } from "@/components/FeaturedSection";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-white pb-16 md:pb-0">
      <Navbar />
      <main>
        <Hero />
        <LatestAuctions />
        <HowItWorks />
        <PopularCategories />
        <Statistics />
        <Testimonials />
        <FeaturedSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;