"use client";

import { InvoiceLookup } from "@/components/invoice/invoice-lookup";

export function InvoicePaymentSection() {
  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
          Pay Your Invoice
        </h2>
        <p className="text-gray-600">
          Enter your invoice reference to view and pay your invoice securely
        </p>
      </div>
      <InvoiceLookup />
    </div>
  );
}

