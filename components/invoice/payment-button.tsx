"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { initializePayment } from "@/lib/api/invoice";

interface PaymentButtonProps {
  invoiceReference: string;
}

export function PaymentButton({ invoiceReference }: PaymentButtonProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handlePayment = async () => {
    setError(null);
    setLoading(true);

    try {
      const response = await initializePayment(invoiceReference);
      
      if (response.success && response.data.authorization_url) {
        // Redirect to Paystack checkout
        window.location.href = response.data.authorization_url;
        // Keep loading state true as we're redirecting
      } else {
        setError(response.message || "Failed to initialize payment. Please try again.");
        setLoading(false);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to initialize payment";
      setError(errorMessage);
      setLoading(false);
      console.error("Payment initialization error:", err);
    }
  };

  if (error) {
    return (
      <div className="space-y-4">
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
          {error}
        </div>
        <Button onClick={handlePayment} disabled={loading} className="w-full">
          {loading ? "Processing..." : "Try Again"}
        </Button>
      </div>
    );
  }

  return (
    <Button
      onClick={handlePayment}
      disabled={loading}
      className="w-full md:w-auto px-8 py-6 text-lg font-semibold"
      size="lg"
    >
      {loading ? "Processing..." : "Pay Now"}
    </Button>
  );
}

