import { cn } from '@/lib/utils'

export interface StepItem {
  label: string
  value: string
}

export interface ProgressStepsProps {
  steps: StepItem[]
  currentStep: string
  className?: string
  onStepClick?: (stepValue: string, step: StepItem) => void
}

export const ProgressSteps = ({
  steps = [],
  currentStep,
  className = '',
  onStepClick,
}: ProgressStepsProps) => {
  // Find the current step index for progress bar calculation
  const currentStepIndex = steps.findIndex(
    (step) => String(step.value) === String(currentStep)
  )

  return (
    <div className={cn('w-full px-4 py-6', className)}>
      <div className="relative flex items-center justify-between">
        <div className="bg-grey-100 absolute top-2.5 right-6 left-6 h-1">
          <div
            className="bg-primary h-full transition-all duration-500 ease-in-out"
            style={{
              width:
                steps.length > 1
                  ? `calc(${(currentStepIndex / (steps.length - 1)) * 100}% - 12px)`
                  : '0%',
            }}
          />
        </div>

        {/* Steps */}
        {steps.map((step: StepItem, index: number) => {
          const isActive: boolean = index <= currentStepIndex
          const isCurrent: boolean = String(step.value) === String(currentStep)

          return (
            <div
              key={step.value || index}
              className={cn(
                'group relative flex cursor-pointer flex-col items-center'
              )}
              onClick={() => onStepClick?.(step.value, step)}
            >
              {/* Circle */}
              <div
                className={cn(
                  'z-10 size-6 rounded-full transition-all duration-300 ease-in-out',
                  {
                    'bg-primary shadow-lg': isActive,
                    'bg-grey-100': !isActive,
                    'ring-primary/20 ring-4': isCurrent,
                    'self-start': index === 0,
                    'self-end': index === steps.length - 1,
                  }
                )}
              />

              {/* Label */}
              <div className="mt-3 min-w-0 text-center">
                <div
                  className={cn(
                    'text-text-primary text-xs font-medium transition-colors duration-200 sm:text-sm'
                  )}
                >
                  {step.label}
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Mobile: Current Step Info */}
      <div className="mt-6 sm:hidden">
        {currentStepIndex >= 0 && steps[currentStepIndex] && (
          <div
            className={cn(
              'bg-primary/5 border-primary/10 rounded-lg border p-4 text-center'
            )}
          >
            <div className={cn('text-primary mb-1 text-sm font-semibold')}>
              Step {currentStepIndex + 1} of {steps.length}
            </div>
            <div className={cn('text-sm text-gray-100')}>
              {steps[currentStepIndex].label}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
