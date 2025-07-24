'use client'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { useState } from 'react'

const fontOptions = [
  {
    name: '휴먼고딕',
    value: 'human-gothic',
    style: { fontFamily: 'Arial, sans-serif' },
  },
  {
    name: 'HY신명조',
    value: 'hy-sinmyeongjo',
    style: { fontFamily: 'Georgia, serif' },
  },
  {
    name: '프리텐다드',
    value: 'pretendard',
    style: { fontFamily: 'Pretendard, sans-serif' },
  },
  {
    name: 'IM혜민재',
    value: 'im-hyemin',
    style: { fontFamily: 'Malgun Gothic, sans-serif' },
  },
  {
    name: '가람연꽃',
    value: 'garam-lotus',
    style: { fontFamily: 'Gulim, sans-serif' },
  },
  {
    name: '강원창체',
    value: 'gangwon-chang',
    style: { fontFamily: 'Dotum, sans-serif' },
  },
  {
    name: '가볍참편체',
    value: 'light-cham',
    style: { fontFamily: 'Batang, serif' },
  },
  {
    name: '교육어느고딕',
    value: 'edu-gothic',
    style: { fontFamily: 'Microsoft Sans Serif, sans-serif' },
  },
  { name: '공수체', value: 'gongsoo', style: { fontFamily: 'Gungsuh, serif' } },
  {
    name: '귀여워잉',
    value: 'cute-ing',
    style: { fontFamily: 'Comic Sans MS, cursive' },
  },
  {
    name: '퀘로미스캔디드',
    value: 'queromis-candid',
    style: { fontFamily: 'Times New Roman, serif' },
  },
  {
    name: '고문헌',
    value: 'old-document',
    style: { fontFamily: 'Courier New, monospace' },
  },
]

interface FontSelectorProps {
  children: React.ReactNode
  onFontSelect?: (font: { name: string; value: string }) => void
  selectedFont?: string
}

export function FontSelector({
  children,
  onFontSelect,
  selectedFont,
}: FontSelectorProps) {
  const [isOpen, setIsOpen] = useState(false)

  const handleFontSelect = (font: { name: string; value: string }) => {
    onFontSelect?.(font)
    setIsOpen(false)
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center">편지 작성하기</DialogTitle>
        </DialogHeader>

        <div className="text-text-primary mb-4 text-center text-sm">
          폰트 변경시 줄 간격 및 편지지 수가 차이가 수 있습니다
          <br />
          작성 전 미리 폰트를 선택하는 것을 권장드립니다.😊
        </div>

        <Button
          color="secondary"
          className="mb-4 w-full"
          onClick={() =>
            handleFontSelect({ name: '손글씨', value: 'handwritten' })
          }
        >
          손글씨
        </Button>

        <div className="max-h-96 space-y-3 overflow-y-auto">
          {fontOptions.map((font) => (
            <div
              key={font.value}
              className="flex items-center justify-between rounded-lg border p-3 hover:bg-gray-50"
            >
              <span className="text-lg font-medium" style={font.style}>
                {font.name}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleFontSelect(font)}
                className="ml-auto"
              >
                선택
              </Button>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  )
}
