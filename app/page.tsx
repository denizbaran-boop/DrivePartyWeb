import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import TrustBar from "@/components/sections/TrustBar";
import Features from "@/components/sections/Features";
import HowItWorks from "@/components/sections/HowItWorks";
import CalculatorSpotlight from "@/components/sections/CalculatorSpotlight";
import Safety from "@/components/sections/Safety";
import UseCases from "@/components/sections/UseCases";
import AppPreview from "@/components/sections/AppPreview";
import FAQ from "@/components/sections/FAQ";
import FinalCTA from "@/components/sections/FinalCTA";
import OtherProjects from "@/components/sections/OtherProjects";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <TrustBar />
        <Features />
        <HowItWorks />
        <CalculatorSpotlight />
        <Safety />
        <UseCases />
        <AppPreview />
        <FAQ />
        <OtherProjects />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
