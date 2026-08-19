import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import BestFor from "@/components/BestFor";
import Capabilities from "@/components/Capabilities";
import Portfolio from "@/components/Portfolio";
import Roadmap from "@/components/Roadmap";
import BlogSlider from "@/components/BlogSlider";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Hero />
        <Marquee />
        <BestFor />
        <Capabilities />
        <Portfolio />
        <Roadmap />
        <BlogSlider />
        <FAQ />
      </main>
      <Footer />
    </>
  );
}
