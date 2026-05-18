import { useEffect } from 'react'

interface SEOProps {
  title?: string
  description?: string
  canonicalPath?: string
  ogImage?: string
  ogType?: string
  storeName?: string
  jsonLd?: object | object[]
}

/**
 * SEO component — sets document.title, meta description, OG tags, and JSON-LD
 * scripts dynamically via useEffect (SPA-friendly, no extra deps needed).
 */
export function SEO({
  title,
  description,
  canonicalPath,
  ogImage,
  ogType = 'website',
  storeName,
  jsonLd,
}: SEOProps) {
  useEffect(() => {
    // --- Title ---
    if (title) {
      document.title = storeName ? `${title} — ${storeName}` : title
    }

    // --- Meta description ---
    setMeta('name', 'description', description ?? '')

    // --- Open Graph ---
    setMeta('property', 'og:title', title ?? '')
    setMeta('property', 'og:description', description ?? '')
    setMeta('property', 'og:type', ogType)
    if (ogImage) setMeta('property', 'og:image', ogImage)

    const canonical = canonicalPath
      ? `${window.location.origin}${canonicalPath}`
      : window.location.href
    setMeta('property', 'og:url', canonical)

    // --- Canonical link ---
    let link = document.querySelector<HTMLLinkElement>('link[rel="canonical"]')
    if (!link) {
      link = document.createElement('link')
      link.rel = 'canonical'
      document.head.appendChild(link)
    }
    link.href = canonical

    // --- JSON-LD ---
    // Remove any previously injected JSON-LD blocks
    document
      .querySelectorAll('script[data-seo-jsonld]')
      .forEach((el) => el.remove())

    const schemas = jsonLd
      ? Array.isArray(jsonLd)
        ? jsonLd
        : [jsonLd]
      : []

    schemas.forEach((schema, i) => {
      const script = document.createElement('script')
      script.type = 'application/ld+json'
      script.setAttribute('data-seo-jsonld', String(i))
      script.textContent = JSON.stringify(schema)
      document.head.appendChild(script)
    })

    // Cleanup JSON-LD on unmount
    return () => {
      document
        .querySelectorAll('script[data-seo-jsonld]')
        .forEach((el) => el.remove())
    }
  }, [title, description, canonicalPath, ogImage, ogType, storeName, JSON.stringify(jsonLd)])

  return null
}

/** Helper: upsert a <meta> tag by attribute selector */
function setMeta(attr: 'name' | 'property', key: string, content: string) {
  if (!content) return
  let el = document.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.content = content
}