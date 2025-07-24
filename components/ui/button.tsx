import { cn } from '@/lib/utils'
import { Slot, Slottable } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { Loader2Icon } from 'lucide-react'
import * as React from 'react'

const buttonVariants = cva(
  "cursor-pointer inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default: 'shadow-xs',
        outline: 'border bg-white shadow-xs',
        ghost: '',
        link: 'underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-10 px-4 py-2 has-[>svg]:px-3',
        sm: 'h-9 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5',
        lg: 'h-14 rounded-md px-6 has-[>svg]:px-4',
        xl: 'h-[62px] text-[22px] rounded-md px-6 has-[>svg]:px-4',
        icon: 'size-9',
      },
      color: {
        primary: '',
        secondary: '',
        tertiary: '',
        destructive: '',
        black: '',
      },
    },
    compoundVariants: [
      {
        variant: 'default',
        color: 'primary',
        className: 'bg-primary text-white hover:bg-primary/90',
      },
      {
        variant: 'default',
        color: 'secondary',
        className: 'bg-secondary text-text-primary hover:bg-secondary/80',
      },
      {
        variant: 'default',
        color: 'tertiary',
        className: 'bg-tertiary text-white hover:bg-tertiary/80',
      },
      {
        variant: 'default',
        color: 'destructive',
        className: 'bg-error text-white hover:bg-error/90',
      },
      {
        variant: 'default',
        color: 'black',
        className: 'bg-text-primary text-white hover:bg-text-primary/90',
      },
      {
        variant: 'outline',
        color: 'primary',
        className:
          'border-primary hover:border-primary/70 hover:bg-primary/10 text-primary hover:text-primary/70',
      },
      {
        variant: 'outline',
        color: 'secondary',
        className:
          'border-secondary hover:border-secondary/70 hover:bg-secondary/10 text-secondary hover:text-secondary/70',
      },
      {
        variant: 'outline',
        color: 'tertiary',
        className:
          'border-tertiary hover:border-tertiary/70 hover:bg-tertiary/10 text-tertiary hover:text-tertiary/70',
      },
      {
        variant: 'outline',
        color: 'black',
        className:
          'border-black hover:border-black/70 hover:bg-text-primary/10 text-text-primary hover:text-text-primary/70',
      },
      {
        variant: 'link',
        color: 'primary',
        className: 'text-primary',
      },
      {
        variant: 'link',
        color: 'secondary',
        className: 'text-secondary',
      },
      {
        variant: 'link',
        color: 'tertiary',
        className: 'text-tertiary',
      },
      {
        variant: 'link',
        color: 'destructive',
        className: 'text-error',
      },
      {
        variant: 'link',
        color: 'black',
        className: 'text-text-primary',
      },
      {
        variant: 'ghost',
        color: 'primary',
        className: 'hover:bg-primary/10 hover:text-primary',
      },
      {
        variant: 'ghost',
        color: 'secondary',
        className: 'hover:bg-secondary/10 hover:text-secondary',
      },
      {
        variant: 'ghost',
        color: 'tertiary',
        className: 'hover:bg-tertiary/10 hover:text-tertiary',
      },
      {
        variant: 'ghost',
        color: 'black',
        className: 'hover:bg-text-primary/10 hover:text-text-primary',
      },
    ],
    defaultVariants: {
      variant: 'default',
      color: 'primary',
      size: 'default',
    },
  }
)

function Button({
  className,
  variant,
  color,
  size,
  asChild = false,
  icon,
  loading = false,
  children,
  ...props
}: React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
    icon?: React.ReactElement<SVGElement>
    loading?: boolean
  }) {
  const Comp = asChild ? Slot : 'button'

  const displayIcon = loading ? (
    <Loader2Icon className="size-4 animate-spin" />
  ) : icon ? (
    <icon.type className={cn('size-4', icon.props.classList)} />
  ) : null

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, color, size, className }))}
      disabled={loading || props.disabled}
      {...props}
    >
      {displayIcon}
      <Slottable>{children}</Slottable>
    </Comp>
  )
}

export { Button, buttonVariants }
