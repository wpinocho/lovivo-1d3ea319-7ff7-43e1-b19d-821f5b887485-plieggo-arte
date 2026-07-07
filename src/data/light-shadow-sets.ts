/**
 * Sets reales de "Arte vivo" (LightShadowFeature) por producto.
 *
 * Cada set son 3 fotos de la MISMA pieza en el MISMO cuarto y encuadre,
 * cambiando solo la luz y las sombras a lo largo del día. El orden debe
 * mapear a los captions del componente: [mañana, media tarde, atardecer].
 *
 * Solo se define para los best-sellers. Los productos sin set caen al
 * comportamiento por defecto (galería del producto).
 */

const STORAGE =
  "https://ptgmltivisbtvmoxwnhd.supabase.co/storage/v1/object/public"
const PRODUCTS = `${STORAGE}/product-images/1d3ea319-7ff7-43e1-b19d-821f5b887485`
const UPLOADS = `${STORAGE}/message-images/4458f31d-5a9f-4d50-99f1-6fc5a910bd6a`

export const LIGHT_SHADOW_SETS: Record<string, string[]> = {
  "acorden-beige-sutil": [
    `${PRODUCTS}/beige-sutil-manana.webp`,
    `${UPLOADS}/1783465455514-erl7cp2ex7h.webp`,
    `${PRODUCTS}/beige-sutil-atardecer.webp`,
  ],
  "verde-salvia": [
    `${PRODUCTS}/verde-salvia-manana.webp`,
    `${UPLOADS}/1783465455514-6789ry46yfb.webp`,
    `${PRODUCTS}/verde-salvia-atardecer.webp`,
  ],
}

export const getLightShadowSet = (slug?: string): string[] | undefined =>
  slug ? LIGHT_SHADOW_SETS[slug] : undefined