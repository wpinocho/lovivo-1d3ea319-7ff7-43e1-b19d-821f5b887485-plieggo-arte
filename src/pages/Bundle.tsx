import { useParams } from 'react-router-dom'
import { BundlePageUI } from './ui/BundlePageUI'
import { useBundle } from '@/hooks/useBundles'

/**
 * ROUTE COMPONENT - Bundle
 * Fetches bundle by slug and renders BundlePageUI.
 */
const Bundle = () => {
  const { slug } = useParams<{ slug: string }>()
  const { bundle, items, loading, notFound } = useBundle(slug)

  return <BundlePageUI bundle={bundle} items={items} loading={loading} notFound={notFound} />
}

export default Bundle