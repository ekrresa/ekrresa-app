import type { LayoutProps } from 'rwsdk/router'
import { MobileThemeToggle } from '../MobileThemeToggle'
import { PageIndexNav } from '../PageIndexNav'
import { ThemeProvider } from '../ThemeProvider'
import { ThemeToggle } from '../ThemeToggle'
import SocialLinks from './SocialLinks'

export default function AppLayout({ children, requestInfo }: LayoutProps) {
  const path = requestInfo?.path ?? '/'
  const theme = requestInfo?.ctx.theme ?? 'light'

  return (
    <ThemeProvider initialTheme={theme}>
      <div className="relative overflow-x-clip bg-ui-canvas text-ui-ink min-block-screen">
        <div className="pointer-events-none absolute inset-0">
          <div
            className="
              absolute -inset-s-56 -inset-bs-48 rounded-full bg-ui-accent/8 blur-3xl block-96 inline-96
            "
          />
          <div className="absolute inset-x-0 inset-bs-0 bg-ui-line block-px" />
        </div>

        <div
          className="mx-auto grid grid-cols-1 gap-8 p-5 pbe-24 max-inline-6xl
            sm:px-6 lg:grid-cols-[15rem_minmax(0,1fr)] lg:px-10 lg:py-8 lg:pbe-8 xl:px-16
          "
        >
          <aside className="hidden lg:sticky lg:inset-bs-8 lg:block lg:block-fit">
            <div className="rounded-3xl border border-ui-line bg-ui-surface p-5">
              <div className="mbe-6 border-be border-ui-line pbe-5">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <img
                      src="/icons/logo-light.svg"
                      alt="Ochuko Ekrresa logo"
                      className="shrink-0 block-8 inline-8 dark:hidden"
                    />
                    <img
                      src="/icons/logo-dark.svg"
                      alt="Ochuko Ekrresa logo"
                      className="hidden shrink-0 block-8 inline-8 dark:block"
                    />
                    <div className="min-inline-0">
                      <p
                        className="
                          text-[0.62rem] font-medium tracking-[0.3em] text-ui-muted
                          uppercase
                        "
                      >
                        Ochuko Ekrresa
                      </p>
                    </div>
                  </div>

                  <ThemeToggle />
                </div>

                <SocialLinks />
              </div>

              <PageIndexNav path={path} />
            </div>
          </aside>

          <div className="flex flex-col gap-40 min-inline-0">
            {children}

            <footer className="flex items-center justify-center border-bs border-ui-line pbs-2 pbe-4">
              <p className="text-[0.75rem] text-ui-muted/60 uppercase">
                &copy; {new Date().getFullYear()} Ochuko Ekrresa. All rights reserved.
              </p>
            </footer>
          </div>
        </div>

        <MobileThemeToggle />
      </div>
    </ThemeProvider>
  )
}
