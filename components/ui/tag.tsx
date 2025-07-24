import { cn } from '@/lib/utils'
import { cva, type VariantProps } from 'class-variance-authority'
import React from 'react'

const tagVariants = cva(
  'inline-flex items-center text-xs justify-center rounded-full px-2 py-0.5 font-medium h-5',
  {
    variants: {
      color: {
        primary: 'bg-blue-100 text-blue-700',
        success: 'bg-success/50 text-success',
        error: 'bg-error/50 text-error',
      },
    },
    defaultVariants: {
      color: 'primary',
    },
  }
)

export function Tag({
  className,
  color,
  ...props
}: React.ComponentProps<'span'> & VariantProps<typeof tagVariants>) {
  return <span className={cn(tagVariants({ color, className }))} {...props} />
}

export { tagVariants }
