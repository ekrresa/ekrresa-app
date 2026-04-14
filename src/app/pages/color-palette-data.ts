export type ColorRole = 'background' | 'heading' | 'body' | 'primary' | 'accent'

export interface ThemePalette {
  slug: string
  title: string
  tagline: string
  colors: Record<ColorRole, string>
}

export const COLOR_ROLE_ORDER: readonly ColorRole[] = [
  'background',
  'heading',
  'body',
  'primary',
  'accent',
] as const

export const desertPalette: ThemePalette = {
  slug: 'desert',
  title: 'Arid desert',
  tagline: 'Sun-washed sand, date-brown type, adobe buttons, dusty sage accents.',
  colors: {
    background: '#f4eadb',
    heading: '#5b3b27',
    body: '#7b624d',
    primary: '#c46a3d',
    accent: '#8a9472',
  },
}

export const moonlightPalette: ThemePalette = {
  slug: 'moonlight',
  title: 'Moonlight',
  tagline:
    'Midnight canvas, silver headings, mist body copy, indigo buttons, lunar violet accents.',
  colors: {
    background: '#111726',
    heading: '#edf2ff',
    body: '#aab4cb',
    primary: '#7f90da',
    accent: '#b59ad6',
  },
}
