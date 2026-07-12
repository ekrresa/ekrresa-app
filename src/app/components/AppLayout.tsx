import type { LayoutProps } from 'rwsdk/router'
import { siteMetadata } from '../lib/utils'
import { MobileThemeToggle } from './MobileThemeToggle'
import { PageIndexNav } from './PageIndexNav'
import { ThemeProvider } from './ThemeProvider'
import { ThemeToggle } from './ThemeToggle'

function GitHubIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="fill-current block-4 inline-4">
      <path d="M12 1.5C6.201 1.5 1.5 6.29 1.5 12.198c0 4.726 3.01 8.734 7.186 10.148.525.1.714-.232.714-.516 0-.255-.009-.93-.014-1.825-2.923.651-3.54-1.444-3.54-1.444-.477-1.245-1.166-1.576-1.166-1.576-.953-.666.072-.653.072-.653 1.054.076 1.608 1.112 1.608 1.112.937 1.647 2.458 1.171 3.058.895.095-.696.366-1.171.666-1.44-2.333-.273-4.785-1.188-4.785-5.287 0-1.168.408-2.123 1.077-2.872-.108-.273-.467-1.374.102-2.864 0 0 .879-.288 2.88 1.097A9.837 9.837 0 0 1 12 6.366c.867.004 1.74.12 2.556.352 1.998-1.385 2.876-1.097 2.876-1.097.571 1.49.212 2.59.104 2.864.671.749 1.074 1.704 1.074 2.872 0 4.11-2.457 5.01-4.798 5.278.376.333.711.99.711 1.995 0 1.44-.013 2.602-.013 2.955 0 .286.185.621.72.515 4.172-1.417 7.178-5.423 7.178-10.146C22.5 6.29 17.799 1.5 12 1.5Z" />
    </svg>
  )
}

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="fill-current block-4 inline-4">
      <path d="M4.983 3.5A1.983 1.983 0 1 0 5 7.466 1.983 1.983 0 0 0 4.983 3.5ZM3.75 8.983h2.467V20.5H3.75V8.983ZM10.117 8.983H12.5v1.572h.034c.331-.63 1.142-1.295 2.352-1.295 2.516 0 2.981 1.69 2.981 3.89V20.5H15.4v-6.51c0-1.552-.028-3.548-2.114-3.548-2.117 0-2.442 1.688-2.442 3.435V20.5h-2.467V8.983h1.74Z" />
    </svg>
  )
}

function TwitterIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="fill-current block-4 inline-4">
      <path d="M18.9 2.25h3.374l-7.371 8.425L23.5 21.75h-6.73l-5.27-6.886-6.024 6.886H2.1l7.883-9.007L1.75 2.25h6.9l4.763 6.292L18.9 2.25Zm-1.182 17.52h1.87L7.643 4.127H5.637L17.718 19.77Z" />
    </svg>
  )
}

function SocialLinks({ className }: { className?: string }) {
  return (
    <div className={className}>
      {socialLinks.map(link => (
        <a
          key={link.label}
          href={link.href}
          target="_blank"
          rel="noreferrer"
          aria-label={link.label}
          className="
            inline-flex items-center justify-center rounded-full border border-ui-line bg-ui-surface
            text-ui-muted transition block-10 inline-10 hover:border-ui-accent hover:text-ui-accent
          "
        >
          {link.icon}
        </a>
      ))}
    </div>
  )
}

const socialLinks = [
  { href: siteMetadata.github, label: 'GitHub', icon: <GitHubIcon /> },
  { href: siteMetadata.linkedin, label: 'LinkedIn', icon: <LinkedInIcon /> },
  { href: siteMetadata.twitter, label: 'Twitter', icon: <TwitterIcon /> },
]

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

                <SocialLinks className="mbs-6 flex items-center gap-2" />
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
