import { ColorSelect } from '@/components/svg'
import { Button } from '@/components/ui/button'
import { Select } from '@/components/ui/select'
import { useIsLoggedIn } from '@/hooks'
import { isServer } from '@/lib'
import { FONT_LIST, FontItem } from '@/utils/constants/fonts'
import {
  FontSizeEnum,
  FontWeightEnum,
  TextAlignEnum,
  IStyling,
  Page,
} from '@/utils/types/letter'
import { PlusIcon, SmileIcon } from 'lucide-react'
import { SaveDraftButton } from './SaveDraftButton'
import {
  AlignPicker,
  ColorPicker,
  EmojiPicker,
  FontSelector,
  FontWeightPicker,
} from './index'

type Props = {
  pages: Page[]
  styling: IStyling
  onAddPage: () => void
  onFontFamilyChange: (font_family: string) => void
  onFontSizeChange: (font_size: FontSizeEnum) => void
  onFontWeightChange: (font_weight: FontWeightEnum) => void
  onTextAlignChange: (text_align: TextAlignEnum) => void
  onFontColorChange?: (font_color: string) => void
  onEmojiSelect: (emoji: string) => void
  onSaveDraft?: () => void
}

export const LetterToolbar = ({
  styling,
  onAddPage,
  onFontFamilyChange,
  onFontSizeChange,
  onFontWeightChange,
  onTextAlignChange,
  onFontColorChange,
  onEmojiSelect,
}: Props) => {
  const isLoggedIn = useIsLoggedIn()
  const handleFontSizeSelect = (value: string) => {
    onFontSizeChange(value as FontSizeEnum)
  }

  const handleFontSelect = (font: FontItem) => {
    onFontFamilyChange(font.value)
  }

  return (
    <div className="flex flex-wrap items-center gap-4 border-b border-blue-100 p-4">
      {/* Left Controls */}
      <div className="flex flex-1 items-center gap-4">
        <FontSelector onFontSelect={handleFontSelect}>
          <div className="w-3/5 max-w-48">
            <Select
              placeholder="글꼴 선택"
              open={false}
              className="w-full"
              value={styling.font_family || undefined}
              options={FONT_LIST.map((font) => ({
                label: font.name,
                value: font.value,
              }))}
            />
          </div>
        </FontSelector>
        <Select
          placeholder="글꼴 크기"
          className="w-2/5 max-w-36"
          value={styling.font_size}
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
      <div className="ml-auto flex flex-1 flex-wrap items-center gap-3">
        <div className="ml-auto flex items-center gap-1">
          <FontWeightPicker
            onChange={onFontWeightChange}
            value={styling.font_weight}
          />
          <AlignPicker
            onChange={onTextAlignChange}
            value={styling.text_align}
          />
          <ColorPicker value={styling.font_color} onChange={onFontColorChange}>
            <Button variant="ghost" size="icon" icon={<ColorSelect />} />
          </ColorPicker>
          <EmojiPicker onChange={onEmojiSelect}>
            <Button variant="ghost" size="icon" icon={<SmileIcon />} />
          </EmojiPicker>
        </div>
      </div>
      <div className="flex items-center gap-2">
        {isLoggedIn && !isServer() && (
          <SaveDraftButton
            render={(onSave, loading) => (
              <Button
                variant="outline"
                color="tertiary"
                onClick={onSave}
                loading={loading}
              >
                임시저장
              </Button>
            )}
          />
        )}

        <Button icon={<PlusIcon />} onClick={onAddPage}>
          편지지 추가
        </Button>
      </div>
    </div>
  )
}
