"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { validateReceipt, Receipt } from "@/lib/api/invoice";
import { useRouter } from "next/navigation";

export function ReceiptValidationSection() {
  const [reference, setReference] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [receipt, setReceipt] = useState<Receipt | null>(null);
  const router = useRouter();

  const handleValidate = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setReceipt(null);
    setLoading(true);

    try {
      const trimmedRef = reference.trim();
      if (!trimmedRef) {
        setError("Please enter a receipt reference");
        setLoading(false);
        return;
      }

      const response = await validateReceipt(trimmedRef);
      
      if (response.success && response.data.receipt) {
        setReceipt(response.data.receipt);
      } else {
        setError(response.data.message || "Receipt not found");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to validate receipt");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
          Validate Receipt
        </h2>
        <p className="text-gray-600">
          Enter your receipt reference to verify and view payment details
        </p>
      </div>

      <form onSubmit={handleValidate} className="space-y-6 mb-8">
        <div>
          <Label htmlFor="receiptReference" className="mb-2 block">
            Receipt Reference
          </Label>
          <div className="flex gap-4">
            <Input
              id="receiptReference"
              type="text"
              value={reference}
              onChange={(e) => setReference(e.target.value)}
              placeholder="Enter receipt reference"
              className="flex-1 border border-gray-300 focus:border-red-500"
              disabled={loading}
            />
            <Button type="submit" disabled={loading}>
              {loading ? "Validating..." : "Validate"}
            </Button>
          </div>
        </div>
      </form>

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 mb-6">
          {error}
        </div>
      )}

      {receipt && (
        <div className="bg-white border-2 border-green-200 rounded-xl shadow-lg p-6 md:p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900">Receipt Validated</h3>
              <p className="text-sm text-gray-600">Payment confirmed</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label className="text-sm font-medium text-gray-500">Invoice Number</Label>
                <p className="text-base font-semibold text-gray-900">{receipt.invoice_number}</p>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-500">Reference</Label>
                <p className="text-base font-mono text-gray-900">{receipt.invoice_reference}</p>
              </div>
            </div>

            <div>
              <Label className="text-sm font-medium text-gray-500">Customer Name</Label>
              <p className="text-base text-gray-900">{receipt.customer_name}</p>
            </div>

            <div>
              <Label className="text-sm font-medium text-gray-500">Service Description</Label>
              <p className="text-base text-gray-900">{receipt.service_description}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label className="text-sm font-medium text-gray-500">Amount Paid</Label>
                <p className="text-2xl font-bold text-gray-900">{receipt.formatted_amount}</p>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-500">Payment Date</Label>
                <p className="text-base text-gray-900">
                  {receipt.payment_date
                    ? new Date(receipt.payment_date).toLocaleString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })
                    : "N/A"}
                </p>
              </div>
            </div>

            {receipt.transaction_reference && (
              <div>
                <Label className="text-sm font-medium text-gray-500">Transaction Reference</Label>
                <p className="text-base font-mono text-gray-900">{receipt.transaction_reference}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

