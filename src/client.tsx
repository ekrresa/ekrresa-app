import { initClient, initClientNavigation } from 'rwsdk/client'
import 'core-js/actual/array/to-sorted'
import { articleImageTransitionName } from '@/app/lib/view-transitions'

// RedwoodSDK uses RSC RPC to emulate client side navigation.
// https://docs.rwsdk.com/guides/frontend/client-side-nav/
let currentPath = window.location.pathname
let completeViewTransitionUpdate: (() => void) | undefined
let currentHistoryEntryIndex = window.navigation?.currentEntry?.index
let pendingNavigationType: NavigationType | null = null
let viewTransitionSequence = 0
let activeArticleTransitionSlug: string | undefined

function isArticlePage(path: string) {
  return /^\/articles\/[^/]+\/?$/.test(path)
}

function getRouteDepth(path: string) {
  if (isArticlePage(path)) {
    return 2
  }

  return path === '/' ? 0 : 1
}

function getArticleSlug(path: string) {
  return path.match(/^\/articles\/([^/]+)\/?$/)?.[1]
}

function scopeArticleTransitionImages(slug: string) {
  document.querySelectorAll<HTMLElement>('[data-article-transition-slug]').forEach(element => {
    element.style.viewTransitionName =
      element.dataset.articleTransitionSlug === slug ? articleImageTransitionName(slug) : 'none'
  })
}

function restoreArticleTransitionImages() {
  document.querySelectorAll<HTMLElement>('[data-article-transition-slug]').forEach(element => {
    const slug = element.dataset.articleTransitionSlug

    if (slug) {
      element.style.viewTransitionName = articleImageTransitionName(slug)
    }
  })
}

function beginRouteViewTransition() {
  const nextPath = window.location.pathname
  const nextHistoryEntryIndex = window.navigation?.currentEntry?.index
  const isBackward =
    pendingNavigationType === 'traverse' &&
    currentHistoryEntryIndex !== undefined &&
    nextHistoryEntryIndex !== undefined
      ? nextHistoryEntryIndex < currentHistoryEntryIndex
      : getRouteDepth(nextPath) < getRouteDepth(currentPath)

  pendingNavigationType = null
  currentHistoryEntryIndex = nextHistoryEntryIndex

  if (currentPath === nextPath) {
    return
  }

  const crossesArticleBoundary = isArticlePage(currentPath) !== isArticlePage(nextPath)
  const articleTransitionSlug = crossesArticleBoundary
    ? (getArticleSlug(nextPath) ?? getArticleSlug(currentPath))
    : undefined
  currentPath = nextPath

  if (
    !document.startViewTransition ||
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  ) {
    return
  }

  activeArticleTransitionSlug = articleTransitionSlug

  document.activeViewTransition?.skipTransition()
  completeViewTransitionUpdate?.()

  const transitionSequence = ++viewTransitionSequence
  document.documentElement.dataset.navigationDirection = isBackward ? 'backward' : 'forward'
  document.documentElement.dataset.articleTransition = crossesArticleBoundary ? 'true' : 'false'

  if (activeArticleTransitionSlug) {
    scopeArticleTransitionImages(activeArticleTransitionSlug)
  }

  let completeUpdate!: () => void
  const updateComplete = new Promise<void>(resolve => {
    completeUpdate = resolve
  })

  completeViewTransitionUpdate = completeUpdate

  const transition = document.startViewTransition(() => updateComplete)

  void transition.finished
    .catch(() => undefined)
    .finally(() => {
      if (viewTransitionSequence === transitionSequence) {
        delete document.documentElement.dataset.navigationDirection
        delete document.documentElement.dataset.articleTransition
        restoreArticleTransitionImages()
        activeArticleTransitionSlug = undefined
        completeViewTransitionUpdate = undefined
      }
    })
}

window.navigation?.addEventListener('currententrychange', event => {
  pendingNavigationType = event.navigationType
})

const navigation = initClientNavigation({ onNavigate: beginRouteViewTransition })
currentHistoryEntryIndex = window.navigation?.currentEntry?.index
pendingNavigationType = null

function handleHydrated(...args: Parameters<typeof navigation.onHydrated>) {
  navigation.onHydrated(...args)

  if (activeArticleTransitionSlug) {
    scopeArticleTransitionImages(activeArticleTransitionSlug)
  }

  completeViewTransitionUpdate?.()
  completeViewTransitionUpdate = undefined
}

function handleResponse(response: Response) {
  const shouldHydrate = navigation.handleResponse(response)

  if (!shouldHydrate) {
    completeViewTransitionUpdate?.()
    completeViewTransitionUpdate = undefined
    restoreArticleTransitionImages()
    activeArticleTransitionSlug = undefined
  }

  return shouldHydrate
}

initClient({ handleResponse, onHydrated: handleHydrated })
