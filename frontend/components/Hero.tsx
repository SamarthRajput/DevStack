"use client";

import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-b from-black to-neutral-900 px-6 md:px-12">
      <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        <div className="space-y-8">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-purple-600 flex items-center justify-center text-white font-bold">
              D
            </div>
            <span className="font-semibold tracking-wide text-purple-400">
              DEVSTACK_
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight text-white">
            Full-stack development{" "}
            <span className="text-purple-500">made simple</span>
          </h1>

          <p className="text-lg text-gray-400 max-w-lg">
            Build powerful applications with our comprehensive development
            stack. From authentication to deployment, we’ve got you covered.
          </p>

          
          <div className="flex flex-wrap gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-medium shadow-lg"
            >
              Get started
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="border border-purple-500 text-purple-400 hover:bg-purple-500 hover:text-white px-6 py-3 rounded-lg font-medium"
            >
              Documentation
            </motion.button>
          </div>
        </div>

        </div>
        
    </section>
  );
}
