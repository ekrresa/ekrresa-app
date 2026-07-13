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
      className="absolute inset-e-2 inset-bs-2 rounded-lg border border-white/15 bg-black/20 p-2
        text-white/70 shadow-sm backdrop-blur-sm transition-colors hover:border-white/30 hover:bg-white/10 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/70 active:bg-white/15"
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
