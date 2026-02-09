"use client";

import { useEffect, useRef, useState } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { CreditCardIcon } from "@hugeicons/core-free-icons";

// SVG Icons
const WifiIcon = () => (
  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
  </svg>
);

const WalletIcon = () => (
  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
  </svg>
);

const features = [
  {
    icon: WifiIcon,
    title: "Fiber Subscription Management",
    description: "Manage all your FTTH, Enterprise, and Cloud subscriptions in one place. Renew, upgrade, and track your plans effortlessly.",
  },
  {
    icon: CreditCardIcon,
    title: "Unified Payment Platform",
    description: "Pay for subscriptions, utilities, and services seamlessly with Paystack integration. Support for cards, transfers, and saved payment methods.",
  },
  {
    icon: WalletIcon,
    title: "Smart Wallet System",
    description: "Fund your wallet instantly and enjoy automatic deductions for subscriptions and utilities. Real-time balance updates and transaction history.",
  },
];

export function FeaturesSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="flex min-h-screen w-full items-center bg-white py-20 md:py-32"
    >
      <div className="container mx-auto px-6 md:px-8">
        <div className="flex flex-col">
          {/* Header Section */}
          <div className="mb-16 grid grid-cols-1 gap-8 md:mb-24 md:grid-cols-2 md:gap-12">
            {/* Left Side - Label and Title */}
            <div
              className={`space-y-6 transition-all duration-700 ease-out ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-8 opacity-0"
              }`}
            >
              <div className="inline-block">
                <span className="text-sm font-semibold uppercase tracking-wider text-red-600">
                  FUTURE PAYMENT
                </span>
              </div>
              <h2 className="text-4xl font-bold leading-tight text-gray-900 md:text-5xl lg:text-6xl">
                Everything You Need in One Platform
              </h2>
            </div>

            {/* Right Side - Description */}
            <div
              className={`flex items-center transition-all duration-700 ease-out delay-150 ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-8 opacity-0"
              }`}
            >
              <p className="text-lg leading-relaxed text-gray-600 md:text-xl">
                Comprehensive tools to manage Fiber subscriptions, utility
                payments, wallet transactions, and customer relationships
                efficiently.
              </p>
            </div>
          </div>

          {/* Feature Blocks */}
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-12">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`group transition-all duration-700 ease-out ${
                  isVisible
                    ? "translate-y-0 opacity-100"
                    : "translate-y-8 opacity-0"
                }`}
                style={{
                  transitionDelay: `${300 + index * 150}ms`,
                }}
              >
                {/* Icon Container */}
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-lg bg-red-50 text-red-600 transition-all duration-300 group-hover:scale-110 group-hover:bg-red-100">
                  {typeof feature.icon === "function" ? (
                    <feature.icon />
                  ) : (
                    <HugeiconsIcon icon={feature.icon} className="w-6 h-6" />
                  )}
                </div>

                {/* Title */}
                <h3 className="mb-4 text-xl font-bold text-gray-900 md:text-2xl">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="text-base leading-relaxed text-gray-600 md:text-lg">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>

          {/* Footer Label */}
          <div
            className={`mt-20 transition-all duration-700 ease-out delay-700 ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            }`}
          >
            <a
              href="#why-us"
              className="inline-block text-sm font-semibold uppercase tracking-wider text-red-600 transition-colors hover:text-red-700"
            >
              WHY US
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

