const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8800/api';

export interface Invoice {
  reference: string;
  invoice_number: string;
  customer_name: string;
  customer_email: string;
  service_description: string;
  amount: number;
  currency_code: string;
  formatted_amount: string;
  due_date: string;
  status: 'unpaid' | 'paid' | 'expired' | 'cancelled';
  can_be_paid: boolean;
  is_paid: boolean;
  is_expired: boolean;
}

export interface InvoiceResponse {
  success: boolean;
  message: string;
  data: {
    invoice: Invoice;
    errors: string[];
  };
}

export interface PaymentInitResponse {
  success: boolean;
  message: string;
  data: {
    authorization_url: string;
    reference: string;
    payment_id: number;
  };
}

export interface Receipt {
  invoice_reference: string;
  invoice_number: string;
  customer_name: string;
  customer_email: string;
  service_description: string;
  amount: number;
  currency_code: string;
  formatted_amount: string;
  payment_reference: string;
  transaction_reference: string | null;
  paid_at: string | null;
  payment_date: string | null;
}

export interface ReceiptResponse {
  success: boolean;
  message: string;
  data: {
    receipt: Receipt;
  };
}

export interface ValidationResponse {
  success: boolean;
  message: string;
  data: {
    valid: boolean;
    can_be_paid?: boolean;
    status?: string;
    errors?: string[];
    message?: string;
  };
}

export interface SubscriptionPlan {
  id: string;
  name: string;
  slug: string;
  type: 'ftth' | 'enterprise' | 'cloud';
  description?: string;
  price: number;
  currency_code: string;
  duration_days: number;
  features?: string[];
  is_active: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface PlansResponse {
  success: boolean;
  message: string;
  data: SubscriptionPlan[];
}

export interface GenerateInvoiceRequest {
  plan_id: string;
  customer_name: string;
  customer_email: string;
}

export interface GenerateInvoiceResponse {
  success: boolean;
  message: string;
  data: {
    invoice: Invoice;
  };
}

export interface ValidateReceiptResponse {
  success: boolean;
  message: string;
  data: {
    receipt: Receipt;
    message?: string;
  };
}

/**
 * Get invoice by reference
 */
export async function getInvoiceByReference(reference: string): Promise<InvoiceResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/public/invoices/${reference}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Failed to fetch invoice' }));
      
      // Log error details
      console.error('Invoice fetch error:', {
        reference,
        status: response.status,
        statusText: response.statusText,
        error: error.message || 'Failed to fetch invoice',
        errorData: error,
        timestamp: new Date().toISOString(),
      });
      
      throw new Error(error.message || 'Failed to fetch invoice');
    }

    return response.json();
  } catch (error) {
    // Log any unexpected errors
    console.error('Unexpected error in getInvoiceByReference:', {
      reference,
      error: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined,
      timestamp: new Date().toISOString(),
    });
    throw error;
  }
}

/**
 * Initialize payment for an invoice
 */
export async function initializePayment(reference: string): Promise<PaymentInitResponse> {
  const response = await fetch(`${API_BASE_URL}/public/invoices/${reference}/pay`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Failed to initialize payment' }));
    throw new Error(error.message || 'Failed to initialize payment');
  }

  return response.json();
}

/**
 * Get receipt for a paid invoice
 */
export async function getReceipt(reference: string): Promise<ReceiptResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/public/invoices/${reference}/receipt`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Failed to fetch receipt' }));
      const errorMessage = error.message || 'Failed to fetch receipt';
      
      // Log error details for debugging
      console.error('Receipt fetch error:', {
        reference,
        status: response.status,
        statusText: response.statusText,
        error: errorMessage,
        errorData: error,
        timestamp: new Date().toISOString(),
      });
      
      // If invoice not paid yet, throw a specific error that can be handled gracefully
      if (response.status === 400 && errorMessage.includes('not been paid')) {
        const notPaidError = new Error(errorMessage);
        (notPaidError as any).status = 400;
        (notPaidError as any).notPaidYet = true;
        throw notPaidError;
      }
      
      throw new Error(errorMessage);
    }

    return response.json();
  } catch (error) {
    // Log any unexpected errors
    console.error('Unexpected error in getReceipt:', {
      reference,
      error: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined,
      timestamp: new Date().toISOString(),
    });
    throw error;
  }
}

/**
 * Validate invoice reference
 */
export async function validateInvoiceReference(reference: string): Promise<ValidationResponse> {
  const response = await fetch(`${API_BASE_URL}/public/invoices/validate/${reference}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Failed to validate invoice' }));
    throw new Error(error.message || 'Failed to validate invoice');
  }

  return response.json();
}

/**
 * Get subscription plans
 */
export async function getSubscriptionPlans(): Promise<PlansResponse> {
  const response = await fetch(`${API_BASE_URL}/public/subscription-plans`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Failed to fetch plans' }));
    throw new Error(error.message || 'Failed to fetch plans');
  }

  return response.json();
}

/**
 * Generate invoice from plan
 */
export async function generateInvoice(data: GenerateInvoiceRequest): Promise<GenerateInvoiceResponse> {
  const response = await fetch(`${API_BASE_URL}/public/invoices/generate`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Failed to generate invoice' }));
    throw new Error(error.message || 'Failed to generate invoice');
  }

  return response.json();
}

/**
 * Verify payment with Paystack and mark invoice as paid immediately
 */
export interface VerifyPaymentRequest {
  paystack_reference: string;
}

export interface VerifyPaymentResponse {
  success: boolean;
  message: string;
  data: {
    invoice: {
      reference: string;
      status: string;
      is_paid: boolean;
    };
    receipt: Receipt;
  };
}

export async function verifyPayment(
  invoiceReference: string,
  paystackReference: string
): Promise<VerifyPaymentResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/public/invoices/${invoiceReference}/verify-payment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        paystack_reference: paystackReference,
      }),
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Failed to verify payment' }));
      
      console.error('Payment verification error:', {
        invoiceReference,
        paystackReference,
        status: response.status,
        statusText: response.statusText,
        error: error.message || 'Failed to verify payment',
        errorData: error,
        timestamp: new Date().toISOString(),
      });
      
      throw new Error(error.message || 'Failed to verify payment');
    }

    return response.json();
  } catch (error) {
    console.error('Unexpected error in verifyPayment:', {
      invoiceReference,
      paystackReference,
      error: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined,
      timestamp: new Date().toISOString(),
    });
    throw error;
  }
}

/**
 * Validate receipt
 */
export async function validateReceipt(reference: string): Promise<ValidateReceiptResponse> {
  const response = await fetch(`${API_BASE_URL}/public/receipts/validate/${reference}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Failed to validate receipt' }));
    throw new Error(error.message || 'Failed to validate receipt');
  }

  return response.json();
}

