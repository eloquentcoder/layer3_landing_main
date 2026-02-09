"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { validateInvoiceReference } from "@/lib/api/invoice";

export function InvoiceLookup() {
  const [reference, setReference] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const trimmedRef = reference.trim();
      if (!trimmedRef) {
        setError("Please enter an invoice reference");
        setLoading(false);
        return;
      }

      const response = await validateInvoiceReference(trimmedRef);
      
      if (response.success && response.data.valid) {
        router.push(`/invoice/${trimmedRef}`);
      } else {
        setError(response.data.message || "Invoice not found");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to validate invoice");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="reference" className="block text-sm font-medium text-gray-700 mb-2">
            Invoice Reference
          </label>
          <Input
            id="reference"
            type="text"
            value={reference}
            onChange={(e) => setReference(e.target.value)}
            placeholder="Enter invoice reference"
            className="w-full border border-gray-300 focus:border-red-500"
            disabled={loading}
          />
        </div>
        {error && (
          <div className="text-sm text-red-600 bg-red-50 p-3 rounded-lg">
            {error}
          </div>
        )}
        <Button
          type="submit"
          className="w-full"
          disabled={loading}
        >
          {loading ? "Validating..." : "Lookup Invoice"}
        </Button>
      </form>
    </div>
  );
}

