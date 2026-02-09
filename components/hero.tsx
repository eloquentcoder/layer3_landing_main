"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function Hero() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-black">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 h-full w-full object-cover object-[65%_center] md:object-center opacity-30"
      >
        <source src="/videos/hero-video.mp4" type="video/mp4" />
      </video>

      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-linear-to-b from-black/50 via-black/30 to-black/50" />

      {/* Content */}
      <div className="relative z-10 flex min-h-screen flex-col">

        {/* Main Content */}
        <main className="flex flex-1 flex-col items-center justify-center px-6 py-12 text-center md:px-8 md:py-20">
          {/* Release Badge */}
        

          {/* Main Title */}
          <h1 className="mb-4 text-3xl font-bold uppercase tracking-tight text-white md:mb-6 md:text-7xl lg:text-8xl">
            <span className="text-white">STAYING CONNECTED</span>
            <br />
            <span className="text-gray-400">WITH LAYER3</span>
          </h1>

          {/* Tagline */}
          <p className="mb-8 max-w-2xl text-base leading-relaxed text-white/90 md:mb-12 md:text-lg lg:text-xl">
          Streamline revenue collection, automate subscription processes, and deliver a modern billing experience across mobile and web channels for Layer3 customers.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col gap-4 sm:flex-row">
            <Button
              size="lg"
              className="bg-primary px-6 py-5 text-sm font-medium uppercase tracking-wider text-white hover:bg-primary/90 md:px-8 md:py-6 md:text-base"
            >
            GET STARTED
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-white/20 bg-transparent px-6 py-5 text-sm font-medium uppercase tracking-wider text-white hover:bg-white/10 hover:text-white md:px-8 md:py-6 md:text-base"
            >
              LEARN MORE
            </Button>
          </div>
        </main>
      </div>
    </div>
  );
}

