"use client";

import { useState, useEffect } from "react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { InvoicePlanSelector } from "@/components/invoice/invoice-plan-selector";
import { InvoicePaymentSection } from "@/components/invoice/invoice-payment-section";
import { ReceiptValidationSection } from "@/components/invoice/receipt-validation-section";
import { HugeiconsIcon } from "@hugeicons/react";
import { 
  File01Icon, 
  CreditCardIcon, 
  Task01Icon 
} from "@hugeicons/core-free-icons";

export default function InvoicePage() {
  const [activeTab, setActiveTab] = useState<"generate" | "pay" | "validate">("generate");

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-linear-to-br from-gray-50 via-white to-gray-50">
        {/* Hero Section */}
        <div className="bg-linear-to-r from-red-600 to-red-700 text-white py-16 md:py-24">
          <div className="container mx-auto px-6 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Invoice Management
            </h1>
            <p className="text-xl md:text-2xl text-red-100 max-w-2xl mx-auto">
              Generate, pay, and validate invoices seamlessly
            </p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="container mx-auto px-6 -mt-8 md:-mt-12">
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-3 border-b border-gray-200">
              <button
                onClick={() => setActiveTab("generate")}
                className={`flex items-center justify-center gap-3 px-6 py-4 md:py-6 transition-all ${
                  activeTab === "generate"
                    ? "bg-red-50 text-red-600 border-b-2 border-red-600"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                <HugeiconsIcon icon={File01Icon} className="w-5 h-5" />
                <span className="font-semibold">Generate Invoice</span>
              </button>
              <button
                onClick={() => setActiveTab("pay")}
                className={`flex items-center justify-center gap-3 px-6 py-4 md:py-6 transition-all ${
                  activeTab === "pay"
                    ? "bg-red-50 text-red-600 border-b-2 border-red-600"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                <HugeiconsIcon icon={CreditCardIcon} className="w-5 h-5" />
                <span className="font-semibold">Pay Invoice</span>
              </button>
              <button
                onClick={() => setActiveTab("validate")}
                className={`flex items-center justify-center gap-3 px-6 py-4 md:py-6 transition-all ${
                  activeTab === "validate"
                    ? "bg-red-50 text-red-600 border-b-2 border-red-600"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                <HugeiconsIcon icon={Task01Icon} className="w-5 h-5" />
                <span className="font-semibold">Validate Receipt</span>
              </button>
            </div>

            {/* Tab Content */}
            <div className="p-6 md:p-12">
              {activeTab === "generate" && <InvoicePlanSelector />}
              {activeTab === "pay" && <InvoicePaymentSection />}
              {activeTab === "validate" && <ReceiptValidationSection />}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
