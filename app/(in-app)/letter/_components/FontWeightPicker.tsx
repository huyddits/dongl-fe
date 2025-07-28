'use client'

import { Button } from '@/components/ui/button'
import { FontWeightEnum } from '@/utils/types/letter'

interface FontWeightPickerProps {
  onChange?: (weight: FontWeightEnum) => void
  value?: FontWeightEnum
  className?: string
}

const weightOptions = [
  { value: FontWeightEnum.LIGHT, label: '얇게' },
  { value: FontWeightEnum.BOLD, label: '굵게' },
]

export function FontWeightPicker({
  onChange,
  value = FontWeightEnum.LIGHT,
  className,
}: FontWeightPickerProps) {
  const handleWeightToggle = () => {
    const nextWeight =
      value === FontWeightEnum.LIGHT
        ? FontWeightEnum.BOLD
        : FontWeightEnum.LIGHT
    onChange?.(nextWeight)
  }

  const currentLabel =
    weightOptions.find((option) => option.value === value)?.label || '얇게'

  return (
    <Button
      variant="ghost"
      onClick={handleWeightToggle}
      className={className}
      aria-label={`Font weight: ${currentLabel}`}
    >
      {currentLabel}
    </Button>
  )
}
