# Theming System

Dynamic theming via CSS custom properties + React Context. Zero extra dependencies.

---

## How It Works

On mount, `ThemeProvider` reads the user's saved preference from `localStorage` (key: `hrm-theme`), falls back to the OS `prefers-color-scheme`, then writes all design tokens as CSS custom properties onto `document.documentElement`. Every component consumes tokens through CSS variables — no JS needed in component files.

```
ThemeProvider (mount)
  └─ read localStorage('hrm-theme')
       └─ fallback: matchMedia('prefers-color-scheme: dark')
            └─ applyTheme(tokens) → setProperty on :root
```

---

## File Map

```
client/src/theme/
├── tokens.ts          ThemeTokens type + CSS_VARS map + flattenTokens()
├── themes.ts          lightTheme, darkTheme, createTheme()
├── ThemeProvider.tsx  Context + applyTheme + Provider
└── useTheme.ts        { themeName, setTheme, toggleTheme }
```

---

## Design Tokens

| Token path | CSS variable | Light value | Dark value |
|---|---|---|---|
| `colors.text` | `--color-text` | `#6b6375` | `#9ca3af` |
| `colors.textHeading` | `--color-text-heading` | `#08060d` | `#f3f4f6` |
| `colors.bg` | `--color-bg` | `#fff` | `#16171d` |
| `colors.border` | `--color-border` | `#e5e4e7` | `#2e303a` |
| `colors.codeBg` | `--color-code-bg` | `#f4f3ec` | `#1f2028` |
| `colors.accent` | `--color-accent` | `#aa3bff` | `#c084fc` |
| `colors.accentBg` | `--color-accent-bg` | `rgba(170,59,255,0.1)` | `rgba(192,132,252,0.15)` |
| `colors.accentBorder` | `--color-accent-border` | `rgba(170,59,255,0.5)` | `rgba(192,132,252,0.5)` |
| `colors.socialBg` | `--color-social-bg` | `rgba(244,243,236,0.5)` | `rgba(47,48,58,0.5)` |
| `shadows.card` | `--shadow-card` | light shadow | dark shadow |
| `fonts.sans` | `--font-sans` | system-ui stack | same |
| `fonts.heading` | `--font-heading` | system-ui stack | same |
| `fonts.mono` | `--font-mono` | ui-monospace stack | same |

---

## Usage in CSS

Reference tokens via CSS variables — never hardcode colors:

```css
.card {
  background: var(--color-bg);
  border: 1px solid var(--color-border);
  box-shadow: var(--shadow-card);
  color: var(--color-text);
}

.button-primary {
  background: var(--color-accent);
  font-family: var(--font-sans);
}
```

---

## Usage in Components

```tsx
import { useTheme } from '@/theme/useTheme'

function ThemeToggle() {
  const { themeName, toggleTheme } = useTheme()
  return (
    <button onClick={toggleTheme}>
      {themeName === 'light' ? '🌙 Dark' : '☀️ Light'}
    </button>
  )
}
```

---

## Per-Organization Themes (Multi-tenancy)

After login, apply the org's brand colors over a base theme:

```ts
import { createTheme } from '@/theme/themes'
import { useTheme } from '@/theme/useTheme'

const { setTheme } = useTheme()

// Called after fetching org settings from the API
function applyOrgBranding(orgSettings: { accentColor?: string }) {
  const orgTheme = createTheme('light', {
    colors: { accent: orgSettings.accentColor ?? '#aa3bff' },
  })
  setTheme(orgTheme)
}
```

`createTheme(base, overrides)` does a deep merge — only the keys you pass are overridden.

---

## Adding a New Token

1. Add the field to `ThemeTokens` in `tokens.ts`
2. Add the CSS var name to `CSS_VARS` in `tokens.ts`
3. Add the value to `lightTheme` and `darkTheme` in `themes.ts`
4. Use `var(--your-new-var)` in CSS

No other changes needed — `flattenTokens()` and `ThemeProvider` pick it up automatically.
