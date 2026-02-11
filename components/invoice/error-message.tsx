"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

interface ErrorMessageProps {
  title?: string;
  message: string;
  invoiceReference?: string;
}

export function ErrorMessage({ title = "Error", message, invoiceReference }: ErrorMessageProps) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 md:p-8 max-w-2xl mx-auto text-center">
      <div className="mb-6">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4">
          <svg
            className="w-8 h-8 text-red-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">{title}</h1>
        <p className="text-gray-600">{message}</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        {invoiceReference && (
          <Link href={`/invoice/${invoiceReference}`} className="w-full sm:w-auto">
            <Button variant="outline" className="w-full">
              Try Again
            </Button>
          </Link>
        )}
        <Link href="/invoice" className="w-full sm:w-auto">
          <Button className="w-full">Lookup Another Invoice</Button>
        </Link>
      </div>
    </div>
  );
}

