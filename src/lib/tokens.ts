import { track } from "./analytics";

const STORAGE_KEY = "fys_wallet_v1";
const DAILY_FREE = 10;
const MAX_BALANCE = 9999;

export type Wallet = {
  balance: number;
  lastRefillISO: string;
  lifetimeEarned: number;
  lifetimeSpent: number;
  purchases: { sku: string; amount: number; atISO: string }[];
  receiptIds: string[];
};

type Listener = (w: Wallet) => void;
const listeners = new Set<Listener>();

function todayKey(iso?: string): string {
  const d = iso ? new Date(iso) : new Date();
  return d.toISOString().slice(0, 10);
}

function emptyWallet(): Wallet {
  return {
    balance: DAILY_FREE,
    lastRefillISO: new Date().toISOString(),
    lifetimeEarned: DAILY_FREE,
    lifetimeSpent: 0,
    purchases: [],
    receiptIds: [],
  };
}

function safeStorage(): Storage | null {
  try {
    if (typeof window === "undefined") return null;
    const s = window.localStorage;
    const probe = "__fys_probe__";
    s.setItem(probe, "1");
    s.removeItem(probe);
    return s;
  } catch {
    return null;
  }
}

function load(): Wallet {
  const s = safeStorage();
  if (!s) return emptyWallet();
  const raw = s.getItem(STORAGE_KEY);
  if (!raw) {
    const w = emptyWallet();
    s.setItem(STORAGE_KEY, JSON.stringify(w));
    return w;
  }
  try {
    const parsed = JSON.parse(raw) as Partial<Wallet>;
    const w: Wallet = {
      balance: clamp(parsed.balance ?? 0, 0, MAX_BALANCE),
      lastRefillISO:
        parsed.lastRefillISO ?? new Date(Date.now() - 86400000).toISOString(),
      lifetimeEarned: parsed.lifetimeEarned ?? 0,
      lifetimeSpent: parsed.lifetimeSpent ?? 0,
      purchases: Array.isArray(parsed.purchases) ? parsed.purchases : [],
      receiptIds: Array.isArray(parsed.receiptIds) ? parsed.receiptIds : [],
    };
    return refillIfNeeded(w);
  } catch {
    return emptyWallet();
  }
}

function save(w: Wallet): Wallet {
  const s = safeStorage();
  if (s) s.setItem(STORAGE_KEY, JSON.stringify(w));
  listeners.forEach((fn) => fn(w));
  return w;
}

function clamp(n: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, Math.round(n)));
}

function refillIfNeeded(w: Wallet): Wallet {
  if (todayKey(w.lastRefillISO) !== todayKey()) {
    const topped = clamp(Math.max(w.balance, DAILY_FREE), 0, MAX_BALANCE);
    const delta = topped - w.balance;
    const next: Wallet = {
      ...w,
      balance: topped,
      lastRefillISO: new Date().toISOString(),
      lifetimeEarned: w.lifetimeEarned + Math.max(0, delta),
    };
    return save(next);
  }
  return w;
}

export const tokens = {
  get(): Wallet {
    return refillIfNeeded(load());
  },

  subscribe(fn: Listener): () => void {
    listeners.add(fn);
    fn(tokens.get());
    return () => listeners.delete(fn);
  },

  canSpend(cost: number): boolean {
    return tokens.get().balance >= cost;
  },

  spend(cost: number, reason: string): boolean {
    const w = tokens.get();
    if (w.balance < cost) {
      track({ name: "tokens_spend_denied", params: { reason, cost } });
      return false;
    }
    const next: Wallet = {
      ...w,
      balance: clamp(w.balance - cost, 0, MAX_BALANCE),
      lifetimeSpent: w.lifetimeSpent + cost,
    };
    save(next);
    track({ name: "tokens_spend", params: { reason, cost } });
    return true;
  },

  reward(amount: number, reason: string): Wallet {
    const w = tokens.get();
    const next: Wallet = {
      ...w,
      balance: clamp(w.balance + amount, 0, MAX_BALANCE),
      lifetimeEarned: w.lifetimeEarned + amount,
    };
    save(next);
    track({ name: "tokens_reward", params: { reason, amount } });
    return next;
  },

  grantPack(sku: string, amount: number): Wallet {
    const w = tokens.get();
    const next: Wallet = {
      ...w,
      balance: clamp(w.balance + amount, 0, MAX_BALANCE),
      lifetimeEarned: w.lifetimeEarned + amount,
      purchases: [
        ...w.purchases,
        { sku, amount, atISO: new Date().toISOString() },
      ],
      receiptIds: w.receiptIds,
    };
    save(next);
    track({ name: "tokens_purchase", params: { sku, amount } });
    return next;
  },

  grantPackFromReceipt(
    sku: string,
    amount: number,
    receiptId: string
  ): { wallet: Wallet; granted: boolean } {
    const w = tokens.get();
    if (w.receiptIds.includes(receiptId)) {
      return { wallet: w, granted: false };
    }
    const next: Wallet = {
      ...w,
      balance: clamp(w.balance + amount, 0, MAX_BALANCE),
      lifetimeEarned: w.lifetimeEarned + amount,
      purchases: [
        ...w.purchases,
        { sku, amount, atISO: new Date().toISOString() },
      ],
      receiptIds: [...w.receiptIds, receiptId],
    };
    save(next);
    track({
      name: "tokens_purchase_verified",
      params: { sku, amount, receiptId },
    });
    return { wallet: next, granted: true };
  },

  reset(): Wallet {
    return save(emptyWallet());
  },
};

export const TOKEN_PACKS: {
  sku: string;
  name: string;
  tokens: number;
  priceUsd: number;
  tagline: string;
  popular?: boolean;
}[] = [
  {
    sku: "pack_starter",
    name: "Warm-up",
    tokens: 25,
    priceUsd: 2.99,
    tagline: "Dip your toe in the petty ocean.",
  },
  {
    sku: "pack_standard",
    name: "Unhinged Starter",
    tokens: 100,
    priceUsd: 7.99,
    tagline: "The sweet spot for casual chaos agents.",
    popular: true,
  },
  {
    sku: "pack_pro",
    name: "Professional Agent of Chaos",
    tokens: 300,
    priceUsd: 19.99,
    tagline: "You are the reason group chats go silent.",
  },
  {
    sku: "pack_whale",
    name: "The Full Meltdown",
    tokens: 1000,
    priceUsd: 49.99,
    tagline: "Touching grass is not for you.",
  },
];

export const FEATURE_COSTS = {
  roast: 1,
  prank_generate: 2,
  outrage_unlock: 0,
} as const;

export const DAILY_FREE_TOKENS = DAILY_FREE;
