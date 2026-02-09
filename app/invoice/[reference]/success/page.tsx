"use client";

import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { ReceiptDisplay } from "@/components/invoice/receipt-display";
import { ErrorMessage } from "@/components/invoice/error-message";
import { getReceipt, Receipt, getInvoiceByReference, verifyPayment } from "@/lib/api/invoice";

export default function InvoiceSuccessPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const reference = params.reference as string;
  const trxref = searchParams.get("trxref");
  const referenceFromPaystack = searchParams.get("reference");
  
  const [receipt, setReceipt] = useState<Receipt | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [verifying, setVerifying] = useState(false);

  useEffect(() => {
    if (!reference) {
      setError("Invalid invoice reference");
      setLoading(false);
      return;
    }

    let isMounted = true;

    const processPayment = async () => {
      if (!isMounted) return;

      try {
        // If we have Paystack reference, verify payment immediately
        const paystackRef = referenceFromPaystack || trxref;
        
        if (paystackRef && !verifying) {
          setVerifying(true);
          
          try {
            console.log('Verifying payment with Paystack:', {
              invoiceReference: reference,
              paystackReference: paystackRef,
            });

            const verifyResponse = await verifyPayment(reference, paystackRef);
            
            if (verifyResponse.success && verifyResponse.data.receipt) {
              if (isMounted) {
                setReceipt(verifyResponse.data.receipt);
                setLoading(false);
                setVerifying(false);
              }
              return;
            }
          } catch (verifyErr) {
            console.error('Payment verification error:', {
              invoiceReference: reference,
              paystackReference: paystackRef,
              error: verifyErr instanceof Error ? verifyErr.message : String(verifyErr),
            });
            // Continue to fallback flow if verification fails
          } finally {
            if (isMounted) {
              setVerifying(false);
            }
          }
        }

        // Fallback: Check invoice status and get receipt
        const invoiceResponse = await getInvoiceByReference(reference);
        if (!invoiceResponse.success || !invoiceResponse.data.invoice) {
          if (isMounted) {
            setError("Invoice not found. Payment may still be processing.");
            setLoading(false);
          }
          return;
        }

        const invoice = invoiceResponse.data.invoice;

        // If invoice is paid, get receipt
        if (invoice.is_paid) {
          const receiptResponse = await getReceipt(reference);
          
          if (receiptResponse.success && receiptResponse.data.receipt) {
            if (isMounted) {
              setReceipt(receiptResponse.data.receipt);
              setLoading(false);
            }
            return;
          }
        }

        // If not paid and no Paystack reference, show error
        if (!invoice.is_paid && !paystackRef) {
          if (isMounted) {
            setError("Payment verification failed. Please contact support if payment was successful.");
            setLoading(false);
          }
          return;
        }

        // If we have Paystack reference but verification didn't work, try once more
        if (paystackRef && !invoice.is_paid) {
          // Small delay then check again (webhook might have processed)
          setTimeout(async () => {
            if (!isMounted) return;
            const retryResponse = await getInvoiceByReference(reference);
            if (retryResponse.success && retryResponse.data.invoice?.is_paid) {
              const receiptResponse = await getReceipt(reference);
              if (receiptResponse.success && receiptResponse.data.receipt) {
                if (isMounted) {
                  setReceipt(receiptResponse.data.receipt);
                  setLoading(false);
                }
                return;
              }
            }
            if (isMounted) {
              setError("Payment is still being processed. Please wait a moment and refresh the page.");
              setLoading(false);
            }
          }, 2000);
          return;
        }

        if (isMounted) {
          setError("Payment verification failed. Please contact support if payment was successful.");
          setLoading(false);
        }
      } catch (err) {
        console.error('Error processing payment:', {
          reference,
          error: err instanceof Error ? err.message : String(err),
          errorType: err instanceof Error ? err.constructor.name : typeof err,
          timestamp: new Date().toISOString(),
        });
        
        if (isMounted) {
          setError(err instanceof Error ? err.message : "Failed to process payment");
          setLoading(false);
        }
      }
    };

    // Process immediately
    processPayment();

    return () => {
      isMounted = false;
    };
  }, [reference, trxref, referenceFromPaystack, verifying]);

  if (loading) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-gray-50 py-12 px-4">
          <div className="container mx-auto max-w-4xl">
            <div className="bg-white rounded-lg shadow-lg p-8 text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto"></div>
              <p className="mt-4 text-gray-600">
                {verifying ? "Verifying your payment..." : "Processing your payment..."}
              </p>
              {!verifying && (
                <p className="mt-2 text-sm text-gray-500">
                  Please wait while we process your payment...
                </p>
              )}
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  if (error || !receipt) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-gray-50 py-12 px-4">
          <div className="container mx-auto max-w-4xl">
            <div className="bg-white rounded-lg shadow-lg p-8 text-center">
              <div className="mb-6">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-yellow-100 rounded-full mb-4">
                  <svg
                    className="w-8 h-8 text-yellow-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                  Payment Processing
                </h1>
                <p className="text-gray-600 mb-4">
                  {error || "Your payment is being processed. Please check back in a few moments."}
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => window.location.reload()}
                  className="px-6 py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-colors"
                >
                  Refresh Page
                </button>
                <a
                  href={`/invoice/${reference}`}
                  className="px-6 py-3 bg-gray-100 text-gray-900 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
                >
                  View Invoice
                </a>
              </div>
            </div>
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
          <ReceiptDisplay receipt={receipt} />
        </div>
      </main>
      <Footer />
    </>
  );
}

