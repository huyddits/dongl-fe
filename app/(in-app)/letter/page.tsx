'use client'

import { LetterStepEnum } from '@/utils/types/letter'
import { useState } from 'react'
import { ProgressSteps } from './_components/ProgressSteps'
import {
  AddressInformation,
  DocumentTransfer,
  SelectLetterTheme,
  SelectPhotos,
  WriteLetter,
} from './_components/steps'

const LETTER_STEP = [
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

export default function LetterPage() {
  const [currentStep, setCurrentStep] = useState<string>(LetterStepEnum.THEME)

  const handleStepClick = (stepValue: string | number) => {
    setCurrentStep(String(stepValue))
  }

  const handleNextStep = () => {
    const currentIndex = LETTER_STEP.findIndex(
      (step) => step.value === currentStep
    )
    if (currentIndex < LETTER_STEP.length - 1) {
      setCurrentStep(LETTER_STEP[currentIndex + 1].value)
    }
  }

  const handlePrevStep = () => {
    const currentIndex = LETTER_STEP.findIndex(
      (step) => step.value === currentStep
    )
    if (currentIndex > 0) {
      setCurrentStep(LETTER_STEP[currentIndex - 1].value)
    }
  }

  const handleSkipToPhotos = () => {
    setCurrentStep(LetterStepEnum.PHOTO)
  }

  return (
    <div className="container pb-10">
      <ProgressSteps
        steps={LETTER_STEP}
        currentStep={currentStep}
        onStepClick={handleStepClick}
        className="mb-8"
      />

      <SelectLetterTheme
        hidden={currentStep !== LetterStepEnum.THEME}
        onContinue={handleNextStep}
        onSkipToPhotos={handleSkipToPhotos}
      />
      <WriteLetter
        hidden={currentStep !== LetterStepEnum.WRITE}
        onBack={handlePrevStep}
        onContinue={handleNextStep}
      />
      <SelectPhotos
        hidden={currentStep !== LetterStepEnum.PHOTO}
        onBack={handlePrevStep}
        onContinue={handleNextStep}
      />
      <DocumentTransfer
        hidden={currentStep !== LetterStepEnum.DOCUMENTS}
        onBack={handlePrevStep}
        onContinue={handleNextStep}
      />
      <AddressInformation
        hidden={currentStep !== LetterStepEnum.ADDRESSES}
        onBack={handlePrevStep}
        onContinue={handleNextStep}
      />
    </div>
  )
}
