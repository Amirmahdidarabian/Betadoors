'use client';

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import type {
  AuditLogEntry,
  BrandSettings,
  CartItem,
  CmsPageRecord,
  EnquirySubmission,
  ManualDownloadItem,
  OrderRecord,
  RedirectRule,
  ServiceRegistrationSubmission,
  ShopProduct,
  StaffRole,
  WarrantySubmission,
} from '@/lib/types';
import {
  INITIAL_AUDIT_LOG,
  INITIAL_BRAND_SETTINGS,
  INITIAL_ENQUIRIES,
  INITIAL_MANUALS,
  INITIAL_ORDERS,
  INITIAL_PAGES,
  INITIAL_REDIRECTS,
  INITIAL_SERVICE_REGISTRATIONS,
  INITIAL_SHOP_PRODUCTS,
  INITIAL_WARRANTIES,
} from '@/lib/seed-data';
import { calculateCartTotals, resolveProductPurchase } from '@/lib/domain-logic';

interface ActiveActor {
  role: StaffRole;
  email: string;
  userId: string | null;
  displayName: string;
}

export const DEMO_ACTORS: Record<string, ActiveActor> = {
  administrator: {
    role: 'administrator',
    email: 'admin@betadoors.com.au',
    userId: 'staff_admin_1',
    displayName: 'Site Administrator (Full Access)',
  },
  content_editor: {
    role: 'content_editor',
    email: 'editor@betadoors.com.au',
    userId: 'staff_editor_1',
    displayName: 'Content Editor (CMS & Media Only)',
  },
  shop_manager: {
    role: 'shop_manager',
    email: 'shop@betadoors.com.au',
    userId: 'staff_shop_1',
    displayName: 'Shop Manager (Products & Orders Only)',
  },
  support_staff: {
    role: 'support_staff',
    email: 'support@betadoors.com.au',
    userId: 'staff_support_1',
    displayName: 'Support Staff (Enquiries & Private Proofs)',
  },
  customer_alice: {
    role: 'customer',
    email: 'alice.walker@example.com.au',
    userId: 'cust_alice',
    displayName: 'Alice Walker (Customer A)',
  },
  customer_bob: {
    role: 'customer',
    email: 'bob.mitchell@example.com.au',
    userId: 'cust_bob',
    displayName: 'Bob Mitchell (Customer B)',
  },
  guest: {
    role: 'guest',
    email: 'guest@local',
    userId: null,
    displayName: 'Public Guest Visitor',
  },
};

interface BetaDoorsContextValue {
  brand: BrandSettings;
  pages: CmsPageRecord[];
  products: ShopProduct[];
  manuals: ManualDownloadItem[];
  redirects: RedirectRule[];
  orders: OrderRecord[];
  enquiries: EnquirySubmission[];
  warranties: WarrantySubmission[];
  serviceRegistrations: ServiceRegistrationSubmission[];
  auditLog: AuditLogEntry[];
  cart: CartItem[];
  cartTotals: ReturnType<typeof calculateCartTotals>;
  actor: ActiveActor;
  actorKey: string;
  setActorKey: (key: string) => void;
  addToCart: (
    product: ShopProduct,
    variantLabel: string | null,
    quantity: number
  ) => { ok: true } | { ok: false; error: string };
  updateCartQuantity: (
    productId: string,
    variantLabel: string | null,
    quantity: number
  ) => void;
  removeFromCart: (productId: string, variantLabel: string | null) => void;
  clearCart: () => void;
  refreshState: (previewToken?: string | null) => Promise<void>;
  mutateServer: (
    action: string,
    data?: Record<string, unknown>,
    extra?: Record<string, unknown>
  ) => Promise<{ ok: boolean; [key: string]: unknown }>;
  isLoading: boolean;
}

const BetaDoorsContext = createContext<BetaDoorsContextValue | null>(null);

const CART_STORAGE_KEY = 'betadoors_sandbox_cart_v1';
const ACTOR_STORAGE_KEY = 'betadoors_sandbox_actor_v1';

