import { Button } from '@/components/ui/button'
import { useLetterState } from '../../_hooks'
import { LetterEditor, LetterToolbar } from '../index'

type Props = {
  hidden?: boolean
  onBack?: () => void
  onContinue?: () => void
}

const letterConfig = {
  category: 'Simple',
  name: '그린',
  upperMarginPx: 54,
  textWindowHorizontalSize: 462,
  textWindowVerticalSize: 431,
  lineSpacing: 24,
  maxLines: 18,
  price: 1000,
  imgOnebonPath: '/image/sample-letter-bg.png',
}

export const WriteLetter = ({ hidden, onBack, onContinue }: Props) => {
  const {
    pages,
    currentPageIndex,
    fontSettings,
    textareaRefs,
    addNewPage,
    updatePages,
    setCurrentPageIndex,
    handleLetterCountChange,
    updateFontFamily,
    updateFontSize,
    updateFontWeight,
    updateTextAlign,
    updateColor,
    insertEmoji,
    debugRefs,
  } = useLetterState()

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
          <Button
            size="xl"
            variant="outline"
            className="ml-auto"
            color="tertiary"
          >
            Save to draft
          </Button>
        </div>

        {/* Debug buttons */}
        <div className="mt-2 flex gap-2">
          <button
            onClick={() => {
              console.log('Test emoji insert')
              insertEmoji('😀')
            }}
            className="rounded bg-blue-500 px-4 py-2 text-white"
          >
            Test Emoji Insert
          </button>
          <button
            onClick={debugRefs}
            className="rounded bg-green-500 px-4 py-2 text-white"
          >
            Debug Refs
          </button>
        </div>
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
        <div className="flex">
          {/* Document Canvas */}
          <LetterEditor
            pages={pages}
            onPagesChange={updatePages}
            currentPageIndex={currentPageIndex}
            onCurrentPageChange={setCurrentPageIndex}
            letterPaper={letterConfig as any}
            fontSize={fontSettings.fontSize}
            fontFamily={fontSettings.fontFamily}
            fontWeight={fontSettings.fontWeight}
            textAlign={fontSettings.textAlign}
            textColor={fontSettings.color}
            onLetterCountChange={handleLetterCountChange}
            textareaRefs={textareaRefs}
          />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-8 flex gap-4">
        <Button variant="outline" size="xl" className="flex-1" onClick={onBack}>
          back to previous page
        </Button>
        <Button size="xl" className="flex-1" onClick={onContinue}>
          Continue
        </Button>
      </div>
    </div>
  )
}
