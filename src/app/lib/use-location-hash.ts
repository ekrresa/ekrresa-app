'use client'

import * as React from 'react'

export function useLocationHash() {
  const [hash, setHash] = React.useState('')

  React.useEffect(() => {
    const sync = () => setHash(window.location.hash)

    sync()
    window.addEventListener('hashchange', sync)
    window.addEventListener('popstate', sync)

    // ponytail: rwsdk client nav uses pushState and does not fire hashchange
    const { pushState, replaceState } = history
    history.pushState = (...args) => {
      pushState.apply(history, args)
      sync()
    }
    history.replaceState = (...args) => {
      replaceState.apply(history, args)
      sync()
    }

    return () => {
      window.removeEventListener('hashchange', sync)
      window.removeEventListener('popstate', sync)
      history.pushState = pushState
      history.replaceState = replaceState
    }
  }, [])

  return hash
}