export function BetaDoorsProvider({ children }: { children: React.ReactNode }) {
  const [brand, setBrand] = useState<BrandSettings>(INITIAL_BRAND_SETTINGS);
  const [pages, setPages] = useState<CmsPageRecord[]>(INITIAL_PAGES);
  const [products, setProducts] = useState<ShopProduct[]>(INITIAL_SHOP_PRODUCTS);
  const [manuals, setManuals] = useState<ManualDownloadItem[]>(INITIAL_MANUALS);
  const [redirects, setRedirects] = useState<RedirectRule[]>(INITIAL_REDIRECTS);
  const [orders, setOrders] = useState<OrderRecord[]>(INITIAL_ORDERS);
  const [enquiries, setEnquiries] = useState<EnquirySubmission[]>(INITIAL_ENQUIRIES);
  const [warranties, setWarranties] = useState<WarrantySubmission[]>(INITIAL_WARRANTIES);
  const [serviceRegistrations, setServiceRegistrations] = useState<
    ServiceRegistrationSubmission[]
  >(INITIAL_SERVICE_REGISTRATIONS);
  const [auditLog, setAuditLog] = useState<AuditLogEntry[]>(INITIAL_AUDIT_LOG);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [actorKey, setActorKeyState] = useState<string>('administrator');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const actor = DEMO_ACTORS[actorKey] || DEMO_ACTORS.guest;

  const setActorKey = useCallback((key: string) => {
    if (!DEMO_ACTORS[key]) return;
    setActorKeyState(key);
    try {
      window.localStorage.setItem(ACTOR_STORAGE_KEY, key);
    } catch {
      // ignore
    }
  }, []);

  const refreshState = useCallback(
    async (previewToken?: string | null) => {
      try {
        await Promise.resolve();
        setIsLoading(true);
        const currentActor = DEMO_ACTORS[actorKey] || DEMO_ACTORS.guest;
        const qs = previewToken ? `?previewToken=${encodeURIComponent(previewToken)}` : '';
        const res = await fetch(`/api/state${qs}`, {
          headers: {
            'x-beta-role': currentActor.role,
            'x-beta-email': currentActor.email,
            'x-beta-user-id': currentActor.userId || '',
          },
          cache: 'no-store',
        });
        if (!res.ok) return;
        const json = await res.json();
        if (json.brand) setBrand(json.brand);
        if (Array.isArray(json.pages)) setPages(json.pages);
        if (Array.isArray(json.products)) setProducts(json.products);
        if (Array.isArray(json.manuals)) setManuals(json.manuals);
        if (Array.isArray(json.redirects)) setRedirects(json.redirects);
        if (Array.isArray(json.orders)) setOrders(json.orders);
        if (Array.isArray(json.enquiries)) setEnquiries(json.enquiries);
        if (Array.isArray(json.warranties)) setWarranties(json.warranties);
        if (Array.isArray(json.serviceRegistrations)) {
          setServiceRegistrations(json.serviceRegistrations);
        }
        if (Array.isArray(json.auditLog)) setAuditLog(json.auditLog);
      } catch {
        // fallback to initial state if offline
      } finally {
        setIsLoading(false);
      }
    },
    [actorKey]
  );

  useEffect(() => {
    const timer = window.setTimeout(() => {
      try {
        const savedCart = window.localStorage.getItem(CART_STORAGE_KEY);
        if (savedCart) {
          const parsed = JSON.parse(savedCart);
          if (Array.isArray(parsed)) setCart(parsed);
        }
        const savedActor = window.localStorage.getItem(ACTOR_STORAGE_KEY);
        if (savedActor && DEMO_ACTORS[savedActor]) {
          setActorKeyState(savedActor);
        }
      } catch {
        // ignore storage errors
      }
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    let active = true;
    const timer = window.setTimeout(() => {
      if (active) void refreshState();
    }, 0);
    return () => {
      active = false;
      window.clearTimeout(timer);
    };
  }, [refreshState]);

  const persistCart = useCallback((nextCart: CartItem[]) => {
    setCart(nextCart);
    try {
      window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(nextCart));
    } catch {
      // ignore
    }
  }, []);

  const addToCart = useCallback(
    (product: ShopProduct, variantLabel: string | null, quantity: number) => {
      const check = resolveProductPurchase(product, variantLabel, quantity);
      if (!check.ok) {
        return check;
      }

      const nextCart = [...cart];
      const existingIndex = nextCart.findIndex(
        (item) =>
          item.productId === product.id &&
          item.variantLabel === check.resolvedVariantLabel
      );

      if (existingIndex >= 0) {
        nextCart[existingIndex] = {
          ...nextCart[existingIndex],
          quantity: Math.min(20, nextCart[existingIndex].quantity + quantity),
          unitPriceCents: check.unitPriceCents,
        };
      } else {
        nextCart.push({
          productId: product.id,
          productSlug: product.slug,
          name: product.name,
          variantLabel: check.resolvedVariantLabel,
          sku: check.sku,
          unitPriceCents: check.unitPriceCents,
          quantity,
        });
      }

      persistCart(nextCart);
      return { ok: true as const };
    },
    [cart, persistCart]
  );

  const updateCartQuantity = useCallback(
    (productId: string, variantLabel: string | null, quantity: number) => {
      if (quantity <= 0) {
        const filtered = cart.filter(
          (i) => !(i.productId === productId && i.variantLabel === variantLabel)
        );
        persistCart(filtered);
        return;
      }
      const updated = cart.map((i) =>
        i.productId === productId && i.variantLabel === variantLabel
          ? { ...i, quantity: Math.min(20, quantity) }
          : i
      );
      persistCart(updated);
    },
    [cart, persistCart]
  );

  const removeFromCart = useCallback(
    (productId: string, variantLabel: string | null) => {
      const filtered = cart.filter(
        (i) => !(i.productId === productId && i.variantLabel === variantLabel)
      );
      persistCart(filtered);
    },
    [cart, persistCart]
  );

  const clearCart = useCallback(() => {
    persistCart([]);
  }, [persistCart]);

  const mutateServer = useCallback(
    async (
      action: string,
      data?: Record<string, unknown>,
      extra?: Record<string, unknown>
    ) => {
      const currentActor = DEMO_ACTORS[actorKey] || DEMO_ACTORS.guest;
      const res = await fetch('/api/state', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-beta-role': currentActor.role,
          'x-beta-email': currentActor.email,
          'x-beta-user-id': currentActor.userId || '',
        },
        body: JSON.stringify({
          action,
          data,
          actor: currentActor,
          ...(extra || {}),
        }),
      });
      const json = await res.json();
      await refreshState();
      return json;
    },
    [actorKey, refreshState]
  );

  const cartTotals = calculateCartTotals(cart);

  return (
    <BetaDoorsContext.Provider
      value={{
        brand,
        pages,
        products,
        manuals,
        redirects,
        orders,
        enquiries,
        warranties,
        serviceRegistrations,
        auditLog,
        cart,
        cartTotals,
        actor,
        actorKey,
        setActorKey,
        addToCart,
        updateCartQuantity,
        removeFromCart,
        clearCart,
        refreshState,
        mutateServer,
        isLoading,
      }}
    >
      {children}
    </BetaDoorsContext.Provider>
  );
}

export function useBetaDoors() {
  const ctx = useContext(BetaDoorsContext);
  if (!ctx) {
    throw new Error('useBetaDoors must be used inside BetaDoorsProvider');
  }
  return ctx;
}
