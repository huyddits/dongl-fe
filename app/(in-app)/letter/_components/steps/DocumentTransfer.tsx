'use client'

import { Button } from '@/components/ui/button'
import { FileUpload } from '@/components/ui/file-upload'
import { useWindowScroll } from '@/hooks'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import { useState } from 'react'
import { toast } from 'sonner'
import { SelectedDocumentsList } from '../SelectedDocumentsList'

interface Document {
  id: string
  name: string
  price?: number
  tags?: string
  thumbnail?: string
  file?: File
  uploadedAt?: Date
  isUploaded?: boolean
}

interface SelectedDocument {
  document: Document
  color: 'color' | 'black'
  quantity: number
}

type Props = {
  hidden?: boolean
  onBack?: () => void
  onContinue?: () => void
}

const sampleDocuments: Document[] = [
  {
    id: '1',
    name: '러브레터',
    price: 8000,
    tags: 'Beautiful letter template',
    thumbnail: '/image/sample-letter-bg.png',
  },
  {
    id: '2',
    name: '감사편지',
    price: 6000,
    tags: 'Thank you letter template',
    thumbnail: '/image/sample-letter-bg.png',
  },
  {
    id: '3',
    name: '생일편지',
    price: 7000,
    tags: 'Birthday letter template',
    thumbnail: '/image/sample-letter-bg.png',
  },
  {
    id: '4',
    name: '축하편지',
    price: 8500,
    tags: 'Congratulation letter template',
    thumbnail: '/image/sample-letter-bg.png',
  },
  {
    id: '5',
    name: '사과편지',
    price: 5500,
    tags: 'Apology letter template',
    thumbnail: '/image/sample-letter-bg.png',
  },
  {
    id: '6',
    name: '위로편지',
    price: 6500,
    tags: 'Comfort letter template',
    thumbnail: '/image/sample-letter-bg.png',
  },
  {
    id: '7',
    name: '초대편지',
    price: 7500,
    tags: 'Invitation letter template',
    thumbnail: '/image/sample-letter-bg.png',
  },
  {
    id: '8',
    name: '안부편지',
    price: 6000,
    tags: 'Greeting letter template',
    thumbnail: '/image/sample-letter-bg.png',
  },
]

