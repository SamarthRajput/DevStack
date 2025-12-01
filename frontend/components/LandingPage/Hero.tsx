"use client"
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Download } from "lucide-react";
import { useEffect, useState } from "react";

const Hero = () => {
  const [downloads, setDownloads] = useState<string | null>(null);

  useEffect(() => {
    fetch('https://api.npmjs.org/downloads/point/last-year/devstackbackend')
      .then(res => res.json())
      .then(data => {
        if (data.downloads) {
          setDownloads(data.downloads.toLocaleString());
        }
      })
      .catch(err => console.error('Failed to fetch downloads', err));
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-accent/10" />
      
      {/* Animated grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f15_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f15_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      
      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center animate-fade-in">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2 backdrop-blur-sm">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium">11+ Production-Ready Services</span>
          </div>
          
          <h1 className="mb-6 text-5xl font-bold leading-tight tracking-tight sm:text-6xl lg:text-7xl">
            Build faster with
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-black"> DevstackBackend</span>
          </h1>
          
          <p className="mb-10 text-lg text-muted-foreground sm:text-xl max-w-2xl mx-auto">
            A comprehensive, modular Express/Mongoose backend package with built-in authentication, file uploads, rate limiting, caching, email services, push notifications, payments, and logging.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button variant="default" size="lg" className="w-full sm:w-auto">
              Get Started Free
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button variant="outline" size="lg" className="w-full sm:w-auto" asChild>
              <a href="https://www.npmjs.com/package/devstackbackend" target="_blank" rel="noopener noreferrer">
                View on NPM
              </a>
            </Button>
          </div>
          
          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <code className="bg-muted px-3 py-1 rounded">npm install devstackbackend</code>
            </div>
            {downloads && (
              <div className="flex items-center gap-2">
                <Download className="h-4 w-4 text-primary" />
                <span>{downloads} downloads last month</span>
              </div>
            )}
          </div>
          
          <div className="mt-6 text-sm text-muted-foreground">
            Open source • MIT License
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
