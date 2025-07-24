import { ColorSelect } from '@/components/svg'
import { Button } from '@/components/ui/button'
import { Select } from '@/components/ui/select'
import { PlusIcon, SmileIcon } from 'lucide-react'
import { Page, FontSettings } from '../_hooks'
import {
  AlignPicker,
  ColorPicker,
  EmojiPicker,
  FontSelector,
  FontWeightPicker,
} from './index'

interface LetterToolbarProps {
  pages: Page[]
  fontSettings: FontSettings
  onAddPage: () => void
  onFontFamilyChange: (fontFamily: string) => void
  onFontSizeChange: (fontSize: number) => void
  onFontWeightChange: (fontWeight: string) => void
  onTextAlignChange: (textAlign: 'left' | 'center' | 'right') => void
  onColorChange: (color: string) => void
  onEmojiSelect: (emoji: string) => void
}

export const LetterToolbar = ({
  pages,
  fontSettings,
  onAddPage,
  onFontFamilyChange,
  onFontSizeChange,
  onFontWeightChange,
  onTextAlignChange,
  onColorChange,
  onEmojiSelect,
}: LetterToolbarProps) => {
  const handleFontSizeSelect = (value: string) => {
    const fontSize = parseFloat(value)
    onFontSizeChange(fontSize)
  }

  const handleFontSelect = (font: { name: string; value: string }) => {
    onFontFamilyChange(font.value)
  }

  const handleWeightChange = (weight: 500 | 800) => {
    onFontWeightChange(weight.toString())
  }

  return (
    <div className="flex flex-wrap items-center gap-4 border-b border-blue-100 p-4">
      {/* Left Controls */}
      <div className="flex flex-1 items-center gap-4">
        <FontSelector onFontSelect={handleFontSelect}>
          <div className="w-3/5 max-w-48">
            <Select placeholder="글꼴 선택" open={false} className="w-full" />
          </div>
        </FontSelector>
        <Select
          placeholder="글꼴 크기"
          className="w-2/5 max-w-36"
          value={fontSettings.fontSize.toString()}
          onValueChange={handleFontSizeSelect}
          options={[
            { label: '큰글씨', value: '14.8' },
            { label: '중간', value: '12.8' },
            { label: '작은', value: '10.8' },
            { label: '매우작은', value: '8.8' },
          ]}
        />
      </div>

      {/* Right Controls */}
      <div className="ml-auto flex flex-1 items-center gap-3">
        <div className="ml-auto flex items-center gap-1">
          <FontWeightPicker onWeightChange={handleWeightChange} />
          <AlignPicker onAlignChange={onTextAlignChange} />
          <ColorPicker value={fontSettings.color} onChange={onColorChange}>
            <Button variant="ghost" size="icon" icon={<ColorSelect />} />
          </ColorPicker>
          <EmojiPicker onChange={onEmojiSelect}>
            <Button variant="ghost" size="icon" icon={<SmileIcon />} />
          </EmojiPicker>
        </div>
        <Button variant="outline" color="tertiary">
          임시저장
        </Button>
        <Button icon={<PlusIcon />} onClick={onAddPage}>
          편지지 추가
        </Button>
      </div>
    </div>
  )
}
