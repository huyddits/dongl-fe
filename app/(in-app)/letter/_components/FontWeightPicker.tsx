'use client'

import { Button } from '@/components/ui/button'
import { useState } from 'react'

type FontWeight = 500 | 800

interface FontWeightPickerProps {
  onWeightChange?: (weight: FontWeight) => void
  defaultWeight?: FontWeight
  className?: string
}

const weightOptions = [
  { value: 500 as FontWeight, label: '얇게' },
  { value: 800 as FontWeight, label: '굵게' },
]

export function FontWeightPicker({
  onWeightChange,
  defaultWeight = 500,
  className,
}: FontWeightPickerProps) {
  const [currentWeight, setCurrentWeight] = useState<FontWeight>(defaultWeight)

  const handleWeightToggle = () => {
    const nextWeight = currentWeight === 500 ? 800 : 500
    setCurrentWeight(nextWeight)
    onWeightChange?.(nextWeight)
  }

  const currentLabel =
    weightOptions.find((option) => option.value === currentWeight)?.label ||
    '얇게'

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
