import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/home/HeroSection";
import FeaturedCafes from "@/components/home/FeaturedCafes";
import MoodSection from "@/components/home/MoodSection";
import CTASection from "@/components/home/CTASection";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <FeaturedCafes />
        <MoodSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
