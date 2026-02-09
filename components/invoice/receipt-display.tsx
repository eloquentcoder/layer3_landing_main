"use client";

import { Receipt } from "@/lib/api/invoice";
import { Button } from "@/components/ui/button";

interface ReceiptDisplayProps {
  receipt: Receipt;
}

export function ReceiptDisplay({ receipt }: ReceiptDisplayProps) {
  const handleDownload = () => {
    // TODO: Implement PDF download when backend endpoint is ready
    window.print();
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 md:p-8 max-w-2xl mx-auto">
      <div className="mb-6 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
          <svg
            className="w-8 h-8 text-green-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
          Payment Successful
        </h1>
        <p className="text-gray-600">Your payment has been processed successfully</p>
      </div>

      <div className="border-t border-b border-gray-200 py-6 mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Receipt</h2>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-500">Invoice Number</label>
              <p className="text-base font-semibold text-gray-900">{receipt.invoice_number}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">Reference</label>
              <p className="text-base font-mono text-gray-900">{receipt.invoice_reference}</p>
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-500">Customer Name</label>
            <p className="text-base text-gray-900">{receipt.customer_name}</p>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-500">Service Description</label>
            <p className="text-base text-gray-900">{receipt.service_description}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-500">Amount Paid</label>
              <p className="text-2xl font-bold text-gray-900">{receipt.formatted_amount}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">Payment Date</label>
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
              <label className="text-sm font-medium text-gray-500">Transaction Reference</label>
              <p className="text-base font-mono text-gray-900">{receipt.transaction_reference}</p>
            </div>
          )}

          {receipt.payment_reference && (
            <div>
              <label className="text-sm font-medium text-gray-500">Payment Reference</label>
              <p className="text-base font-mono text-gray-900">{receipt.payment_reference}</p>
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <Button onClick={handleDownload} variant="outline" className="flex-1">
          Download Receipt
        </Button>
        <Button
          onClick={() => (window.location.href = "/invoice")}
          variant="outline"
          className="flex-1"
        >
          Pay Another Invoice
        </Button>
      </div>
    </div>
  );
}

