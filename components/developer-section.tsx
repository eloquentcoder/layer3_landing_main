"use client";

import { useEffect, useRef, useState } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  CreditCardIcon,
  Tick02Icon,
  ArrowRight01Icon,
  RefreshIcon,
  ActivityIcon,
  Task01Icon,
} from "@hugeicons/core-free-icons";

export function PaymentsSection() {
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

  const features = [
    {
      title: "Accept payments instantly",
      icon: CreditCardIcon,
      color: "bg-blue-500",
    },
    {
      title: "Automate recurring charges",
      icon: RefreshIcon,
      color: "bg-purple-500",
    },
    {
      title: "Track transactions in real time",
      icon: ActivityIcon,
      color: "bg-emerald-500",
    },
    {
      title: "Reconcile payouts effortlessly",
      icon: Task01Icon,
      color: "bg-orange-500",
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen w-full overflow-hidden bg-[#050b1a] py-24 md:py-32"
    >
      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-[800px] h-[800px] bg-red-500/5 rounded-full blur-3xl opacity-60" />
        <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-3xl opacity-40" />
      </div>

      <div className="container relative mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 mb-6">
            <span className="text-red-400 text-xs font-bold tracking-wider uppercase">Seamless Payments</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-8 leading-[1.1]">
            Accept, Send, and Automate Payments—Without Friction
          </h2>
          <p className="text-xl text-blue-100/70 leading-relaxed max-w-2xl mx-auto">
            Enable fast, reliable, and secure payments across cards, bank transfers, wallets, and recurring billing. Our platform removes complexity from payments so businesses can focus on growth, not infrastructure.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-12">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                One Platform. Every Payment Flow.
              </h3>
              <p className="text-lg text-blue-100/70">
                Process payments end-to-end—from customer checkout to settlement—using a single, unified system designed for scale, speed, and reliability.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {features.map((feature, idx) => (
                <div 
                  key={idx} 
                  className="group flex items-start gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300"
                >
                  <div className={`shrink-0 w-10 h-10 rounded-xl ${feature.color} flex items-center justify-center text-white`}>
                    <HugeiconsIcon icon={feature.icon} className="w-5 h-5" />
                  </div>
                  <span className="font-semibold text-white pt-1.5">{feature.title}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            {/* Payment UI Mockup */}
            <div className="relative z-10 bg-[#0a1229] rounded-3xl shadow-2xl shadow-black/50 border border-white/10 p-8">
              <div className="flex justify-between items-center mb-8">
                <div>
                  <div className="text-sm text-blue-100/50 mb-1">Total Balance</div>
                  <div className="text-3xl font-bold text-white">₦4,280,000.00</div>
                </div>
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                  <HugeiconsIcon icon={CreditCardIcon} className="text-[#050b1a] w-6 h-6" />
                </div>
              </div>

              <div className="space-y-4">
                {[
                  { name: "Main Fiber Subscription", date: "Today, 10:45 AM", amount: "-₦25,000.00", type: "out" },
                  { name: "Wallet Funding", date: "Today, 09:12 AM", amount: "+₦50,000.00", type: "in" },
                  { name: "Electricity Bill", date: "Yesterday, 14:20 PM", amount: "-₦12,500.00", type: "out" },
                ].map((tx, i) => (
                  <div key={i} className="flex items-center justify-between py-3 border-b border-white/5 last:border-0">
                    <div className="flex items-center gap-4">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${tx.type === 'in' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'}`}>
                        <HugeiconsIcon icon={tx.type === 'in' ? Tick02Icon : ArrowRight01Icon} className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-white">{tx.name}</div>
                        <div className="text-xs text-blue-100/50">{tx.date}</div>
                      </div>
                    </div>
                    <div className={`text-sm font-bold ${tx.type === 'in' ? 'text-emerald-400' : 'text-white'}`}>
                      {tx.amount}
                    </div>
                  </div>
                ))}
              </div>

              <button className="w-full mt-8 py-4 bg-red-600 text-white font-bold rounded-2xl hover:bg-red-700 transition-colors shadow-lg shadow-red-600/20">
                Quick Payout
              </button>
            </div>

            {/* Decorative background cards */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[90%] bg-red-500/5 rounded-[3rem] -rotate-3 -z-10" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[105%] h-[95%] bg-blue-500/5 rounded-[3rem] rotate-2 -z-10" />
          </div>
        </div>
      </div>
    </section>
  );
}

