'use client'

import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils'
import {
  useGetAllLetterCategories,
  useGetLetterTemplatesByCategory,
} from '@/services/letter'
import { useWriteLetterStore } from '@/stores/useWriteLetterStore'
import Image from 'next/image'
import { useEffect, useState } from 'react'

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
  const { data: categories, isLoading: categoriesLoading } =
    useGetAllLetterCategories()
  const [activeCategory, setActiveCategory] = useState<number>()
  const { data: templates, isLoading: templatesLoading } =
    useGetLetterTemplatesByCategory(activeCategory)

  const { setTemplateWithDetails, selectedTemplate, clearTemplate } =
    useWriteLetterStore()
  const [flippedTemplates, setFlippedTemplates] = useState<Set<number>>(
    new Set()
  )
  useEffect(() => {
    if (categories?.length) setActiveCategory(categories[0].id)
  }, [categories])

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
        {categoriesLoading
          ? Array.from({ length: 3 }).map((_, index) => (
              <Skeleton key={index} className="h-10 w-20" />
            ))
          : categories?.map((category) => (
              <Button
                key={category.id}
                variant={activeCategory === category.id ? 'default' : 'outline'}
                onClick={() => setActiveCategory(category.id)}
              >
                {category.name}
              </Button>
            ))}
      </div>

      {/* Templates Grid */}
      <div className="mb-10">
        {templatesLoading || !activeCategory ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {Array.from({ length: 8 }).map((_, index) => (
              <div
                key={index}
                className="overflow-hidden rounded-2xl border border-blue-100 bg-white p-4"
              >
                <Skeleton className="mb-4 aspect-[7/10] w-full" />
                <div>
                  <Skeleton className="mb-2 h-6 w-20" />
                  <Skeleton className="mb-1 h-4 w-24" />
                  <Skeleton className="h-3 w-full" />
                </div>
              </div>
            ))}
          </div>
        ) : templates && templates.length > 0 ? (
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4 lg:grid-cols-4 lg:gap-6">
            {templates.map((template) => (
              <div
                aria-label="card"
                key={template.id}
                className={cn(
                  `group hover:bg-secondary hover:border-secondary relative cursor-pointer overflow-hidden rounded-2xl border border-blue-100 bg-white p-2.5 transition-all md:p-4`,
                  {
                    'border-secondary bg-secondary':
                      selectedTemplate?.id === template.id,
                  }
                )}
                onClick={() => {
                  setTemplateWithDetails(template)
                }}
              >
                <div
                  className="relative mb-4 aspect-[7/10] w-full cursor-pointer"
                  onClick={() => {
                    setFlippedTemplates((prev) => {
                      const newSet = new Set(prev)
                      if (newSet.has(template.id)) {
                        newSet.delete(template.id)
                      } else {
                        newSet.add(template.id)
                      }
                      return newSet
                    })
                  }}
                >
                  <Image
                    src={
                      flippedTemplates.has(template.id)
                        ? template.thumbnail_back
                        : template.thumbnail
                    }
                    alt={template.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    className="object-cover transition-all duration-300"
                  />
                </div>
                {/* Template Title */}
                <div>
                  <p
                    className={cn(
                      'text-primary text-large group-hover:text-text-primary font-bold',
                      {
                        'text-text-primary hover:text-text-primary':
                          selectedTemplate?.id === template.id,
                      }
                    )}
                  >
                    {template.price.toLocaleString()}원
                  </p>
                  <p className="text-small mb-1 font-bold">{template.name}</p>
                  <p className="text-text-secondary text-small truncate">
                    {template.tags || 'Beautiful letter template'}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <h3 className="text-text-primary mb-2 text-lg font-semibold">
              템플릿을 찾을 수 없습니다
            </h3>
            <p className="text-text-secondary">
              선택한 카테고리에 사용 가능한 템플릿이 없습니다.
            </p>
          </div>
        )}
      </div>

      {/* Bottom Action Buttons */}
      <div className="flex gap-4">
        <Button
          color="tertiary"
          size="lg"
          className="flex-1"
          onClick={() => {
            clearTemplate()
            onSkipToPhotos?.()
          }}
        >
          사진/문서만 보내기
        </Button>
        <Button
          size="lg"
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
