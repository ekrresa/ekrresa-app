'use client'

import { AnimatePresence, motion } from 'motion/react'
import { useState } from 'react'
import { Button } from 'react-aria-components'
import clipboard from 'clipboardy'
import { CopySimpleIcon, CheckIcon } from '@phosphor-icons/react'

const AnimatedCheckIcon = motion.create(CheckIcon, { forwardMotionProps: true })
const AnimatedClipboardIcon = motion.create(CopySimpleIcon, {
  forwardMotionProps: true,
})

interface CopyCodeProps {
  code: string
}
export default function CopyCode({ code }: CopyCodeProps) {
  const [isCopied, setIsCopied] = useState(false)

  const handleCopy = async () => {
    if (isCopied) return

    try {
      await clipboard.write(code)
      setIsCopied(true)
      setTimeout(() => setIsCopied(false), 2000)
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Failed to copy code:', error)
    }
  }

  return (
    <Button
      aria-label="Copy code"
      className="absolute inset-e-2 inset-bs-2 bg-ui-surface p-2 text-ui-muted backdrop-blur-sm transition hover:border-ui-accent/35 hover:bg-ui-accent/14 hover:text-ui-ink"
      onPress={handleCopy}
    >
      <AnimatePresence>
        {isCopied ? (
          <AnimatedCheckIcon
            className="block-5 inline-5"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
          />
        ) : (
          <AnimatedClipboardIcon
            className="block-5 inline-5"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
          />
        )}
      </AnimatePresence>
    </Button>
  )
}
