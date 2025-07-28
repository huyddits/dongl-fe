'use client'

import { useWriteLetterStore } from '@/stores/useWriteLetterStore'
import { LetterStepEnum } from '@/utils/types/letter'
import { useEffect } from 'react'
import { ProgressSteps } from './_components/ProgressSteps'
import {
  AddressInformation,
  DocumentTransfer,
  SelectLetterTheme,
  SelectPhotos,
  WriteLetter,
} from './_components/steps'
import { useLetterSteps } from './_hooks'

export default function LetterPage() {
  const { reset } = useWriteLetterStore()
  const {
    currentStep,
    steps,
    handleNextStep,
    handlePrevStep,
    handleSkipToPhotos,
  } = useLetterSteps()

  // Reset all store state when entering the letter page
  useEffect(() => {
    reset()
  }, [])

  return (
    <div className="container pb-10">
      <ProgressSteps steps={steps} currentStep={currentStep} className="mb-8" />

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
