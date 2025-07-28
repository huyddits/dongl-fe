'use client'

import { Button } from '@/components/ui/button'
import { TextAlignEnum } from '@/utils/types/letter'
import { AlignCenter, AlignLeft, AlignRight } from 'lucide-react'

interface AlignPickerProps {
  onChange?: (align: TextAlignEnum) => void
  value?: TextAlignEnum
  className?: string
}

const alignOptions = [
  { value: 'left' as TextAlignEnum, icon: AlignLeft },
  { value: 'center' as TextAlignEnum, icon: AlignCenter },
  { value: 'right' as TextAlignEnum, icon: AlignRight },
]

export function AlignPicker({
  onChange,
  value = TextAlignEnum.LEFT,
  className,
}: AlignPickerProps) {
  const handleAlignToggle = () => {
    const currentIndex = alignOptions.findIndex(
      (option) => option.value === value
    )
    const nextIndex = (currentIndex + 1) % alignOptions.length
    const nextAlign = alignOptions[nextIndex].value

    onChange?.(nextAlign)
  }

  const CurrentIcon =
    alignOptions.find((option) => option.value === value)?.icon || AlignLeft

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={handleAlignToggle}
      className={className}
      aria-label={`Text alignment: ${value}`}
    >
      <CurrentIcon className="h-4 w-4" />
    </Button>
  )
}
