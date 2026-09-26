/**
 * Tests del ciclo de vida de event_id (deduplicación Meta Pixel ↔ CAPI).
 *
 * Regla: el event_id identifica UNA OCURRENCIA del evento.
 *  - Distintas ocurrencias → IDs distintos (aunque sea el mismo producto / búsqueda).
 *  - Dentro de una ocurrencia → Pixel, CAPI y PostHog reciben EXACTAMENTE el mismo ID.
 *  - Solo Purchase (order_id) e InitiateCheckout (order_id, si existe) son idempotentes.
 *
 * Correr: npx vitest run src/lib/__tests__/tracking-utils.test.ts
 */
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

const mocks = vi.hoisted(() => ({
  pixelTrack: vi.fn(),
  pixelSearch: vi.fn(),
  callEdge: vi.fn(),
  posthogCapture: vi.fn(),
}));

vi.mock('@/lib/facebook-pixel', () => ({
  facebookPixel: {
    track: mocks.pixelTrack,
    search: mocks.pixelSearch,
    pageView: vi.fn(),
    lead: vi.fn(),
  },
}));
vi.mock('@/lib/edge', () => ({ callEdge: mocks.callEdge }));
vi.mock('@/lib/config', () => ({ STORE_ID: 'test-store' }));
vi.mock('posthog-js', () => ({
  default: { __loaded: true, capture: mocks.posthogCapture },
}));

import { tracking } from '@/lib/tracking-utils';

const PRODUCT_ID = '69708dfb-1714-40e2-843a-f84228ee6d5e';
const product = { id: PRODUCT_ID, name: 'Prisma Azul Coral', price: 4500 };
const baseParams = { products: [product], value: 4500, currency: 'MXN' };

// ID que recibió cada destino en la llamada N
const pixelId = (n: number) => mocks.pixelTrack.mock.calls[n][2] as string;
const capiId = (n: number) => mocks.callEdge.mock.calls[n][1].event_id as string;
const posthogId = (n: number) => mocks.posthogCapture.mock.calls[n][1].event_id as string;

beforeEach(() => {
  vi.clearAllMocks();
  mocks.callEdge.mockResolvedValue({});
  vi.stubGlobal('window', { location: { href: 'https://plieggo.com/products/prisma' } });
  tracking.setPixelData('pixel-123', 'fb.1.111.222', 'fb.1.333.fbclid');
});

afterEach(() => {
  vi.unstubAllGlobals();
});

describe('event_id — ViewContent', () => {
  it('A) dos ViewContent del MISMO producto generan event_id distintos', () => {
    tracking.trackViewContent(baseParams);
    tracking.trackViewContent(baseParams);

    expect(pixelId(0)).not.toBe(pixelId(1));
    expect(capiId(0)).not.toBe(capiId(1));
    // Nunca derivado del product_id
    expect(pixelId(0)).not.toContain(PRODUCT_ID);
    expect(pixelId(1)).not.toContain(PRODUCT_ID);
  });

  it('B) dentro de UN ViewContent, Pixel, CAPI y PostHog comparten el mismo event_id', () => {
    tracking.trackViewContent(baseParams);

    expect(mocks.pixelTrack).toHaveBeenCalledTimes(1);
    expect(mocks.callEdge).toHaveBeenCalledTimes(1);
    expect(mocks.pixelTrack.mock.calls[0][0]).toBe('ViewContent');
    expect(mocks.callEdge.mock.calls[0][1].event_name).toBe('ViewContent');

    expect(pixelId(0)).toMatch(/^viewcontent_/);
    expect(capiId(0)).toBe(pixelId(0));
    expect(posthogId(0)).toBe(pixelId(0));
  });
});

describe('event_id — AddToCart', () => {
  it('C) dos AddToCart del mismo producto generan IDs distintos (y Pixel = CAPI en cada uno)', () => {
    tracking.trackAddToCart({ ...baseParams, num_items: 1 });
    tracking.trackAddToCart({ ...baseParams, num_items: 1 });

    expect(pixelId(0)).not.toBe(pixelId(1));
    expect(pixelId(0)).not.toContain(PRODUCT_ID);
    expect(capiId(0)).toBe(pixelId(0));
    expect(capiId(1)).toBe(pixelId(1));
  });
});

