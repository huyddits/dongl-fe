'use client'

import { CheckCircleIcon, InfoIcon, XCircleIcon } from 'lucide-react'
import { useTheme } from 'next-themes'
import { Toaster as Sonner, ToasterProps, toast as defaultToast } from 'sonner'

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = 'system' } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps['theme']}
      className="toaster group"
      position={'top-right'}
      style={
        {
          '--normal-bg': 'var(--popover)',
          '--normal-text': 'var(--popover-foreground)',
          '--normal-border': 'var(--border)',
        } as React.CSSProperties
      }
      {...props}
    />
  )
}

const baseToast =
  (type?: 'success' | 'error') => (title: string, options?: ToasterProps) => {
    const typeIcon = (function () {
      switch (type) {
        case 'success':
          return <CheckCircleIcon className="size-4 text-green-400" />
        case 'error':
          return <XCircleIcon className="text-destructive size-4" />
        default:
          return <InfoIcon className="text-foreground" />
      }
    })()
    return defaultToast(title, {
      icon: typeIcon,
      ...options,
    })
  }
const toast = {
  success: baseToast('success'),
  error: baseToast('error'),
  info: baseToast(),
}

export { Toaster, toast }
