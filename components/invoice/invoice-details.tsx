"use client";

import { Invoice } from "@/lib/api/invoice";

interface InvoiceDetailsProps {
  invoice: Invoice;
  errors: string[];
  onPay?: () => void;
  loading?: boolean;
}

export function InvoiceDetails({ invoice, errors, onPay, loading }: InvoiceDetailsProps) {
  const getStatusBadge = () => {
    switch (invoice.status) {
      case "paid":
        return (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
            Paid
          </span>
        );
      case "expired":
        return (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800">
            Expired
          </span>
        );
      case "cancelled":
        return (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800">
            Cancelled
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800">
            Unpaid
          </span>
        );
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 md:p-8 max-w-2xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
          Invoice Details
        </h1>
        <div className="mt-2">{getStatusBadge()}</div>
      </div>

      {errors.length > 0 && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <h3 className="text-sm font-semibold text-red-800 mb-2">Cannot Process Payment</h3>
          <ul className="list-disc list-inside text-sm text-red-700 space-y-1">
            {errors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="space-y-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-gray-500">Invoice Number</label>
            <p className="text-base font-semibold text-gray-900">{invoice.invoice_number}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-500">Reference</label>
            <p className="text-base font-mono text-gray-900">{invoice.reference}</p>
          </div>
        </div>

        <div>
          <label className="text-sm font-medium text-gray-500">Customer Name</label>
          <p className="text-base text-gray-900">{invoice.customer_name}</p>
        </div>

        <div>
          <label className="text-sm font-medium text-gray-500">Service Description</label>
          <p className="text-base text-gray-900">{invoice.service_description}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-gray-500">Amount</label>
            <p className="text-2xl font-bold text-gray-900">{invoice.formatted_amount}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-500">Due Date</label>
            <p className="text-base text-gray-900">
              {new Date(invoice.due_date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}

