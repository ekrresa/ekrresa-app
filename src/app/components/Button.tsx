'use client'

import { Button as ButtonPrimitive } from 'react-aria-components/Button'
import { cx } from '../lib/utils'

type ButtonProps = React.ComponentProps<typeof ButtonPrimitive>

export function Button({ className, ref, ...props }: ButtonProps) {
  return <ButtonPrimitive ref={ref} className={cx(className)} {...props} />
}
