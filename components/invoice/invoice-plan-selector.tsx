"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { getSubscriptionPlans, generateInvoice, SubscriptionPlan } from "@/lib/api/invoice";

export function InvoicePlanSelector() {
  const [plans, setPlans] = useState<SubscriptionPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPlan, setSelectedPlan] = useState<SubscriptionPlan | null>(null);
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const response = await getSubscriptionPlans();
        if (response.success) {
          setPlans(response.data);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load plans");
      } finally {
        setLoading(false);
      }
    };

    fetchPlans();
  }, []);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPlan || !customerName || !customerEmail) {
      setError("Please fill in all fields and select a plan");
      return;
    }

    setGenerating(true);
    setError(null);

    try {
      const response = await generateInvoice({
        plan_id: selectedPlan.id,
        customer_name: customerName,
        customer_email: customerEmail,
      });

      if (response.success && response.data.invoice) {
        router.push(`/invoice/${response.data.invoice.reference}`);
      } else {
        setError("Failed to generate invoice");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to generate invoice");
    } finally {
      setGenerating(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading plans...</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
          Generate New Invoice
        </h2>
        <p className="text-gray-600">
          Select a subscription plan and enter customer details to generate an invoice
        </p>
      </div>

      <form onSubmit={handleGenerate} className="space-y-8">
        {/* Plan Selection */}
        <div>
          <Label className="text-base font-semibold text-gray-900 mb-4 block">
            Select Subscription Plan
          </Label>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {plans.map((plan) => (
              <button
                key={plan.id}
                type="button"
                onClick={() => setSelectedPlan(plan)}
                className={`p-6 rounded-xl border-2 transition-all text-left ${
                  selectedPlan?.id === plan.id
                    ? "border-red-600 bg-red-50 shadow-lg"
                    : "border-gray-200 hover:border-red-300 hover:shadow-md"
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-bold text-lg text-gray-900">{plan.name}</h3>
                    <span className="text-xs text-gray-500 uppercase">{plan.type}</span>
                  </div>
                  {selectedPlan?.id === plan.id && (
                    <div className="w-6 h-6 bg-red-600 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  )}
                </div>
                <p className="text-2xl font-bold text-gray-900 mb-2">
                  {plan.currency_code === "NGN" ? "₦" : plan.currency_code} {plan.price.toLocaleString()}
                </p>
                {plan.description && (
                  <p className="text-sm text-gray-600 mb-3">{plan.description}</p>
                )}
                {plan.features && plan.features.length > 0 && (
                  <ul className="text-xs text-gray-500 space-y-1">
                    {plan.features.slice(0, 3).map((feature, idx) => (
                      <li key={idx}>• {feature}</li>
                    ))}
                  </ul>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Customer Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="customerName" className="mb-2 block">
              Customer Name *
            </Label>
            <Input
              id="customerName"
              type="text"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              placeholder="Enter customer name"
              className="border border-gray-300 focus:border-red-500"
              required
            />
          </div>
          <div>
            <Label htmlFor="customerEmail" className="mb-2 block">
              Customer Email *
            </Label>
            <Input
              id="customerEmail"
              type="email"
              value={customerEmail}
              onChange={(e) => setCustomerEmail(e.target.value)}
              placeholder="Enter customer email"
              className="border border-gray-300 focus:border-red-500"
              required
            />
          </div>
        </div>

        {error && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
            {error}
          </div>
        )}

        <Button
          type="submit"
          disabled={!selectedPlan || generating}
          className="w-full md:w-auto px-8 py-6 text-lg font-semibold"
          size="lg"
        >
          {generating ? "Generating Invoice..." : "Generate Invoice"}
        </Button>
      </form>
    </div>
  );
}

