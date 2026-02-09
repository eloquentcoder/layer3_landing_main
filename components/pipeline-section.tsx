"use client";

import { HugeiconsIcon } from "@hugeicons/react";
import {
  UserAccountIcon,
  DashboardSquare01Icon,
  Wallet02Icon,
  AlgorithmIcon,
  ShieldIcon,
  Globe02Icon,
  CpuIcon,
} from "@hugeicons/core-free-icons";

export function PipelineSection() {
  return (
    <section className="bg-black text-white min-h-screen flex flex-col font-sans border-t border-white/10">
      {/* Main Grid */}
      <div className="flex-1 grid grid-cols-1 md:grid-cols-12 border-b border-white/10">
        {/* Top Left: Title Section */}
        <div className="md:col-span-4 p-8 md:p-12 border-r border-white/10 flex flex-col justify-center">
          <div className="flex items-center gap-2 mb-6">
            <div className="bg-red-400/10 border border-red-400/20 px-2 py-1 rounded text-[10px] font-bold text-red-400 tracking-widest uppercase">
              How it works
            </div>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-[1.1] tracking-tight">
            Getting Started with Layer3Pay is Simple
          </h2>
          <p className="text-gray-400 text-lg leading-relaxed max-w-md">
            Streamline your revenue collection, automate subscription processes, and manage your Layer3 accounts in one unified dashboard.
          </p>
      </div>

        {/* Top Middle: Step 1 */}
        <div className="md:col-span-4 p-8 md:p-12 border-r border-white/10 flex flex-col justify-center">
          {/* Terminal Box */}
          <div className="mb-8 flex justify-center">
            <div className="relative">
              <div className="w-20 h-20 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center relative z-10">
                <HugeiconsIcon icon={UserAccountIcon} className="w-9 h-9 text-white/80" />
              </div>
              {/* Decorative elements */}
              <div className="absolute -top-2 -right-2 w-4 h-4 rounded-full bg-blue-400 blur-sm opacity-40" />
              <div className="absolute top-1/2 -left-12 w-24 h-px bg-linear-to-r from-transparent via-white/20 to-transparent" />
              <div className="absolute top-1/2 -right-12 w-24 h-px bg-linear-to-r from-transparent via-white/20 to-transparent" />
                </div>
              </div>

          <h3 className="text-xl font-bold mb-3">1. Pay for your Internet Services</h3>
          <p className="text-gray-400 leading-relaxed">
            Pay for your Internet and Broadband services with ease. No hassle, no waiting.
          </p>
              </div>

        {/* Top Right: Step 2 */}
        <div className="md:col-span-4 p-8 md:p-12 flex flex-col justify-center relative">
          <div className="mb-8 flex justify-center">
            <div className="relative">
              <div className="w-24 h-24 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center relative z-10">
                <HugeiconsIcon icon={DashboardSquare01Icon} className="w-10 h-10 text-white/80" />
              </div>
              {/* Decorative elements */}
              <div className="absolute -top-2 -right-2 w-4 h-4 rounded-full bg-lime-400 blur-sm opacity-50" />
              <div className="absolute top-1/2 -left-12 w-24 h-px bg-linear-to-r from-transparent via-white/20 to-transparent" />
              <div className="absolute top-1/2 -right-12 w-24 h-px bg-linear-to-r from-transparent via-white/20 to-transparent" />
            </div>
          </div>

          <h3 className="text-xl font-bold mb-3">2. Manage Subscriptions</h3>
          <p className="text-gray-400 leading-relaxed">
            View your active Fiber plans, renew subscriptions, upgrade services, and manage all your Layer3 accounts in one dashboard.
          </p>
        </div>
            </div>

      {/* Bottom Grid: 4 items */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4">
        {/* Item 1 */}
        <div className="p-8 md:p-12 border-r border-white/10 flex flex-col gap-4 group">
          <HugeiconsIcon icon={Wallet02Icon} className="w-6 h-6 text-white/60 group-hover:text-white transition-colors" />
          <div>
            <h4 className="font-bold mb-2 uppercase text-xs tracking-wider">Easy Billing</h4>
            <p className="text-gray-400 text-sm leading-relaxed">
              Auto-renew subscriptions and manage payments without service interruptions.
            </p>
          </div>
                  </div>

        {/* Item 2 */}
        <div className="p-8 md:p-12 border-r border-white/10 flex flex-col gap-4 group">
          <HugeiconsIcon icon={ShieldIcon} className="w-6 h-6 text-white/60 group-hover:text-white transition-colors" />
          <div>
            <h4 className="font-bold mb-2 uppercase text-xs tracking-wider">Rock-Solid Network</h4>
            <p className="text-gray-400 text-sm leading-relaxed">
              High-availability infrastructure built for speed, stability, and security.
                  </p>
                </div>
            </div>

        {/* Item 3 */}
        <div className="p-8 md:p-12 border-r border-white/10 flex flex-col gap-4 group">
          <HugeiconsIcon icon={Globe02Icon} className="w-6 h-6 text-white/60 group-hover:text-white transition-colors" />
          <div>
            <h4 className="font-bold mb-2 uppercase text-xs tracking-wider">Broad Coverage</h4>
            <p className="text-gray-400 text-sm leading-relaxed">
              Reliable internet across multiple locations and regions.
            </p>
                </div>
              </div>

        {/* Item 4 */}
        <div className="p-8 md:p-12 flex flex-col gap-4 group">
          <HugeiconsIcon icon={CpuIcon} className="w-6 h-6 text-white/60 group-hover:text-white transition-colors" />
          <div>
            <h4 className="font-bold mb-2 uppercase text-xs tracking-wider">Total Control</h4>
            <p className="text-gray-400 text-sm leading-relaxed">
              Manage plans, usage, and billing from one powerful platform.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

