import Features from "@/components/LandingPage/Features";
import Footer from "@/components/LandingPage/Footer";
import Hero from "@/components/LandingPage/Hero";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Hero />
      <Features />
      <Footer />
    </div>
  );
}
