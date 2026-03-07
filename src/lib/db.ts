import { openDB, type DBSchema, type IDBPDatabase } from 'idb';

import { MAX_INVOICES } from '@/lib/constants';
import type { InvoiceData } from '@/types/invoice';

const DB_NAME = 'quickbill';
const DB_VERSION = 1;
const STORE_NAME = 'invoices';

interface QuickBillDatabase extends DBSchema {
  invoices: {
    key: string;
    value: InvoiceData;
  };
}

let dbPromise: Promise<IDBPDatabase<QuickBillDatabase>> | null = null;

function getDB(): Promise<IDBPDatabase<QuickBillDatabase>> {
  if (!dbPromise) {
    dbPromise = openDB<QuickBillDatabase>(DB_NAME, DB_VERSION, {
      upgrade(db) {
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          db.createObjectStore(STORE_NAME, { keyPath: 'id' });
        }
      },
    });
  }

  return dbPromise;
}

export async function saveInvoice(invoice: InvoiceData): Promise<void> {
  const db = await getDB();
  const count = await db.count(STORE_NAME);

  if (count >= MAX_INVOICES) {
    const allInvoices = await db.getAll(STORE_NAME);

    allInvoices.sort(
      (left, right) => new Date(left.createdAt).getTime() - new Date(right.createdAt).getTime()
    );

    const oldestInvoice = allInvoices[0];

    if (oldestInvoice) {
      await db.delete(STORE_NAME, oldestInvoice.id);
    }
  }

  await db.put(STORE_NAME, invoice);
}

export async function getInvoice(id: string): Promise<InvoiceData | undefined> {
  const db = await getDB();
  return db.get(STORE_NAME, id);
}

export async function getAllInvoices(): Promise<InvoiceData[]> {
  const db = await getDB();
  const invoices = await db.getAll(STORE_NAME);

  return invoices.sort(
    (left, right) => new Date(right.createdAt).getTime() - new Date(left.createdAt).getTime()
  );
}

export async function deleteInvoice(id: string): Promise<void> {
  const db = await getDB();
  await db.delete(STORE_NAME, id);
}
