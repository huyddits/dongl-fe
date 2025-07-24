'use client'

import { Button } from '@/components/ui/button'
import { FileUpload } from '@/components/ui/file-upload'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import { useState } from 'react'
import { toast } from 'sonner'
import { SelectedDocumentsList } from '../SelectedDocumentsList'

interface Document {
  id: string
  name: string
  file: File
  uploadedAt: Date
}

type Props = {
  hidden?: boolean
  onBack?: () => void
  onContinue?: () => void
}

export function DocumentTransfer({ hidden, onBack, onContinue }: Props) {
  const [documents, setDocuments] = useState<Document[]>([])
  const [selectedDocument, setSelectedDocument] = useState<string | null>(null)

  // Helper function to check if any document is selected
  const hasSelectedDocument = !!selectedDocument

  const handleFileUpload = (file: File) => {
    const newDocument: Document = {
      id: `doc-${Date.now()}`,
      name: file.name,
      file: file,
      uploadedAt: new Date(),
    }

    setDocuments((prev) => [newDocument, ...prev])
    // Auto-select the newly uploaded document
    setSelectedDocument(newDocument.id)
    toast.success('Document uploaded successfully')
  }

  const handleDocumentSelect = (documentId: string) => {
    setSelectedDocument(selectedDocument === documentId ? null : documentId)
  }

  const removeDocument = (documentId: string) => {
    setDocuments((prev) => prev.filter((doc) => doc.id !== documentId))
    if (selectedDocument === documentId) {
      setSelectedDocument(null)
    }
    toast.success('Document removed')
  }

  const downloadDocument = (doc: Document) => {
    const url = URL.createObjectURL(doc.file)
    const a = globalThis.document.createElement('a')
    a.href = url
    a.download = doc.name
    globalThis.document.body.appendChild(a)
    a.click()
    globalThis.document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
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

      <div className="">
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
            <Button size="sm" variant="default" color="primary">
              전체
            </Button>
            <Button size="sm" variant="outline" color="primary">
              편지지원지
            </Button>
            <Button size="sm" variant="outline" color="primary">
              인편지
            </Button>
            <Button size="sm" variant="outline" color="primary">
              엽서/봉지
            </Button>
          </div>

          {/* Sample Documents Grid */}
          <div className="mb-10 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {Array(8)
              .fill('')
              .map((_, index) => (
                <div
                  aria-label="card"
                  key={index}
                  className={cn(
                    `group hover:bg-secondary hover:border-secondary relative cursor-pointer overflow-hidden rounded-2xl border border-blue-100 bg-white p-4 transition-all`,
                    {
                      'border-secondary bg-secondary': false,
                    }
                  )}
                >
                  <div className="relative mb-4 aspect-[7/10] w-full">
                    <Image
                      src="/image/sample-letter-bg.png"
                      alt="Sample Document"
                      fill
                    />
                  </div>
                  <div>
                    <p
                      className={cn(
                        'text-primary text-large group-hover:text-text-primary font-bold',
                        {
                          'text-text-primary hover:text-text-primary': false,
                        }
                      )}
                    >
                      8,000KRW
                    </p>
                    <p className="text-small mb-1 font-bold">러브레터</p>
                    <p className="text-text-secondary text-small truncate">
                      Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry.
                    </p>
                  </div>
                </div>
              ))}
          </div>
        </div>

        {/* Selected Documents List - Mockup UI */}
        <SelectedDocumentsList />

        {/* Action Buttons */}
        <div className="flex gap-4">
          <Button
            variant="outline"
            size="xl"
            className="flex-1"
            onClick={onBack}
          >
            이전
          </Button>
          <Button size="xl" className="flex-1" onClick={onContinue}>
            등록
          </Button>
        </div>
      </div>
    </div>
  )
}
