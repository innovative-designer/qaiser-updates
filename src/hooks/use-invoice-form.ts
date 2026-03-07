'use client';

import { useCallback, useEffect, useReducer } from 'react';
import { nanoid } from 'nanoid';

import {
  DEFAULT_CURRENCY,
  DEFAULT_DISCOUNT,
  DEFAULT_TAX_RATE,
  INVOICE_ID_LENGTH,
  LINE_ITEM_ID_LENGTH,
} from '@/lib/constants';
import { detectCurrency } from '@/lib/geolocation';
import type { InvoiceData, LineItem } from '@/types/invoice';

type EditableInvoiceField =
  | 'businessName'
  | 'businessEmail'
  | 'businessPhone'
  | 'businessAddress'
  | 'clientName'
  | 'clientEmail'
  | 'clientPhone'
  | 'clientCompany'
  | 'taxRate'
  | 'discount'
  | 'notes'
  | 'dueDate'
  | 'status';

type EditableInvoiceValue = string | number | InvoiceData['status'];

type EditableLineItemField = 'description' | 'quantity' | 'rate';
type EditableLineItemValue = string | number;

type InvoiceFormAction =
  | {
      type: 'SET_FIELD';
      field: EditableInvoiceField;
      value: EditableInvoiceValue;
    }
  | {
      type: 'SET_LINE_ITEM';
      index: number;
      field: EditableLineItemField;
      value: EditableLineItemValue;
    }
  | { type: 'ADD_LINE_ITEM' }
  | { type: 'REMOVE_LINE_ITEM'; index: number }
  | { type: 'SET_CURRENCY'; currency: string }
  | { type: 'SET_PDF_URL'; pdfUrl: string }
  | { type: 'RESET' };

export interface ValidationErrors {
  businessName?: string;
  clientName?: string;
  lineItems?: string;
  dueDate?: string;
}

interface UseInvoiceFormResult {
  invoice: InvoiceData;
  setField: (field: EditableInvoiceField, value: EditableInvoiceValue) => void;
  setLineItem: (index: number, field: EditableLineItemField, value: EditableLineItemValue) => void;
  addLineItem: () => void;
  removeLineItem: (index: number) => void;
  setCurrency: (currency: string) => void;
  setPdfUrl: (pdfUrl: string) => void;
  reset: () => void;
  validate: () => ValidationErrors;
}

function createLineItem(): LineItem {
  return {
    id: nanoid(LINE_ITEM_ID_LENGTH),
    description: '',
    quantity: 1,
    rate: 0,
    amount: 0,
  };
}

function createInitialState(): InvoiceData {
  return {
    id: nanoid(INVOICE_ID_LENGTH),
    businessName: '',
    businessEmail: '',
    businessPhone: '',
    businessAddress: '',
    clientName: '',
    clientEmail: '',
    clientPhone: '',
    clientCompany: '',
    lineItems: [createLineItem()],
    currency: DEFAULT_CURRENCY,
    subtotal: 0,
    taxRate: DEFAULT_TAX_RATE,
    taxAmount: 0,
    discount: DEFAULT_DISCOUNT,
    total: 0,
    notes: '',
    dueDate: '',
    createdAt: new Date().toISOString(),
    status: 'draft',
  };
}

function normalizeNumber(value: number): number {
  return Number.isFinite(value) ? value : 0;
}

function recalculateInvoice(state: InvoiceData): InvoiceData {
  const lineItems = state.lineItems.map((lineItem) => {
    const quantity = Math.max(0, normalizeNumber(lineItem.quantity));
    const rate = Math.max(0, normalizeNumber(lineItem.rate));

    return {
      ...lineItem,
      quantity,
      rate,
      amount: quantity * rate,
    };
  });

  const subtotal = lineItems.reduce((sum, lineItem) => sum + lineItem.amount, 0);
  const taxRate = Math.max(0, normalizeNumber(state.taxRate));
  const discount = Math.max(0, normalizeNumber(state.discount));
  const taxAmount = subtotal * (taxRate / 100);
  const total = Math.max(0, subtotal + taxAmount - discount);

  return {
    ...state,
    lineItems,
    subtotal,
    taxRate,
    taxAmount,
    discount,
    total,
  };
}

