import type { Appearance } from '@stripe/stripe-js'

/**
 * Generates a Stripe Elements Appearance object that matches Plieggo's design system.
 * Reads CSS custom properties at runtime so it always stays in sync with index.css.
 */
export function getStripeAppearance(): Appearance {
  const style =
    typeof document !== 'undefined'
      ? getComputedStyle(document.documentElement)
      : null

  const get = (varName: string, fallback: string): string => {
    const val = style?.getPropertyValue(varName).trim()
    return val ? `hsl(${val})` : fallback
  }

  const borderVal = style?.getPropertyValue('--border').trim() || '216 20% 75%'

  return {
    theme: 'stripe',
    variables: {
      colorBackground: get('--background', '#F2EFE4'),
      colorText: get('--foreground', '#1B2A41'),
      colorPrimary: get('--primary', '#C16648'),
      colorDanger: get('--destructive', '#ef4444'),
      colorTextSecondary: get('--muted-foreground', '#3D536B'),
      colorTextPlaceholder: get('--muted-foreground', '#3D536B'),
      colorIconTab: get('--muted-foreground', '#3D536B'),
      colorIconTabSelected: get('--primary', '#C16648'),
      fontFamily: '"DM Sans", system-ui, -apple-system, sans-serif',
      fontSizeBase: '15px',
      borderRadius: '4px',
      spacingUnit: '4px',
    },
    rules: {
      '.Input': {
        backgroundColor: get('--background', '#F2EFE4'),
        border: `1px solid hsl(${borderVal})`,
        color: get('--foreground', '#1B2A41'),
        boxShadow: 'none',
        padding: '10px 12px',
      },
      '.Input:focus': {
        border: `1px solid ${get('--primary', '#C16648')}`,
        boxShadow: `0 0 0 2px ${get('--ring', '#C16648')}33`,
        outline: 'none',
      },
      '.Input--invalid': {
        border: `1px solid ${get('--destructive', '#ef4444')}`,
      },
      '.Label': {
        color: get('--foreground', '#1B2A41'),
        fontWeight: '500',
        fontSize: '13px',
        letterSpacing: '0.01em',
      },
      '.Tab': {
        backgroundColor: get('--muted', '#E6E3D8'),
        border: `1px solid hsl(${borderVal})`,
        color: get('--muted-foreground', '#3D536B'),
      },
      '.Tab:hover': {
        backgroundColor: get('--background', '#F2EFE4'),
        color: get('--foreground', '#1B2A41'),
      },
      '.Tab--selected': {
        backgroundColor: get('--background', '#F2EFE4'),
        borderColor: get('--primary', '#C16648'),
        color: get('--primary', '#C16648'),
        boxShadow: 'none',
      },
      '.Tab--selected:focus': {
        boxShadow: `0 0 0 2px ${get('--ring', '#C16648')}33`,
      },
      '.TabIcon--selected': {
        fill: get('--primary', '#C16648'),
      },
      '.TabLabel--selected': {
        color: get('--primary', '#C16648'),
      },
      '.Error': {
        color: get('--destructive', '#ef4444'),
        fontSize: '13px',
      },
      '.Block': {
        backgroundColor: get('--muted', '#E6E3D8'),
        borderColor: `hsl(${borderVal})`,
      },
      '.AccordionItem': {
        backgroundColor: get('--background', '#F2EFE4'),
        borderColor: `hsl(${borderVal})`,
      },
    },
  }
}