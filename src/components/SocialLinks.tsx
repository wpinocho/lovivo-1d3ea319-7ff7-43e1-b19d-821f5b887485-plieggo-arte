import { useSettings } from '@/contexts/SettingsContext'
import { resolvePlatform } from '@/lib/social-icons'

interface SocialLink {
  url: string
  platform: string
}

export const SocialLinks = () => {
  const { socialLinks } = useSettings()

  if (!socialLinks || !Array.isArray(socialLinks) || socialLinks.length === 0) {
    return null
  }

  const validLinks = socialLinks
    .filter((link: SocialLink) => link.url && link.platform)
    .map((link: SocialLink) => ({
      ...link,
      icon: resolvePlatform(link.platform)
    }))
    .filter(link => link.icon) // Only keep links with valid icons

  if (validLinks.length === 0) {
    return null
  }

  return (
    <div className="flex space-x-4">
      {validLinks.map((link, index) => (
        <a
          key={index}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Síguenos en ${link.icon.label}`}
          title={`Síguenos en ${link.icon.label}`}
          className="opacity-70 hover:opacity-100 transition-all duration-300 focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-secondary-foreground/50 rounded p-1 hover:scale-110"
        >
          <img
            src={link.icon.src}
            alt={link.icon.label}
            className="h-5 w-5 filter brightness-0 dark:invert"
            style={{
              filter: 'brightness(0) saturate(100%) invert(100%) sepia(0%) saturate(7500%) hue-rotate(0deg) brightness(100%) contrast(100%)'
            }}
          />
        </a>
      ))}
    </div>
  )
}