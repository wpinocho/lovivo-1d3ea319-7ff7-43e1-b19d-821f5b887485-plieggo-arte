/**
 * JSON-LD structured data helpers for SEO
 */

/** Strip HTML tags and truncate to maxLength */
export function plainText(html: string | undefined | null, maxLength?: number): string {
  if (!html) return ''
  const text = html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim()
  if (maxLength && text.length > maxLength) {
    return text.slice(0, maxLength - 1).trimEnd() + '…'
  }
  return text
}

interface ProductJsonLdOptions {
  storeName?: string
  currencyCode?: string
  inStock?: boolean
  price?: number
  storeUrl?: string
}

/** Product schema.org/Product JSON-LD */
export function productJsonLd(product: any, opts: ProductJsonLdOptions = {}): object {
  const {
    storeName = 'Tienda',
    currencyCode = 'MXN',
    inStock = true,
    price,
    storeUrl = typeof window !== 'undefined' ? window.location.origin : '',
  } = opts

  const productPrice = price ?? product?.price ?? 0

  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product?.title ?? product?.name ?? '',
    description: plainText(product?.description, 500),
    image: product?.images?.[0] ?? product?.image ?? undefined,
    sku: product?.sku ?? product?.id ?? undefined,
    brand: {
      '@type': 'Brand',
      name: product?.vendor ?? storeName,
    },
    offers: {
      '@type': 'Offer',
      url: `${storeUrl}/productos/${product?.slug ?? ''}`,
      priceCurrency: currencyCode,
      price: productPrice,
      availability: inStock
        ? 'https://schema.org/InStock'
        : 'https://schema.org/OutOfStock',
      seller: {
        '@type': 'Organization',
        name: storeName,
      },
    },
  }
}

interface BreadcrumbItem {
  name: string
  path: string
}

/** BreadcrumbList JSON-LD */
export function breadcrumbJsonLd(
  items: BreadcrumbItem[],
  baseUrl?: string,
): object {
  const origin =
    baseUrl ?? (typeof window !== 'undefined' ? window.location.origin : '')

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${origin}${item.path}`,
    })),
  }
}