export function DocumentTransfer({ hidden, onBack, onContinue }: Props) {
  const { isScrollingUp } = useWindowScroll()
  const [documents] = useState<Document[]>(sampleDocuments)
  const [uploadedDocuments, setUploadedDocuments] = useState<
    SelectedDocument[]
  >([])
  const [selectedDocuments, setSelectedDocuments] = useState<
    SelectedDocument[]
  >([])
  const [activeFilter, setActiveFilter] = useState('전체')

  const handleFileUpload = (file: File) => {
    const newDocument: Document = {
      id: `doc-${Date.now()}`,
      name: file.name,
      file: file,
      uploadedAt: new Date(),
      isUploaded: true,
    }

    // Add to uploaded documents with default settings
    const uploadedDocument: SelectedDocument = {
      document: newDocument,
      color: 'color',
      quantity: 1,
    }

    setUploadedDocuments((prev) => [uploadedDocument, ...prev])
    toast.success('Document uploaded successfully')
  }

  const handleDocumentSelect = (document: Document) => {
    const isAlreadySelected = selectedDocuments.some(
      (item) => item.document.id === document.id
    )

    if (isAlreadySelected) {
      // Remove from selection
      setSelectedDocuments((prev) =>
        prev.filter((item) => item.document.id !== document.id)
      )
    } else {
      // Add to selection with default settings
      const selectedDocument: SelectedDocument = {
        document,
        color: 'color',
        quantity: 1,
      }
      setSelectedDocuments((prev) => [selectedDocument, ...prev])
    }
  }

  // Uploaded documents management
  const updateUploadedDocument = (
    documentId: string,
    updates: Partial<Pick<SelectedDocument, 'color' | 'quantity'>>
  ) => {
    setUploadedDocuments((prev) =>
      prev.map((item) =>
        item.document.id === documentId ? { ...item, ...updates } : item
      )
    )
  }

  const removeUploadedDocument = (documentId: string) => {
    setUploadedDocuments((prev) =>
      prev.filter((item) => item.document.id !== documentId)
    )
  }

  const clearAllUploaded = () => {
    setUploadedDocuments([])
  }

  const duplicateAllUploaded = () => {
    const duplicates = uploadedDocuments.map((item) => ({
      ...item,
      document: {
        ...item.document,
        id: `${item.document.id}-copy-${Date.now()}`,
      },
    }))
    setUploadedDocuments((prev) => [...prev, ...duplicates])
  }

  // Selected documents management
  const updateSelectedDocument = (
    documentId: string,
    updates: Partial<Pick<SelectedDocument, 'color' | 'quantity'>>
  ) => {
    setSelectedDocuments((prev) =>
      prev.map((item) =>
        item.document.id === documentId ? { ...item, ...updates } : item
      )
    )
  }

  const removeSelectedDocument = (documentId: string) => {
    setSelectedDocuments((prev) =>
      prev.filter((item) => item.document.id !== documentId)
    )
  }

  const clearAllSelected = () => {
    setSelectedDocuments([])
  }

  const duplicateAllSelected = () => {
    const duplicates = selectedDocuments.map((item) => ({
      ...item,
      document: {
        ...item.document,
        id: `${item.document.id}-copy-${Date.now()}`,
      },
    }))
    setSelectedDocuments((prev) => [...prev, ...duplicates])
  }

  return (
    <div hidden={hidden}>
      {/* Header */}
      <div className="mb-10">
        <div className="flex items-center gap-4">
          <div>
            <h1 className="mb-2 text-[40px] font-semibold">
              문서 전송<span className="text-primary">(A4 사이즈)</span>
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
            임시저장
          </Button>
        </div>
      </div>

      <div>
        {/* Document Upload Section */}
        <div className="mb-8">
          <FileUpload
            onFileUpload={handleFileUpload}
            acceptedTypes={[
              'application/pdf',
              'image/jpeg',
              'image/jpg',
              'image/png',
            ]}
            maxSize={50 * 1024 * 1024} // 50MB
            className="mb-10"
            uploadLabel="클릭하여 업로드할 파일을 선택하거나 파일을 드래그하여 등록해 주세요 (이미지 또는 pdf)"
            dropLabel="파일을 여기에 놓으세요!"
            supportText="PDF, DOC, DOCX, JPG, PNG 파일을 지원하며 최대 50MB까지 업로드 가능합니다"
          />

          {/* Uploaded Documents List */}
          {uploadedDocuments.length > 0 && (
            <SelectedDocumentsList
              selectedDocuments={uploadedDocuments}
              onUpdateDocument={updateUploadedDocument}
              onRemoveDocument={removeUploadedDocument}
              onClearAll={clearAllUploaded}
              onDuplicateAll={duplicateAllUploaded}
            />
          )}
        </div>

        {/* Sample Documents Section */}
        <div className="mb-10">
          <h3 className="text-text-primary mb-4 text-lg font-semibold">
            자료실
            <span className="text-primary">
              (편지 쓸기 전에 잊어 수 있으니 사진 확인 바랍니다)
            </span>
          </h3>

          {/* Filter Buttons */}
          <div className="mb-6 flex gap-2">
            {['전체', '편지지원지', '인편지', '엽서/봉지'].map((filter) => (
              <Button
                key={filter}
                size="sm"
                variant={activeFilter === filter ? 'default' : 'outline'}
                color="primary"
                onClick={() => setActiveFilter(filter)}
              >
                {filter}
              </Button>
            ))}
          </div>

          {/* Sample Documents Grid */}
          <div className="mb-10 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {documents.map((document) => {
              const isSelected = selectedDocuments.some(
                (item) => item.document.id === document.id
              )
              return (
                <div
                  aria-label="card"
                  key={document.id}
                  className={cn(
                    `group hover:bg-secondary hover:border-secondary relative cursor-pointer overflow-hidden rounded-2xl border border-blue-100 bg-white p-4 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg`,
                    {
                      'border-secondary bg-secondary scale-[1.02] shadow-md':
                        isSelected,
                    }
                  )}
                  onClick={() => handleDocumentSelect(document)}
                >
                  <div className="relative mb-4 aspect-[7/10] w-full">
                    <Image
                      src={document.thumbnail || '/image/sample-letter-bg.png'}
                      alt={document.name}
                      fill
                      className="object-cover transition-all duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div>
                    <p
                      className={cn(
                        'text-primary text-large group-hover:text-text-primary font-bold',
                        {
                          'text-text-primary hover:text-text-primary':
                            isSelected,
                        }
                      )}
                    >
                      {document.price?.toLocaleString() || '0'}원
                    </p>
                    <p className="text-small mb-1 font-bold">{document.name}</p>
                    <p className="text-text-secondary text-small truncate">
                      {document.tags || 'Beautiful letter template'}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Selected Sample Documents List */}
        {selectedDocuments.length > 0 && (
          <SelectedDocumentsList
            selectedDocuments={selectedDocuments}
            onUpdateDocument={updateSelectedDocument}
            onRemoveDocument={removeSelectedDocument}
            onClearAll={clearAllSelected}
            onDuplicateAll={duplicateAllSelected}
          />
        )}

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
    </div>
  )
}
