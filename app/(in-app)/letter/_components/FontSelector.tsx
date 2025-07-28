'use client'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { FONT_LIST, FontItem } from '@/utils/constants/fonts'
import Image from 'next/image'
import { useState } from 'react'

interface FontSelectorProps {
  children: React.ReactNode
  onFontSelect?: (fontOption: FontItem) => void
  selectedFont?: string
}

export function FontSelector({
  children,
  onFontSelect,
  selectedFont,
}: FontSelectorProps) {
  const [isOpen, setIsOpen] = useState(false)

  const handleFontSelect = (fontOption: FontItem) => {
    onFontSelect?.(fontOption)
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

        <div className="max-h-96 space-y-3 overflow-y-auto">
          {FONT_LIST.map((font, index) => (
            <div
              key={`${font.name}-${index}`}
              className="flex items-center gap-3 rounded-lg border p-3 hover:bg-gray-50"
            >
              {/* Font Preview Image */}
              <div className="flex-shrink-0">
                <Image
                  height={32}
                  width={80}
                  src={font.preview}
                  loading="lazy"
                  alt={`${font.name} 미리보기`}
                  className="h-8 w-20 object-contain"
                  onError={(e) => {
                    // Hide image if it fails to load
                    e.currentTarget.style.display = 'none'
                  }}
                />
              </div>
              {/* Select Button */}
              <Button
                variant={selectedFont === font.value ? 'default' : 'outline'}
                size="sm"
                onClick={() => handleFontSelect(font)}
                className="ml-auto flex-shrink-0"
                disabled={selectedFont === font.value}
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
