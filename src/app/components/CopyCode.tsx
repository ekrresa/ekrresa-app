'use client'

import { AnimatePresence, motion } from 'motion/react'
import { useState } from 'react'
import { Button } from 'react-aria-components'
import clipboard from 'clipboardy'

interface IconProps extends React.ComponentProps<'svg'> {}

function CheckIcon(props: IconProps) {
  return (
    <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" {...props}>
      <path
        d="M5 12.5l4.5 4.5L19 7.5"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2.5"
      />
    </svg>
  )
}

function ClipboardIcon(props: IconProps) {
  return (
    <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" {...props}>
      <path
        d="M9 4.75h6a1.75 1.75 0 0 1 1.75 1.75v.5H18A2.25 2.25 0 0 1 20.25 9.25v9.5A2.25 2.25 0 0 1 18 21H6A2.25 2.25 0 0 1 3.75 18.75v-9.5A2.25 2.25 0 0 1 6 7h1.25v-.5A1.75 1.75 0 0 1 9 4.75Z"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path
        d="M9 4.75h6a1.75 1.75 0 0 1 1.75 1.75v1a.5.5 0 0 1-.5.5h-8.5a.5.5 0 0 1-.5-.5v-1A1.75 1.75 0 0 1 9 4.75Z"
        fill="currentColor"
      />
    </svg>
  )
}

const AnimatedCheckIcon = motion.create(CheckIcon, { forwardMotionProps: true })
const AnimatedClipboardIcon = motion.create(ClipboardIcon, {
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
      console.error('Failed to copy code:', error)
    }
  }

  return (
    <Button
      aria-label="Copy code"
      className="
        absolute top-4 right-4 rounded-full border border-white/10 bg-white/8
        p-2 text-[#c7d1e8] backdrop-blur transition
        hover:-translate-y-0.5 hover:border-white/18 hover:bg-white/14
        hover:text-white
      "
      onPress={handleCopy}
    >
      <AnimatePresence>
        {isCopied ? (
          <AnimatedCheckIcon
            className="size-5"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
          />
        ) : (
          <AnimatedClipboardIcon
            className="size-5"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
          />
        )}
      </AnimatePresence>
    </Button>
  )
}
