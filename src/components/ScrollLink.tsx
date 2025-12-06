import { Link } from 'react-router-dom'

interface ScrollLinkProps {
  to: string
  className?: string
  children: React.ReactNode
}

export const ScrollLink = ({ to, className, children }: ScrollLinkProps) => {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // Check if we're linking to an anchor on the same page
    const [path, hash] = to.split('#')
    
    if (hash && (path === '/' || path === '')) {
      e.preventDefault()
      
      // If we're not on the home page, navigate there first
      if (window.location.pathname !== '/') {
        window.location.href = to
        return
      }
      
      // Scroll to the element
      const element = document.getElementById(hash)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }
  }

  return (
    <Link to={to} className={className} onClick={handleClick}>
      {children}
    </Link>
  )
}