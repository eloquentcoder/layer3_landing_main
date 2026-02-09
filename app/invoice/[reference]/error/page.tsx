"use client";

import { useParams, useSearchParams } from "next/navigation";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { ErrorMessage } from "@/components/invoice/error-message";

export default function InvoiceErrorPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const reference = params.reference as string;
  
  // Get error message from various possible sources
  const errorMessageFromQuery = searchParams.get("message");
  const errorMessageFromPaystack = searchParams.get("error");
  const errorMessage = errorMessageFromQuery || errorMessageFromPaystack || "An error occurred while processing your payment.";

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50 py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <ErrorMessage
            title="Payment Failed"
            message={errorMessage}
            invoiceReference={reference}
          />
        </div>
      </main>
      <Footer />
    </>
  );
}

