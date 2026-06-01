'use client'

import { Briefcase, House, Menu, MoonStar, Newspaper, X, type LucideIcon } from 'lucide-react'
import * as React from 'react'

import { ThemeToggle } from './ThemeToggle'

interface MobileMenuItem {
  label: string
  href: string
  icon: LucideIcon
  isActive(path: string): boolean
}

interface MobileFabMenuProps {
  path: string
}

function isHomePath(path: string) {
  return path === '/'
}

function isArticlesPath(path: string) {
  return path === '/articles' || path.startsWith('/articles/')
}

function isProjectsPath() {
  return false
}

const mobileMenuItems: MobileMenuItem[] = [
  { label: 'Home', href: '/', icon: House, isActive: isHomePath },
  { label: 'Articles', href: '/articles', icon: Newspaper, isActive: isArticlesPath },
  { label: 'Projects', href: '/#projects', icon: Briefcase, isActive: isProjectsPath },
]

export function MobileFabMenu({ path }: MobileFabMenuProps) {
  const [isOpen, setIsOpen] = React.useState(false)
  const [isMenuMounted, setIsMenuMounted] = React.useState(false)
  const [isVisible, setIsVisible] = React.useState(true)
  const closeTimeoutRef = React.useRef<number | undefined>(undefined)
  const lastScrollYRef = React.useRef(0)
  const openTimeoutRef = React.useRef<number | undefined>(undefined)

  React.useEffect(() => {
    const nextScrollY = window.scrollY
    lastScrollYRef.current = nextScrollY

    const onScroll = () => {
      const currentScrollY = window.scrollY
      const scrollDelta = currentScrollY - lastScrollYRef.current

      if (currentScrollY < 24) {
        setIsVisible(true)
      } else if (scrollDelta > 8) {
        setIsVisible(false)
      } else if (scrollDelta < -8) {
        setIsVisible(true)
      }

      lastScrollYRef.current = currentScrollY
    }

    window.addEventListener('scroll', onScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  React.useEffect(() => {
    if (isOpen || !isMenuMounted) {
      return
    }

    closeTimeoutRef.current = window.setTimeout(() => {
      setIsMenuMounted(false)
    }, 520)

    return () => {
      window.clearTimeout(closeTimeoutRef.current)
    }
  }, [isMenuMounted, isOpen])

  React.useEffect(() => {
    return () => {
      if (closeTimeoutRef.current !== undefined) {
        window.clearTimeout(closeTimeoutRef.current)
      }

      if (openTimeoutRef.current !== undefined) {
        window.clearTimeout(openTimeoutRef.current)
      }
    }
  }, [])

  React.useEffect(() => {
    if (!isOpen) {
      return
    }

    setIsVisible(true)

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeMenu()
      }
    }

    document.addEventListener('keydown', onKeyDown)

    return () => {
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [isOpen])

  React.useEffect(() => {
    if (!isOpen) {
      return
    }

    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = originalOverflow
    }
  }, [isOpen])

  const closeMenu = () => {
    if (openTimeoutRef.current !== undefined) {
      window.clearTimeout(openTimeoutRef.current)
    }

    setIsOpen(false)
  }

  const openMenu = () => {
    window.clearTimeout(closeTimeoutRef.current)
    setIsVisible(true)
    setIsMenuMounted(true)

    openTimeoutRef.current = window.setTimeout(() => {
      setIsOpen(true)
    }, 20)
  }

  const toggleMenu = () => {
    if (isOpen) {
      closeMenu()
      return
    }

    openMenu()
  }

  const isFabVisible = isVisible || isOpen
  const getTransitionDelay = (step: number) => {
    return isOpen ? `${step}ms` : '0ms'
  }

  return (
    <div className="lg:hidden">
      <button
        aria-expanded={isOpen}
        aria-controls="mobile-site-menu"
        aria-label={isOpen ? 'Close menu' : 'Open menu'}
        className={`fixed bottom-[calc(env(safe-area-inset-bottom,0)+4rem)] right-6 z-40 inline-flex h-14 w-14 items-center justify-center rounded-full border border-black/10 bg-white/92 text-ink shadow-[0_20px_40px_rgba(24,21,17,0.18)] backdrop-blur-xl transition-all duration-700 ease-[cubic-bezier(0.19,1,0.22,1)] motion-reduce:transition-none dark:border-white/12 dark:bg-[#141b2d]/92 dark:text-white dark:shadow-[0_20px_48px_rgba(0,0,0,0.38)] ${
          isFabVisible
            ? 'translate-y-0 scale-100 opacity-100'
            : 'translate-y-[calc(100%+1.75rem)] scale-90 opacity-0 pointer-events-none'
        } ${isOpen ? 'shadow-[0_26px_56px_rgba(24,21,17,0.24)] dark:shadow-[0_28px_64px_rgba(0,0,0,0.5)]' : ''}`}
        onClick={toggleMenu}
        type="button"
      >
        <span className="sr-only">{isOpen ? 'Close menu' : 'Open menu'}</span>
        <span
          className={`absolute -inset-3 rounded-full bg-accent/18 blur-xl transition-all duration-700 ease-[cubic-bezier(0.19,1,0.22,1)] dark:bg-[#8fa0ea]/24 ${
            isOpen ? 'scale-100 opacity-100' : 'scale-70 opacity-0'
          }`}
        />
        <span
          className={`absolute inset-0 rounded-full bg-accent/12 transition-all duration-700 ease-[cubic-bezier(0.19,1,0.22,1)] dark:bg-[#8fa0ea]/18 ${
            isOpen ? 'scale-100 opacity-100' : 'scale-75 opacity-0'
          }`}
        />
        <span
          className={`relative transition-transform duration-700 ease-[cubic-bezier(0.19,1,0.22,1)] ${
            isOpen ? 'rotate-90 scale-[0.88]' : 'rotate-0 scale-100'
          }`}
        >
          {isOpen ? (
            <X className="size-5" strokeWidth={2.2} />
          ) : (
            <Menu className="size-5" strokeWidth={2.2} />
          )}
        </span>
      </button>

      {isMenuMounted ? (
        <>
          <div
            className={`fixed inset-0 z-30 bg-[#0c1220]/28 backdrop-blur-[6px] transition-all duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] motion-reduce:transition-none ${
              isOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
            }`}
            onClick={closeMenu}
          />

          <nav
            id="mobile-site-menu"
            aria-hidden={!isOpen}
            className={`fixed bottom-[calc(env(safe-area-inset-bottom,0)+8.5rem)] right-6 z-35 w-[min(calc(100vw-3rem),22rem)] origin-bottom-right overflow-hidden rounded-4xl border border-black/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.94),rgba(250,244,238,0.98))] p-3 shadow-[0_34px_100px_rgba(24,21,17,0.22)] ring-1 ring-white/55 backdrop-blur-2xl transition-all duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] motion-reduce:transition-none dark:border-white/10 dark:bg-[linear-gradient(180deg,rgba(23,30,47,0.96),rgba(13,18,30,0.99))] dark:ring-white/8 dark:shadow-[0_36px_110px_rgba(0,0,0,0.46)] ${
              isOpen
                ? 'translate-y-0 scale-100 rotate-0 opacity-100'
                : 'pointer-events-none translate-y-10 scale-[0.9] rotate-2 opacity-0'
            }`}
          >
            <div
              className={`pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-accent/16 blur-3xl transition-all duration-700 ease-[cubic-bezier(0.19,1,0.22,1)] dark:bg-[#8fa0ea]/18 ${
                isOpen ? 'scale-100 opacity-100' : 'scale-75 opacity-0'
              }`}
            />
            <div
              className={`pointer-events-none absolute -bottom-14 left-2 h-28 w-28 rounded-full bg-white/70 blur-3xl transition-all duration-700 ease-[cubic-bezier(0.19,1,0.22,1)] dark:bg-[#8fa0ea]/10 ${
                isOpen ? 'scale-100 opacity-100' : 'scale-75 opacity-0'
              }`}
            />
            <div className="space-y-2">
              {mobileMenuItems.map((item, index) => {
                const active = item.isActive(path)

                return (
                  <a
                    key={item.label}
                    href={item.href}
                    aria-current={active ? 'page' : undefined}
                    style={{ transitionDelay: getTransitionDelay(80 + index * 70) }}
                    className={`group relative flex items-center justify-between rounded-[1.4rem] border px-4 py-3.5 transition-all duration-700 ease-[cubic-bezier(0.19,1,0.22,1)] ${
                      active
                        ? 'border-black/12 bg-white text-ink shadow-[0_12px_30px_rgba(24,21,17,0.08)] dark:border-[#8fa0ea]/28 dark:bg-[#8fa0ea]/10 dark:text-white dark:shadow-[0_16px_36px_rgba(0,0,0,0.24)]'
                        : 'border-black/8 bg-white/62 text-ink hover:-translate-y-0.5 hover:border-black/14 hover:bg-white dark:border-white/8 dark:bg-white/6 dark:text-[#f3f6ff] dark:hover:border-[#8fa0ea]/28 dark:hover:bg-[#8fa0ea]/10'
                    } ${isOpen ? 'translate-y-0 scale-100 opacity-100' : 'translate-y-4 scale-[0.98] opacity-0'}`}
                    onClick={closeMenu}
                  >
                    <span className="flex items-center gap-3">
                      <span
                        className={`inline-flex h-10 w-10 items-center justify-center rounded-full border transition ${
                          active
                            ? 'border-black/12 bg-black/4 text-ink dark:border-[#8fa0ea]/35 dark:bg-[#8fa0ea]/16 dark:text-white'
                            : 'border-black/8 bg-white/78 text-muted group-hover:border-black/14 group-hover:text-ink dark:border-white/8 dark:bg-white/8 dark:text-muted dark:group-hover:border-[#8fa0ea]/35 dark:group-hover:bg-[#8fa0ea]/14 dark:group-hover:text-white'
                        }`}
                      >
                        <item.icon className="size-4" strokeWidth={1.9} />
                      </span>
                      <span className="text-sm font-medium">{item.label}</span>
                    </span>
                  </a>
                )
              })}
            </div>

            <div
              style={{ transitionDelay: getTransitionDelay(320) }}
              className={`relative mt-3 rounded-[1.4rem] border border-black/8 bg-white/58 px-4 py-3 transition-all duration-700 ease-[cubic-bezier(0.19,1,0.22,1)] dark:border-white/8 dark:bg-white/7 ${
                isOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 scale-[0.98] opacity-0'
              }`}
            >
              <div className="flex items-center justify-between gap-3">
                <span className="flex items-center gap-3">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-black/8 bg-white/72 text-muted dark:border-white/10 dark:bg-white/8 dark:text-[#c7d1e8]">
                    <MoonStar className="size-4" strokeWidth={1.9} />
                  </span>
                  <span>
                    <span className="block text-sm font-medium text-ink dark:text-white">
                      Theme
                    </span>
                    <span className="block text-xs text-muted">Toggle light or dark</span>
                  </span>
                </span>
                <ThemeToggle />
              </div>
            </div>
          </nav>
        </>
      ) : null}
    </div>
  )
}
