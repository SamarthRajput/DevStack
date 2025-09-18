import Navbar from "@/components/Navbar";
import Image from "next/image";
import Hero from "../components/Hero";

export default function Home() {
  return (
    <div className="font-sans">
      <Navbar />
      <Hero />
    </div>
  );
}

