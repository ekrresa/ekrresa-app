import type { LayoutProps } from 'rwsdk/router'
import { ThemeProvider } from './ThemeProvider'

export default function AppLayout({ children, requestInfo }: LayoutProps) {
  const path = requestInfo?.path ?? '/'
  const theme = requestInfo?.ctx.theme ?? 'light'

  return <ThemeProvider initialTheme={theme}>{children}</ThemeProvider>
}
