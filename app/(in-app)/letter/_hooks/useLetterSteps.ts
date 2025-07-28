import { LetterStepEnum } from '@/utils/types/letter'
import { useState, useCallback } from 'react'

const LETTER_STEPS = [
  { label: '선택', value: LetterStepEnum.THEME },
  { label: '편지 쓰기', value: LetterStepEnum.WRITE },
  { label: '사진 선택', value: LetterStepEnum.PHOTO },
  { label: '문서 전송', value: LetterStepEnum.DOCUMENTS },
  {
    label: '주소지작성',
    value: LetterStepEnum.ADDRESSES,
  },
  { label: '우편 선택', value: LetterStepEnum.PAYMENT },
]

export const useLetterSteps = () => {
  const [currentStep, setCurrentStep] = useState<string>(LetterStepEnum.THEME)

  const handleNextStep = useCallback(() => {
    const currentIndex = LETTER_STEPS.findIndex(
      (step) => step.value === currentStep
    )
    if (currentIndex < LETTER_STEPS.length - 1) {
      setCurrentStep(LETTER_STEPS[currentIndex + 1].value)
    }
  }, [currentStep])

  const handlePrevStep = useCallback(() => {
    const currentIndex = LETTER_STEPS.findIndex(
      (step) => step.value === currentStep
    )
    if (currentIndex > 0) {
      setCurrentStep(LETTER_STEPS[currentIndex - 1].value)
    }
  }, [currentStep])

  const handleSkipToPhotos = useCallback(() => {
    setCurrentStep(LetterStepEnum.PHOTO)
  }, [])

  const goToStep = useCallback((step: LetterStepEnum) => {
    setCurrentStep(step)
  }, [])

  const getCurrentStepIndex = useCallback(() => {
    return LETTER_STEPS.findIndex((step) => step.value === currentStep)
  }, [currentStep])

  const isFirstStep = getCurrentStepIndex() === 0
  const isLastStep = getCurrentStepIndex() === LETTER_STEPS.length - 1

  return {
    // State
    currentStep,
    steps: LETTER_STEPS,

    // Actions
    handleNextStep,
    handlePrevStep,
    handleSkipToPhotos,
    goToStep,
    setCurrentStep,

    // Utilities
    getCurrentStepIndex,
    isFirstStep,
    isLastStep,
  }
}
