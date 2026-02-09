"use client";

import Image from "next/image";
import Link from "next/link";

const footerLinks = {
  services: [
    { label: "FTTH Plans", href: "/services/ftth" },
    { label: "Enterprise", href: "/services/enterprise" },
    { label: "Cloud Services", href: "/services/cloud" },
    { label: "Utilities", href: "/services/utilities" },
  ],
  company: [
    { label: "About Us", href: "/about" },
    { label: "Career", href: "/career" },
    { label: "Contact", href: "/contact" },
  ],
  support: [
    { label: "FAQ", href: "/faq" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "/contact" },
    { label: "Help Center", href: "/help-center" },
  ],
};

export function Footer() {
  return (
    <footer className="bg-white pt-20 pb-10 border-t border-gray-100">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 mb-20">
          {/* Brand Section */}
          <div className="lg:col-span-4">
            <Link href="/" className="inline-block mb-6">
              <Image
                src="/images/logos/color-logo.png"
                alt="LAYER3"
                width={120}
                height={40}
                className="h-auto"
              />
            </Link>
            <p className="text-gray-500 text-sm max-w-xs leading-relaxed">
              Unified Digital Payment & Subscription Management Platform
            </p>
          </div>

          {/* Links Sections */}
          <div className="lg:col-span-2">
            <h4 className="font-bold text-gray-900 mb-6">Services</h4>
            <ul className="space-y-4">
              {footerLinks.services.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-gray-500 hover:text-red-600 transition-colors text-sm">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h4 className="font-bold text-gray-900 mb-6">Company</h4>
            <ul className="space-y-4">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-gray-500 hover:text-red-600 transition-colors text-sm">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h4 className="font-bold text-gray-900 mb-6">Support</h4>
            <ul className="space-y-4">
              {footerLinks.support.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-gray-500 hover:text-red-600 transition-colors text-sm">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-center items-center text-center">
          <p className="text-gray-500 text-sm">
            © Layer3Pay 2025. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

