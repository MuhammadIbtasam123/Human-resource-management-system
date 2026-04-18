export type ThemeTokens = {
  colors: {
    text: string
    textHeading: string
    bg: string
    border: string
    codeBg: string
    accent: string
    accentBg: string
    accentBorder: string
    socialBg: string
  }
  shadows: {
    card: string
  }
  fonts: {
    sans: string
    heading: string
    mono: string
  }
}

/** Flat CSS variable name for each token path */
export const CSS_VARS: Record<string, string> = {
  'colors.text':         '--color-text',
  'colors.textHeading':  '--color-text-heading',
  'colors.bg':           '--color-bg',
  'colors.border':       '--color-border',
  'colors.codeBg':       '--color-code-bg',
  'colors.accent':       '--color-accent',
  'colors.accentBg':     '--color-accent-bg',
  'colors.accentBorder': '--color-accent-border',
  'colors.socialBg':     '--color-social-bg',
  'shadows.card':        '--shadow-card',
  'fonts.sans':          '--font-sans',
  'fonts.heading':       '--font-heading',
  'fonts.mono':          '--font-mono',
}

/** Flatten a ThemeTokens object into { cssVar: value } pairs */
export function flattenTokens(tokens: ThemeTokens): Record<string, string> {
  const result: Record<string, string> = {}
  for (const [path, cssVar] of Object.entries(CSS_VARS)) {
    const [group, key] = path.split('.') as [keyof ThemeTokens, string]
    result[cssVar] = (tokens[group] as Record<string, string>)[key]
  }
  return result
}