function invoiceReducer(state: InvoiceData, action: InvoiceFormAction): InvoiceData {
  switch (action.type) {
    case 'SET_FIELD':
      return recalculateInvoice({
        ...state,
        [action.field]: action.value,
      });

    case 'SET_LINE_ITEM': {
      const lineItems = state.lineItems.map((lineItem, index) =>
        index === action.index
          ? {
              ...lineItem,
              [action.field]: action.value,
            }
          : lineItem
      );

      return recalculateInvoice({
        ...state,
        lineItems,
      });
    }

    case 'ADD_LINE_ITEM':
      return recalculateInvoice({
        ...state,
        lineItems: [...state.lineItems, createLineItem()],
      });

    case 'REMOVE_LINE_ITEM': {
      if (state.lineItems.length <= 1) {
        return state;
      }

      const lineItems = state.lineItems.filter((_, index) => index !== action.index);

      return recalculateInvoice({
        ...state,
        lineItems,
      });
    }

    case 'SET_CURRENCY':
      return {
        ...state,
        currency: action.currency,
      };

    case 'SET_PDF_URL':
      return {
        ...state,
        pdfUrl: action.pdfUrl,
        status: 'sent',
      };

    case 'RESET':
      return createInitialState();

    default:
      return state;
  }
}

export function validateInvoice(invoice: InvoiceData): ValidationErrors {
  const errors: ValidationErrors = {};

  if (!invoice.businessName.trim()) {
    errors.businessName = 'Business name is required';
  }

  if (!invoice.clientName.trim()) {
    errors.clientName = 'Client name is required';
  }

  const hasValidLineItem = invoice.lineItems.some(
    (lineItem) => lineItem.description.trim() && lineItem.rate > 0
  );

  if (!hasValidLineItem) {
    errors.lineItems = 'At least one line item with description and rate is required';
  }

  if (invoice.dueDate) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const dueDate = new Date(invoice.dueDate);
    dueDate.setHours(0, 0, 0, 0);

    if (dueDate < today) {
      errors.dueDate = 'Due date must be today or later';
    }
  }

  return errors;
}

export function useInvoiceForm(): UseInvoiceFormResult {
  const [invoice, dispatch] = useReducer(invoiceReducer, undefined, createInitialState);

  useEffect(() => {
    let isMounted = true;

    void detectCurrency().then((currency) => {
      if (isMounted) {
        dispatch({
          type: 'SET_CURRENCY',
          currency,
        });
      }
    });

    return () => {
      isMounted = false;
    };
  }, []);

  const setField = useCallback((field: EditableInvoiceField, value: EditableInvoiceValue) => {
    dispatch({
      type: 'SET_FIELD',
      field,
      value,
    });
  }, []);

  const setLineItem = useCallback(
    (index: number, field: EditableLineItemField, value: EditableLineItemValue) => {
      dispatch({
        type: 'SET_LINE_ITEM',
        index,
        field,
        value,
      });
    },
    []
  );

  const addLineItem = useCallback(() => {
    dispatch({ type: 'ADD_LINE_ITEM' });
  }, []);

  const removeLineItem = useCallback((index: number) => {
    dispatch({
      type: 'REMOVE_LINE_ITEM',
      index,
    });
  }, []);

  const setCurrency = useCallback((currency: string) => {
    dispatch({
      type: 'SET_CURRENCY',
      currency,
    });
  }, []);

  const setPdfUrl = useCallback((pdfUrl: string) => {
    dispatch({
      type: 'SET_PDF_URL',
      pdfUrl,
    });
  }, []);

  const reset = useCallback(() => {
    dispatch({ type: 'RESET' });
  }, []);

  const validate = useCallback(() => validateInvoice(invoice), [invoice]);

  return {
    invoice,
    setField,
    setLineItem,
    addLineItem,
    removeLineItem,
    setCurrency,
    setPdfUrl,
    reset,
    validate,
  };
}
