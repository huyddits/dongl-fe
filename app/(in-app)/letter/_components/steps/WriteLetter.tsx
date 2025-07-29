'use client'

import { Button } from '@/components/ui/button'
import { useWindowScroll } from '@/hooks'
import { cn } from '@/lib/utils'
import { FONT_LIST, loadFontCSS } from '@/utils/constants/fonts'
import { useEffect } from 'react'
import { useLetterState } from '../../_hooks'
import { LetterEditor, LetterToolbar } from '../index'

type Props = {
  hidden?: boolean
  onBack?: () => void
  onContinue?: () => void
}

export const WriteLetter = ({ hidden, onBack, onContinue }: Props) => {
  const { isScrollingUp } = useWindowScroll()
  const {
    pages,
    currentPageIndex,
    styling,
    textareaRefs,
    letterConfig,
    addNewPage,
    updatePages,
    setCurrentPageIndex,
    movePages,
    handleLetterCountChange,
    updateFontFamily,
    updateFontSize,
    updateFontWeight,
    updateTextAlign,
    updateFontColor,
    insertEmoji,
  } = useLetterState()

  // Load font CSS when fontFamily changes
  useEffect(() => {
    if (styling.font_family) {
      const fontDetail = FONT_LIST.find(
        (font) => font.value === styling.font_family
      )
      if (fontDetail) {
        loadFontCSS(fontDetail.value, fontDetail.src)
      }
    }
  }, [styling.font_family])

  return (
    <div hidden={hidden}>
      <div className="mb-10">
        <div className="flex items-center gap-4">
          <div>
            <h1 className="mb-2 text-[40px] font-semibold">
              디지 <span className="text-primary">털 편지 만들기</span>
            </h1>
            <p className="text-large text-text-secondary">
              간단한 단계로 아름다운 디지털 편지를 만들어보세요
            </p>
          </div>
        </div>

        {/* Debug buttons */}
      </div>

      <div className="rounded-2xl bg-white shadow-lg">
        {/* Header Toolbar */}
        <LetterToolbar
          pages={pages}
          styling={styling}
          onAddPage={addNewPage}
          onFontFamilyChange={updateFontFamily}
          onFontSizeChange={updateFontSize}
          onFontWeightChange={updateFontWeight}
          onTextAlignChange={updateTextAlign}
          onFontColorChange={updateFontColor}
          onEmojiSelect={insertEmoji}
        />

        {/* Main Content Area */}
        <div
          className="flex"
          style={{
            fontFamily: styling.font_family || 'inherit',
          }}
        >
          {/* Document Canvas */}
          <LetterEditor
            pages={pages}
            onPagesChange={updatePages}
            currentPageIndex={currentPageIndex}
            onCurrentPageChange={setCurrentPageIndex}
            letterConfig={letterConfig}
            font_size={styling.font_size}
            font_family={styling.font_family}
            font_weight={styling.font_weight}
            text_align={styling.text_align}
            font_color={styling.font_color}
            letter_spacing={styling.letter_spacing}
            onLetterCountChange={handleLetterCountChange}
            textareaRefs={textareaRefs}
            movePages={movePages}
          />
        </div>
      </div>

      {/* Floating Action Buttons */}
      <div
        className={cn(
          'fixed right-0 bottom-0 left-0 z-10',
          'translate-y-0 transition-all duration-500 ease-out will-change-transform',
          {
            'pointer-events-none translate-y-full': !isScrollingUp,
          }
        )}
      >
        <div className="container pt-8 pb-6">
          <div className="flex gap-3 rounded-xl border border-blue-100/50 bg-white/90 p-2 shadow-xl">
            <Button
              variant="outline"
              size="lg"
              className="flex-1 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
              onClick={onBack}
            >
              이전
            </Button>
            <Button
              size="lg"
              className="flex-1 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
              onClick={onContinue}
            >
              등록
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
