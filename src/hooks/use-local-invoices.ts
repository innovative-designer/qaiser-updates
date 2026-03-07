'use client';

import { useCallback, useEffect, useState } from 'react';

import {
  deleteInvoice as deleteInvoiceRecord,
  getAllInvoices,
  saveInvoice as persistInvoice,
} from '@/lib/db';
import type { InvoiceData } from '@/types/invoice';

interface UseLocalInvoicesResult {
  invoices: InvoiceData[];
  loading: boolean;
  refresh: () => Promise<void>;
  saveInvoice: (invoice: InvoiceData) => Promise<void>;
  deleteInvoice: (id: string) => Promise<void>;
}

export function useLocalInvoices(): UseLocalInvoicesResult {
  const [invoices, setInvoices] = useState<InvoiceData[]>([]);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async (): Promise<void> => {
    setLoading(true);
    const data = await getAllInvoices();
    setInvoices(data);
    setLoading(false);
  }, []);

  useEffect(() => {
    let isMounted = true;

    async function loadInitialInvoices() {
      const data = await getAllInvoices();

      if (!isMounted) {
        return;
      }

      setInvoices(data);
      setLoading(false);
    }

    void loadInitialInvoices();

    return () => {
      isMounted = false;
    };
  }, []);

  const saveInvoice = useCallback(
    async (invoice: InvoiceData): Promise<void> => {
      await persistInvoice(invoice);
      await refresh();
    },
    [refresh]
  );

  const deleteInvoice = useCallback(
    async (id: string): Promise<void> => {
      await deleteInvoiceRecord(id);
      await refresh();
    },
    [refresh]
  );

  return {
    invoices,
    loading,
    refresh,
    saveInvoice,
    deleteInvoice,
  };
}
