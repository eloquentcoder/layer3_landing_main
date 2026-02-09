"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight01Icon, ArrowUpRight01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

export function CTASection() {
  return (
    <section className="relative w-full bg-[#0a0a0a] py-24 md:py-32 overflow-hidden">
      {/* Decorative patterns */}
      <div className="absolute inset-y-0 left-0 w-1/3 pointer-events-none hidden lg:block overflow-hidden">
        <div className="grid grid-cols-6 gap-2 content-center h-full opacity-40 transform -rotate-12 -translate-x-1/4">
          {Array.from({ length: 120 }).map((_, i) => (
            <div 
              key={i} 
              className="w-10 h-14 rounded-lg bg-linear-to-br from-red-600 to-red-900 shadow-lg shadow-red-600/30"
              style={{
                opacity: Math.max(0.1, 1 - (i % 6) / 4),
              }}
            />
          ))}
        </div>
      </div>
      
      <div className="absolute inset-y-0 right-0 w-1/3 pointer-events-none hidden lg:block overflow-hidden">
        <div className="grid grid-cols-6 gap-2 content-center h-full opacity-40 transform rotate-12 translate-x-1/4">
          {Array.from({ length: 120 }).map((_, i) => (
            <div 
              key={i} 
              className="w-10 h-14 rounded-lg bg-linear-to-bl from-red-600 to-red-900 shadow-lg shadow-red-600/30"
              style={{
                opacity: Math.max(0.1, 1 - (5 - (i % 6)) / 4),
              }}
            />
          ))}
        </div>
      </div>

      <div className="container relative z-10 mx-auto px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <span className="text-red-500 font-bold tracking-widest uppercase text-xs mb-6 block">
            TRY IT NOW
          </span>
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-8 leading-[1.1]">
            Ready to level up your payment process?
          </h2>
          <p className="text-lg md:text-xl text-gray-400 mb-12 leading-relaxed">
            Streamline revenue collection, automate subscription processes, and deliver a modern billing experience across mobile and web channels.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button 
              size="lg" 
              className="w-full sm:w-auto bg-white text-black hover:bg-gray-200 px-8 py-6 rounded-2xl font-bold transition-all flex items-center gap-2"
            >
              Get Started Now
              <HugeiconsIcon icon={ArrowRight01Icon} className="w-5 h-5" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="w-full sm:w-auto border-white/20 text-white hover:bg-white/5 px-8 py-6 rounded-2xl font-bold transition-all flex items-center gap-2"
            >
              Learn More
              <HugeiconsIcon icon={ArrowUpRight01Icon} className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

