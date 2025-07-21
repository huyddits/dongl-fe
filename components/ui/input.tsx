'use client'

import { cn } from '@/lib/utils'
import * as React from 'react'
import { useMemo } from 'react'

/**
 * Checks if the pressed key is a number (0-9)
 * Prevents default action for non-number keys
 * @param e Keyboard event
 * @param allowDecimal Whether to allow decimal points (default: false)
 * @returns boolean indicating whether the key is a number
 */
export const isNumber = (
  e: React.KeyboardEvent<HTMLInputElement>,
  allowDecimal = false
): boolean => {
  const allowed = [
    'Backspace',
    'Delete',
    'ArrowLeft',
    'ArrowRight',
    'Tab',
    'ArrowUp',
    'ArrowDown',
    'Escape',
    'Enter',
  ].concat(allowDecimal ? ['.', ','] : [])
  if ((e.key >= '0' && e.key <= '9') || allowed.includes(e.key)) {
    return true
  }
  e.preventDefault()
  return false
}

type NumberInputProps = {
  min?: number
  max?: number
  allowDecimal?: boolean
}

function Input({
  className,
  type,
  number,
  ...props
}: React.ComponentProps<'input'> & {
  number?: NumberInputProps | boolean
}) {
  const numberProps = useMemo((): React.ComponentProps<'input'> => {
    if (!number) {
      return {}
    }
    if (number === true)
      return {
        type: 'number',
        onKeyDown: (e) => isNumber(e),
      }
    return {
      ...number,
      type: 'number',
      onKeyDown: (e) => isNumber(e, number.allowDecimal),
    }
  }, [number])

  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        'file:text-foreground placeholder:text-grey-100 selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-grey-100 flex h-11 w-full min-w-0 rounded-lg border bg-transparent px-3 py-2.5 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
        'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
        'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
        className
      )}
      {...props}
      {...numberProps}
    />
  )
}

export { Input }
