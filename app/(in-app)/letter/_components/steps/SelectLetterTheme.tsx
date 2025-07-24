'use client'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { CategoryValueEnum } from '@/utils/types/letter'
import Image from 'next/image'
import { useState } from 'react'

interface LetterTemplate {
  id: string
  title: string
  price: string
  category: 'original' | 'image' | 'postcard'
  bgColor: string
  illustration?: string
}

const letterTemplates: LetterTemplate[] = [
  {
    id: '1',
    title: 'The love letter',
    price: '2,000원',
    category: 'original',
    bgColor: 'bg-pink-100',
    illustration: '=',
  },
  {
    id: '2',
    title: 'LUV MEMO_H',
    price: '2,000원',
    category: 'image',
    bgColor: 'bg-yellow-200',
  },
  {
    id: '3',
    title: '편지',
    price: '2,000원',
    category: 'postcard',
    bgColor: 'bg-purple-300',
  },
  {
    id: '4',
    title: '편지',
    price: '2,000원',
    category: 'postcard',
    bgColor: 'bg-blue-600',
  },
  {
    id: '5',
    title: 'The love letter',
    price: '2,000원',
    category: 'original',
    bgColor: 'bg-pink-100',
    illustration: '=',
  },
  {
    id: '6',
    title: 'LUV MEMO_H',
    price: '2,000원',
    category: 'image',
    bgColor: 'bg-pink-100',
  },
  {
    id: '7',
    title: '편지',
    price: '2,000원',
    category: 'postcard',
    bgColor: 'bg-purple-300',
  },
  {
    id: '8',
    title: '편지',
    price: '2,000원',
    category: 'postcard',
    bgColor: 'bg-blue-600',
  },
  {
    id: '9',
    title: 'The love letter',
    price: '2,000원',
    category: 'original',
    bgColor: 'bg-pink-100',
    illustration: '=',
  },
  {
    id: '10',
    title: 'LUV MEMO_H',
    price: '2,000원',
    category: 'image',
    bgColor: 'bg-pink-100',
  },
  {
    id: '11',
    title: '편지',
    price: '2,000원',
    category: 'postcard',
    bgColor: 'bg-purple-300',
  },
  {
    id: '12',
    title: '편지',
    price: '2,000원',
    category: 'postcard',
    bgColor: 'bg-blue-600',
  },
  {
    id: '13',
    title: 'The love letter',
    price: '2,000원',
    category: 'original',
    bgColor: 'bg-pink-100',
    illustration: '=',
  },
  {
    id: '14',
    title: 'LUV MEMO_H',
    price: '2,000원',
    category: 'image',
    bgColor: 'bg-pink-100',
  },
  {
    id: '15',
    title: '편지',
    price: '2,000원',
    category: 'postcard',
    bgColor: 'bg-purple-300',
  },
  {
    id: '16',
    title: '편지',
    price: '2,000원',
    category: 'postcard',
    bgColor: 'bg-blue-600',
  },
]

const CATEGORIES = [
  { label: '전체', value: CategoryValueEnum.ALL },
  { label: '원래의', value: CategoryValueEnum.ORIGINAL },
  { label: '단순한', value: CategoryValueEnum.IMAGE },
  { label: '주제', value: CategoryValueEnum.POSTCARD },
]

type Props = {
  hidden?: boolean
  onContinue?: () => void
  onSkipToPhotos?: () => void
}
export function SelectLetterTheme({
  hidden,
  onContinue,
  onSkipToPhotos,
}: Props) {
  const [activeCategory, setActiveCategory] = useState(CategoryValueEnum.ALL)

  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null)

  const filteredTemplates = letterTemplates.filter(
    (template) =>
      activeCategory === 'all' || template.category === activeCategory
  )

  const selectTemplate = (templateId: string) => {
    setSelectedTemplate(selectedTemplate === templateId ? null : templateId)
  }

  return (
    <div hidden={hidden}>
      {/* Header */}
      <div className="mb-10">
        <h1 className="mb-2 text-[40px] font-semibold">
          디지 <span className="text-primary">털 편지 만들기</span>
        </h1>
        <p className="text-large text-text-secondary">
          간단한 단계로 아름다운 디지털 편지를 만들어보세요
        </p>
      </div>

      <div className="mb-10 flex gap-3">
        {CATEGORIES.map((category) => (
          <Button
            key={category.value}
            variant={activeCategory === category.value ? 'default' : 'outline'}
            onClick={() => setActiveCategory(category.value)}
          >
            {category.label}
          </Button>
        ))}
      </div>

      {/* Templates Grid */}
      <div className="mb-10 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {filteredTemplates.map((template) => (
          <div
            aria-label="card"
            key={template.id}
            className={cn(
              `group hover:bg-secondary hover:border-secondary relative cursor-pointer overflow-hidden rounded-2xl border border-blue-100 bg-white p-4 transition-all`,
              {
                'border-secondary bg-secondary':
                  selectedTemplate === template.id,
              }
            )}
            onClick={() => selectTemplate(template.id)}
          >
            <div className="relative mb-4 aspect-[7/10] w-full">
              <Image
                src="/image/sample-letter-bg.png"
                alt={template.title}
                fill
              />
            </div>
            {/* Template Title */}
            <div>
              <p
                className={cn(
                  'text-primary text-large group-hover:text-text-primary font-bold',
                  {
                    'text-text-primary hover:text-text-primary':
                      selectedTemplate === template.id,
                  }
                )}
              >
                {template.price}
              </p>
              <p className="text-small mb-1 font-bold">러브레터</p>
              <p className="text-text-secondary text-small truncate">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry.
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Action Buttons */}
      <div className="flex gap-4">
        <Button
          color="tertiary"
          size="xl"
          className="flex-1"
          onClick={onSkipToPhotos}
        >
          사진/문서만 보내기
        </Button>
        <Button
          size="xl"
          className="flex-1"
          disabled={!selectedTemplate}
          onClick={onContinue}
        >
          선택완료
        </Button>
      </div>
    </div>
  )
}
