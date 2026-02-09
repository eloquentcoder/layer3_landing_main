"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { InvoiceDetails } from "@/components/invoice/invoice-details";
import { PaymentButton } from "@/components/invoice/payment-button";
import { ErrorMessage } from "@/components/invoice/error-message";
import { getInvoiceByReference, Invoice } from "@/lib/api/invoice";

export default function InvoiceDetailPage() {
  const params = useParams();
  const router = useRouter();
  const reference = params.reference as string;
  
  const [invoice, setInvoice] = useState<Invoice | null>(null);
  const [errors, setErrors] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!reference) {
      setError("Invalid invoice reference");
      setLoading(false);
      return;
    }

    const fetchInvoice = async () => {
      try {
        setLoading(true);
        const response = await getInvoiceByReference(reference);
        
        if (response.success && response.data.invoice) {
          setInvoice(response.data.invoice);
          setErrors(response.data.errors || []);
        } else {
          setError("Invoice not found");
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load invoice");
      } finally {
        setLoading(false);
      }
    };

    fetchInvoice();
  }, [reference]);

  if (loading) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-gray-50 py-12 px-4">
          <div className="container mx-auto max-w-4xl">
            <div className="bg-white rounded-lg shadow-lg p-8 text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading invoice...</p>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  if (error || !invoice) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-gray-50 py-12 px-4">
          <div className="container mx-auto max-w-4xl">
            <ErrorMessage
              title="Invoice Not Found"
              message={error || "The invoice you're looking for doesn't exist or has been removed."}
              invoiceReference={reference}
            />
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50 py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="mb-6">
            <InvoiceDetails
              invoice={invoice}
              errors={errors}
              onPay={() => {}}
              loading={false}
            />
          </div>
          {invoice.can_be_paid && (
            <div className="flex justify-center">
              <PaymentButton invoiceReference={reference} />
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}

