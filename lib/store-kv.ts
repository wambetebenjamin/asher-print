import type { QuoteItemInput } from "@/lib/schemas";

export type StoredQuote = {
  ref: string;
  createdAt: string;
  name: string;
  company: string;
  phone: string;
  email: string;
  deliveryAddress: string;
  turnaround: string;
  items: QuoteItemInput[];
  total: number;
  status: string;
};

export type StoredUser = {
  id: string;
  name: string;
  email: string;
  phone: string;
  passwordHash: string;
  createdAt: string;
};

/**
 * Storage abstraction. Uses Vercel KV when KV_REST_API_URL and
 * KV_REST_API_TOKEN are set, and falls back to in memory maps for local
 * development and preview so the full flow still works end to end.
 */
const memoryQuotes = new Map<string, StoredQuote>();
const memoryUsers = new Map<string, StoredUser>();

function kvConfigured(): boolean {
  return Boolean(process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN);
}

async function kvClient() {
  const mod = await import("@vercel/kv");
  return mod.kv;
}

export async function saveQuote(quote: StoredQuote): Promise<void> {
  if (kvConfigured()) {
    try {
      const kv = await kvClient();
      await kv.set(`quote:${quote.ref}`, quote);
      return;
    } catch {
      // Fall through to memory so a quote is never lost silently.
    }
  }
  memoryQuotes.set(quote.ref, quote);
}

export async function getQuote(ref: string): Promise<StoredQuote | null> {
  if (kvConfigured()) {
    try {
      const kv = await kvClient();
      const found = await kv.get<StoredQuote>(`quote:${ref}`);
      if (found) return found;
    } catch {
      // Fall through to memory.
    }
  }
  return memoryQuotes.get(ref) ?? null;
}

export async function saveUser(user: StoredUser): Promise<void> {
  if (kvConfigured()) {
    try {
      const kv = await kvClient();
      await kv.set(`user:${user.email.toLowerCase()}`, user);
      return;
    } catch {
      // Fall through to memory.
    }
  }
  memoryUsers.set(user.email.toLowerCase(), user);
}

export async function getUser(email: string): Promise<StoredUser | null> {
  if (kvConfigured()) {
    try {
      const kv = await kvClient();
      const found = await kv.get<StoredUser>(`user:${email.toLowerCase()}`);
      if (found) return found;
    } catch {
      // Fall through to memory.
    }
  }
  return memoryUsers.get(email.toLowerCase()) ?? null;
}

export function newQuoteRef(): string {
  const year = new Date().getFullYear();
  const rand = Math.floor(1000 + Math.random() * 9000);
  return `AP-${year}-${rand}`;
}
