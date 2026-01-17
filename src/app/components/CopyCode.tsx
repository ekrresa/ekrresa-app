'use client'

import { CheckIcon, ClipboardIcon } from '@heroicons/react/24/solid'
import { AnimatePresence, motion } from 'motion/react'
import { useState } from 'react'
import { Button } from 'react-aria-components'

import { copyToClipboard } from '../lib/clipboard'

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
			await copyToClipboard(code)
			setIsCopied(true)
			setTimeout(() => setIsCopied(false), 2000)
		} catch (error) {
			console.error('Failed to copy code:', error)
		}
	}

	return (
		<Button
			aria-label="Copy code"
			className="absolute top-4 right-4 bg-transparent text-gray-500 hover:bg-gray-700 hover:text-gray-200 rounded-md p-1.5"
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
