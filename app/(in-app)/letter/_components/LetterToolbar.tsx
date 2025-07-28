import { ColorSelect } from '@/components/svg'
import { Button } from '@/components/ui/button'
import { Select } from '@/components/ui/select'
import {
  FontSizeEnum,
  FontWeightEnum,
  TextAlignEnum,
  FontSettings,
  Page,
} from '@/utils/types/letter'
import { PlusIcon, SmileIcon } from 'lucide-react'
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
  onFontSizeChange: (fontSize: FontSizeEnum) => void
  onFontWeightChange: (fontWeight: FontWeightEnum) => void
  onTextAlignChange: (textAlign: TextAlignEnum) => void
  onColorChange: (color: string) => void
  onEmojiSelect: (emoji: string) => void
  onSaveDraft?: () => void
}
export const LetterToolbar = ({
  fontSettings,
  onAddPage,
  onFontFamilyChange,
  onFontSizeChange,
  onFontWeightChange,
  onTextAlignChange,
  onColorChange,
  onEmojiSelect,
  onSaveDraft,
}: LetterToolbarProps) => {
  const handleFontSizeSelect = (value: string) => {
    onFontSizeChange(value as FontSizeEnum)
  }

  const handleFontSelect = (font: { name: string; value: string }) => {
    onFontFamilyChange(font.value)
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
          value={fontSettings.fontSize}
          onValueChange={handleFontSizeSelect}
          options={[
            { label: '큰글씨', value: FontSizeEnum.LARGE },
            { label: '중간', value: FontSizeEnum.MEDIUM },
            { label: '작은', value: FontSizeEnum.SMALL },
            { label: '매우작은', value: FontSizeEnum.VERY_SMALL },
          ]}
        />
      </div>

      {/* Right Controls */}
      <div className="ml-auto flex flex-1 items-center gap-3">
        <div className="ml-auto flex items-center gap-1">
          <FontWeightPicker
            onChange={onFontWeightChange}
            value={fontSettings.fontWeight}
          />
          <AlignPicker
            onChange={onTextAlignChange}
            value={fontSettings.textAlign}
          />
          <ColorPicker value={fontSettings.color} onChange={onColorChange}>
            <Button variant="ghost" size="icon" icon={<ColorSelect />} />
          </ColorPicker>
          <EmojiPicker onChange={onEmojiSelect}>
            <Button variant="ghost" size="icon" icon={<SmileIcon />} />
          </EmojiPicker>
        </div>
        {!!onSaveDraft && (
          <Button variant="outline" color="tertiary" onClick={onSaveDraft}>
            임시저장
          </Button>
        )}

        <Button icon={<PlusIcon />} onClick={onAddPage}>
          편지지 추가
        </Button>
      </div>
    </div>
  )
}
