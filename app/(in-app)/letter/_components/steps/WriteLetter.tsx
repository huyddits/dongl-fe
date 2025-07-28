import { Button } from '@/components/ui/button'
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
  const {
    pages,
    currentPageIndex,
    fontSettings,
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
    updateColor,
    insertEmoji,
  } = useLetterState()

  // Load font CSS when fontFamily changes
  useEffect(() => {
    if (fontSettings.fontFamily) {
      const fontDetail = FONT_LIST.find(
        (font) => font.value === fontSettings.fontFamily
      )
      if (fontDetail) {
        loadFontCSS(fontDetail.value, fontDetail.src)
      }
    }
  }, [fontSettings.fontFamily])

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
          fontSettings={fontSettings}
          onAddPage={addNewPage}
          onFontFamilyChange={updateFontFamily}
          onFontSizeChange={updateFontSize}
          onFontWeightChange={updateFontWeight}
          onTextAlignChange={updateTextAlign}
          onColorChange={updateColor}
          onEmojiSelect={insertEmoji}
        />

        {/* Main Content Area */}
        <div
          className="flex"
          style={{
            fontFamily: fontSettings.fontFamily || 'inherit',
          }}
        >
          {/* Document Canvas */}
          <LetterEditor
            pages={pages}
            onPagesChange={updatePages}
            currentPageIndex={currentPageIndex}
            onCurrentPageChange={setCurrentPageIndex}
            letterConfig={letterConfig}
            fontSize={fontSettings.fontSize}
            fontFamily={fontSettings.fontFamily}
            fontWeight={fontSettings.fontWeight}
            textAlign={fontSettings.textAlign}
            textColor={fontSettings.color}
            letterSpacing={0}
            onLetterCountChange={handleLetterCountChange}
            textareaRefs={textareaRefs}
            movePages={movePages}
          />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-8 flex gap-4">
        <Button variant="outline" size="xl" className="flex-1" onClick={onBack}>
          이전
        </Button>
        <Button size="xl" className="flex-1" onClick={onContinue}>
          등록
        </Button>
      </div>
    </div>
  )
}