describe('event_id — InitiateCheckout', () => {
  it('D) dos InitiateCheckout SIN order_id generan IDs distintos', () => {
    tracking.trackInitiateCheckout({ ...baseParams, num_items: 1 });
    tracking.trackInitiateCheckout({ ...baseParams, num_items: 1 });

    expect(pixelId(0)).not.toBe(pixelId(1));
    expect(pixelId(0)).not.toContain(PRODUCT_ID);
    expect(capiId(0)).toBe(pixelId(0));
    expect(capiId(1)).toBe(pixelId(1));
  });

  it('E) dos InitiateCheckout con el MISMO order_id generan el mismo event_id', () => {
    tracking.trackInitiateCheckout({ ...baseParams, num_items: 1, order_id: 'ord_abc' });
    tracking.trackInitiateCheckout({ ...baseParams, num_items: 1, order_id: 'ord_abc' });

    expect(pixelId(0)).toBe('initiatecheckout_ord_abc');
    expect(pixelId(1)).toBe(pixelId(0));
    expect(capiId(0)).toBe(pixelId(0));
    expect(capiId(1)).toBe(pixelId(0));
  });
});

describe('event_id — Purchase (sin cambios)', () => {
  it('F) dos Purchase con el MISMO order_id generan el mismo event_id', () => {
    tracking.trackPurchase({ ...baseParams, order_id: 'ord_xyz' });
    tracking.trackPurchase({ ...baseParams, order_id: 'ord_xyz' });

    expect(pixelId(0)).toBe('purchase_ord_xyz');
    expect(pixelId(1)).toBe(pixelId(0));
    expect(capiId(0)).toBe(pixelId(0));
    expect(capiId(1)).toBe(pixelId(0));
  });
});

describe('event_id — Search', () => {
  it('G) dos Search con el MISMO search_string generan IDs distintos (y Pixel = CAPI en cada uno)', () => {
    tracking.trackSearch({ search_string: 'acordeon beige' });
    tracking.trackSearch({ search_string: 'acordeon beige' });

    const px0 = mocks.pixelSearch.mock.calls[0][1] as string;
    const px1 = mocks.pixelSearch.mock.calls[1][1] as string;

    expect(px0).not.toBe(px1);
    expect(px0).not.toContain('acordeon');
    expect(capiId(0)).toBe(px0);
    expect(capiId(1)).toBe(px1);
    expect(posthogId(0)).toBe(px0);
  });
});

describe('H) sin regresiones en PostHog / CAPI user_data', () => {
  it('PostHog sigue recibiendo el evento con su nombre y el mismo event_id', () => {
    tracking.trackViewContent(baseParams);
    tracking.trackAddToCart({ ...baseParams, num_items: 1 });
    tracking.trackPurchase({ ...baseParams, order_id: 'ord_1' });

    const names = mocks.posthogCapture.mock.calls.map((c) => c[0]);
    expect(names).toEqual(['viewcontent', 'addtocart', 'purchase']);
    expect(posthogId(0)).toBe(pixelId(0));
    expect(posthogId(1)).toBe(pixelId(1));
    expect(posthogId(2)).toBe('purchase_ord_1');
  });

  it('CAPI sigue enviando fbp / fbc sin cambios', () => {
    tracking.trackViewContent(baseParams);
    const userData = mocks.callEdge.mock.calls[0][1].user_data;
    expect(userData.fbp).toBe('fb.1.111.222');
    expect(userData.fbc).toBe('fb.1.333.fbclid');
  });

  it('trackInternal va solo a PostHog, nunca a Pixel ni CAPI', () => {
    tracking.trackInternal('checkout_pay_clicked', { value: 4500 });
    expect(mocks.posthogCapture).toHaveBeenCalledTimes(1);
    expect(mocks.pixelTrack).not.toHaveBeenCalled();
    expect(mocks.callEdge).not.toHaveBeenCalled();
  });

  it('se envía a Meta sin importar la fuente de tráfico (sin filtro por UTM)', () => {
    vi.stubGlobal('window', {
      location: { href: 'https://plieggo.com/products/prisma?utm_source=google&utm_medium=cpc' },
    });
    tracking.trackViewContent(baseParams);
    expect(mocks.pixelTrack).toHaveBeenCalledTimes(1);
    expect(mocks.callEdge).toHaveBeenCalledTimes(1);
  });
});