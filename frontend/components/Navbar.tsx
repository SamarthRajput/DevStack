"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FaStar,
  FaChevronDown,
} from "react-icons/fa6";


const PRODUCTS = [
  { label: "Auth", description: "Secure login with multi-factor auth.", href: "#" },
  { label: "Databases", description: "Scalable and robust databases.", href: "#" },
  { label: "Storage", description: "Advanced compression and encryption.", href: "#" },
  { label: "Functions", description: "Deploy & scale serverless functions.", href: "#" },
  { label: "Messaging", description: "Set up a full-functioning messaging service.", href: "#" },
  { label: "Realtime", description: "Subscribe and react to any event.", href: "#" },
  { label: "Sites", description: "The open-source Vercel alternative.", href: "#" },
];

export default function Navbar() {
  const [stars, setStars] = useState(10);
  const [productsOpen, setProductsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle navbar background on scroll
  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 10);
    }
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ ease: "easeOut", duration: 0.5 }}
      className={`fixed top-0 w-full z-50 transition-colors duration-300 ${
        scrolled
          ? "bg-purple-950/80 backdrop-blur border-b border-purple-900"
          : "bg-transparent"
      }`}
    >
      <div className="flex items-center justify-between h-16 px-8">
        {/* Left Side */}
        <div className="flex items-center gap-8">
          <Link href="/" className="text-xl font-bold text-white">
            DevStack
          </Link>
          <div
            onMouseEnter={() => setProductsOpen(true)}
            onMouseLeave={() => setProductsOpen(false)}
            className="relative flex items-center"
          >
            <button
              onClick={() => setProductsOpen((o) => !o)}
              className="inline-flex items-center gap-1 text-base font-medium text-gray-300 hover:text-white focus:outline-none px-2"
              type="button"
              aria-expanded={productsOpen}
              aria-haspopup="true"
            >
              Products <FaChevronDown className="inline-block text-xs mt-0.5" />
            </button>
            {productsOpen && (
              <div className="absolute left-0 top-full mt-2 min-w-[400px] shadow-xl rounded-lg bg-[#18122b] border border-purple-900 z-50 py-4 px-6">
                <div className="flex flex-col gap-2">
                  {PRODUCTS.map(({ label, description, href }) => (
                    <Link
                      key={label}
                      href={href}
                      className="px-2 py-2 rounded-md hover:bg-purple-900/60 transition group flex flex-col"
                    >
                      <span className="font-medium text-gray-100 group-hover:text-white">
                        {label}
                      </span>
                      <span className="text-sm text-gray-400">
                        {description}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
          <Link href="/docs" className="text-base text-gray-300 hover:text-white transition px-2">
            Docs
          </Link>
          <Link href="/pricing" className="text-base text-gray-300 hover:text-white transition px-2">
            Pricing
          </Link>
          <Link href="/enterprise" className="text-base text-gray-300 hover:text-white transition px-2">
            Enterprise
          </Link>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-3">
          {/* GitHub Star button */}
          <a
            href="https://github.com/SamarthRajput/DevStack"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 rounded px-2 py-1 border bg-[#23272f] border-gray-800 text-gray-200 hover:bg-[#282d39] transition text-sm font-medium"
            style={{ fontVariantNumeric: "tabular-nums" }}
          >
            <FaStar className="text-yellow-400 text-base mr-1" />
            Star on GitHub
            <span className="ml-2 bg-gray-700 rounded px-2 py-0.5 text-xs border border-gray-600">
              {stars.toLocaleString()}
            </span>
          </a>

          {/* Call-to-action button */}
          <Link
            href="/signin"
            className="ml-2 rounded-md bg-purple-500  hover:bg-purple-500 transition px-5 py-2 text-sm font-semibold text-white"
          >
            Sign In
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
