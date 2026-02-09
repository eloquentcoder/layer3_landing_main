"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  CreditCardIcon,
  ArrowUp01Icon,
} from "@hugeicons/core-free-icons";

// Simple SVG icons for services
const WifiIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
  </svg>
);

const BuildingIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
  </svg>
);

const CloudIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
  </svg>
);

const LightningIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
  </svg>
);

const WalletIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
  </svg>
);

const servicesMenu = [
  {
    icon: WifiIcon,
    title: "FTTH Plans",
    description: "Fiber-to-the-Home subscriptions",
    href: "/services/ftth",
  },
  {
    icon: BuildingIcon,
    title: "Enterprise Solutions",
    description: "Business fiber solutions",
    href: "/services/enterprise",
  },
  {
    icon: CloudIcon,
    title: "Cloud Services",
    description: "Cloud infrastructure management",
    href: "/services/cloud",
  },
  {
    icon: LightningIcon,
    title: "Utility Payments",
    description: "DSTV, GOTV, Electricity, Airtime",
    href: "/services/utilities",
  },
  {
    icon: WalletIcon,
    title: "Wallet & Payments",
    description: "Smart wallet system",
    href: "/services/wallet",
  },
  {
    icon: CreditCardIcon,
    title: "Payment Processing",
    description: "Secure Paystack integration",
    href: "/services/payments",
  },
];

const navLinks = [
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "Resources", href: "/resources" },
  { label: "Invoicing", href: "/invoice" },
];

export function Navbar() {
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isNavbarHovered, setIsNavbarHovered] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const shouldShowWhiteBackground = isNavbarHovered || isScrolled;

  const handleMouseEnter = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setIsServicesOpen(true);
  };

  const handleMouseLeave = () => {
    closeTimeoutRef.current = setTimeout(() => {
      setIsServicesOpen(false);
    }, 150);
  };

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-300 ${
        shouldShowWhiteBackground
          ? "bg-white border-b border-gray-200"
          : ""
      }`}
      style={!shouldShowWhiteBackground ? { backgroundColor: 'rgba(0, 0, 0, 0)', borderBottom: 'none' } : {}}
      onMouseEnter={() => setIsNavbarHovered(true)}
      onMouseLeave={() => setIsNavbarHovered(false)}
    >
      <div className={`container mx-auto px-6 ${shouldShowWhiteBackground ? '' : 'bg-transparent'}`}>
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src={shouldShowWhiteBackground ? "/images/logos/color-logo.png" : "/images/logos/white-logo.png"}
              alt="LAYER3PAY"
              width={120}
              height={40}
              className="h-auto w-auto"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {/* Services Mega Menu */}
            <div
              className="relative"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <Link
                href="/services"
                className={`transition-colors font-medium flex items-center gap-1 ${
                  shouldShowWhiteBackground
                    ? `text-gray-700 hover:text-gray-900 ${
                        isServicesOpen ? "text-gray-900" : ""
                      }`
                    : "text-white hover:text-white/80"
                }`}
              >
                Services
                <HugeiconsIcon
                  icon={ArrowUp01Icon}
                  className={`w-4 h-4 transition-transform ${
                    isServicesOpen ? "" : "rotate-180"
                  }`}
                />
              </Link>

              {/* Mega Menu Dropdown */}
              {isServicesOpen && (
                <div className="absolute left-0 top-full mt-2 w-[600px] bg-white rounded-lg shadow-xl border border-gray-200 p-6">
                  <div className="grid grid-cols-2 gap-6">
                    {servicesMenu.map((service, index) => (
                      <Link
                        key={index}
                        href={service.href}
                        className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors group"
                      >
                        <div className="flex-shrink-0">
                          {typeof service.icon === 'function' ? (
                            <div className="text-red-600 group-hover:text-red-700">
                              <service.icon />
                            </div>
                          ) : (
                            <HugeiconsIcon
                              icon={service.icon}
                              className="w-5 h-5 text-red-600 group-hover:text-red-700"
                            />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-gray-900 mb-1">
                            {service.title}
                          </h3>
                          <p className="text-sm text-gray-600">
                            {service.description}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <Link
                      href="/services"
                      className="text-red-600 hover:text-red-700 font-medium text-sm inline-flex items-center gap-1"
                    >
                      View all services{" "}
                      <span className="text-lg">&gt;</span>
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Other Navigation Links */}
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`transition-colors font-medium ${
                  shouldShowWhiteBackground
                    ? "text-gray-700 hover:text-gray-900"
                    : "text-white hover:text-white/80"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* User Actions */}
          <div className="flex items-center space-x-4">
            <Link
              href="/sign-in"
              className={`transition-colors font-medium hidden sm:inline-block ${
                shouldShowWhiteBackground
                  ? "text-gray-700 hover:text-gray-900"
                  : "text-white hover:text-white/80"
              }`}
            >
              Sign In
            </Link>
            <Button
              className={`font-medium px-6 transition-colors ${
                shouldShowWhiteBackground
                  ? "bg-red-600 hover:bg-red-700 text-white"
                  : "bg-red-600/90 hover:bg-red-700 text-white backdrop-blur-sm"
              }`}
            >
              Get Started
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}

