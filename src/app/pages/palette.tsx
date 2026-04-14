import {
  COLOR_ROLE_ORDER,
  desertPalette,
  moonlightPalette,
  type ColorRole,
  type ThemePalette,
} from './color-palette-data.js'
import styles from './palette.module.css'

const ROLE_LABEL: Record<ColorRole, string> = {
  background: 'Background',
  heading: 'Heading',
  body: 'Paragraph',
  primary: 'Button',
  accent: 'Accent',
}

const ROLE_NOTE: Record<ColorRole, string> = {
  background: 'Page canvas and large surfaces',
  heading: 'Hero, section, and card headings',
  body: 'Paragraphs and supporting copy',
  primary: 'Buttons and strongest calls to action',
  accent: 'Highlights, tags, and small emphasis',
}

function contrastOnPrimary(hex: string): string {
  const n = parseInt(hex.slice(1), 16)
  const r = (n >> 16) & 255
  const g = (n >> 8) & 255
  const b = n & 255
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255
  return luminance > 0.55 ? '#1a1410' : '#faf8f5'
}

function ThemeColumn({ theme }: { theme: ThemePalette }) {
  const c = theme.colors
  const borderSubtle =
    theme.slug === 'desert' ? 'rgba(44, 36, 25, 0.12)' : 'rgba(220, 230, 245, 0.12)'

  return (
    <article className={styles.themeCard}>
      <header
        className={styles.themeHeader}
        style={{ backgroundColor: c.background, color: c.heading }}
      >
        <h2 className={styles.themeTitle}>{theme.title}</h2>
        <p className={styles.themeTagline} style={{ color: c.body }}>
          {theme.tagline}
        </p>
      </header>

      <div className={styles.swatches} style={{ backgroundColor: c.background, color: c.body }}>
        {COLOR_ROLE_ORDER.map(role => (
          <div
            key={role}
            className={styles.swatchCell}
            style={{
              borderColor: borderSubtle,
              backgroundColor:
                theme.slug === 'desert' ? 'rgba(255, 255, 255, 0.35)' : 'rgba(255, 255, 255, 0.04)',
            }}
          >
            <div
              className={styles.swatchBar}
              style={{ backgroundColor: c[role] }}
              title={c[role]}
            />
            <div className={styles.swatchMeta}>
              <p className={styles.swatchName}>{ROLE_LABEL[role]}</p>
              <p className={styles.swatchHex}>{c[role]}</p>
              <p className={styles.swatchNote}>{ROLE_NOTE[role]}</p>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.preview} style={{ backgroundColor: c.background, color: c.body }}>
        <p className={styles.previewLabel} style={{ color: c.accent }}>
          Preview
        </p>
        <div className={styles.previewInner} style={{ borderColor: borderSubtle }}>
          <h3 className={styles.previewTitle} style={{ color: c.heading }}>
            Heading colour
          </h3>
          <p className={styles.previewBody} style={{ color: c.body }}>
            Paragraph text sits softer than the heading, while the accent stays decorative and the
            primary button carries the strongest visual weight.
          </p>
          <div className={styles.previewActions}>
            <button
              type="button"
              className={styles.previewBtn}
              style={{ backgroundColor: c.primary, color: contrastOnPrimary(c.primary) }}
            >
              Primary
            </button>
            <span className={styles.previewChip} style={{ color: c.accent, borderColor: c.accent }}>
              Accent
            </span>
            <span className={styles.previewLink} style={{ color: c.primary }}>
              Link
            </span>
          </div>
        </div>
      </div>
    </article>
  )
}

export function PalettePage() {
  return (
    <div className={styles.page}>
      <div className={styles.wrap}>
        <header className={styles.intro}>
          <p className={styles.kicker}>Color direction</p>
          <h1 className={styles.title}>Desert days, moonlit nights</h1>
          <p className={styles.lede}>
            Five tokens per theme: background, heading, paragraph, button, and accent. Map them to
            CSS variables and swap with{' '}
            <code style={{ fontSize: '0.9em', opacity: 0.95 }}>prefers-color-scheme</code> or a
            class on <code style={{ fontSize: '0.9em' }}>&lt;html&gt;</code>.
          </p>
        </header>

        <div className={styles.grid}>
          <ThemeColumn theme={desertPalette} />
          <ThemeColumn theme={moonlightPalette} />
        </div>

        <footer className={styles.footer}>
          Open{' '}
          <a href="/palette" style={{ fontFamily: 'ui-monospace, monospace' }}>
            /palette
          </a>
          . Tokens:{' '}
          <code style={{ fontFamily: 'ui-monospace, monospace' }}>
            src/app/pages/color-palette-data.ts
          </code>
          .
        </footer>
      </div>
    </div>
  )
}
