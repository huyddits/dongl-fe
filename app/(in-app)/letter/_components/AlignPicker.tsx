'use client'

import { Button } from '@/components/ui/button'
import { AlignCenter, AlignLeft, AlignRight } from 'lucide-react'
import { useState } from 'react'

type AlignValue = 'left' | 'center' | 'right'

interface AlignPickerProps {
  onAlignChange?: (align: AlignValue) => void
  defaultAlign?: AlignValue
  className?: string
}

const alignOptions = [
  { value: 'left' as AlignValue, icon: AlignLeft },
  { value: 'center' as AlignValue, icon: AlignCenter },
  { value: 'right' as AlignValue, icon: AlignRight },
]

export function AlignPicker({
  onAlignChange,
  defaultAlign = 'left',
  className,
}: AlignPickerProps) {
  const [currentAlign, setCurrentAlign] = useState<AlignValue>(defaultAlign)

  const handleAlignToggle = () => {
    const currentIndex = alignOptions.findIndex(
      (option) => option.value === currentAlign
    )
    const nextIndex = (currentIndex + 1) % alignOptions.length
    const nextAlign = alignOptions[nextIndex].value

    setCurrentAlign(nextAlign)
    onAlignChange?.(nextAlign)
  }

  const CurrentIcon =
    alignOptions.find((option) => option.value === currentAlign)?.icon ||
    AlignLeft

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={handleAlignToggle}
      className={className}
      aria-label={`Text alignment: ${currentAlign}`}
    >
      <CurrentIcon className="h-4 w-4" />
    </Button>
  )
}
