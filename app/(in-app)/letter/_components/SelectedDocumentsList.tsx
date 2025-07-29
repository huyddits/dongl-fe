'use client'

import { Button } from '@/components/ui/button'
import { Select } from '@/components/ui/select'
import { MinusIcon, PlusIcon, Trash2Icon } from 'lucide-react'

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
  selectedDocuments: SelectedDocument[]
  onUpdateDocument: (
    documentId: string,
    updates: Partial<Pick<SelectedDocument, 'color' | 'quantity'>>
  ) => void
  onRemoveDocument: (documentId: string) => void
  onClearAll: () => void
  onDuplicateAll: () => void
}

export function SelectedDocumentsList({
  selectedDocuments,
  onUpdateDocument,
  onRemoveDocument,
  onClearAll,
  onDuplicateAll,
}: Props) {
  return (
    <div className="mb-10">
      <div className="rounded-lg border border-blue-100 bg-white">
        <div className="flex items-center justify-between border-b border-blue-100 p-6">
          <h3 className="text-h4 text-text-primary font-semibold">
            <span className="text-primary">선택한 문서</span> (
            {selectedDocuments.length})
          </h3>
          <div className="flex gap-2">
            <Button color="primary" onClick={onDuplicateAll}>
              원복 일괄복사
            </Button>
            <Button color="black" onClick={onClearAll}>
              목록 일괄삭제
            </Button>
          </div>
        </div>

        <div className="space-y-4 p-6">
          {selectedDocuments.map((item) => (
            <div key={item.document.id} className="flex items-center gap-4">
              <div className="flex-1 space-y-1">
                <h4 className="text-text-primary text-large font-medium">
                  {item.document.name}
                  {item.document.isUploaded && (
                    <span className="ml-2 rounded bg-green-500 px-2 py-1 text-xs text-white">
                      업로드됨
                    </span>
                  )}
                </h4>
                {item.document.price && (
                  <p className="text-text-secondary text-sm">
                    {item.document.price.toLocaleString()}원
                  </p>
                )}
              </div>

              <div className="flex flex-shrink-0 items-center gap-2">
                <div className="flex w-fit flex-shrink-0 items-center divide-x divide-blue-100 rounded-md border border-blue-100">
                  <Button
                    size="sm"
                    variant="link"
                    icon={<MinusIcon />}
                    className="size-6 rounded-none"
                    onClick={() => {
                      if (item.quantity > 1) {
                        onUpdateDocument(item.document.id, {
                          quantity: item.quantity - 1,
                        })
                      }
                    }}
                    disabled={item.quantity <= 1}
                  />
                  <span className="text-medium flex size-6 items-center justify-center font-medium">
                    {item.quantity}
                  </span>
                  <Button
                    size="sm"
                    variant="link"
                    icon={<PlusIcon />}
                    className="size-6"
                    onClick={() =>
                      onUpdateDocument(item.document.id, {
                        quantity: item.quantity + 1,
                      })
                    }
                  />
                </div>
                <Select
                  placeholder="컬러"
                  value={item.color}
                  onValueChange={(value: string) =>
                    onUpdateDocument(item.document.id, {
                      color: value as 'color' | 'black',
                    })
                  }
                  options={[
                    { label: '컬러', value: 'color' },
                    { label: '블랙', value: 'black' },
                  ]}
                />
                <Button
                  icon={<Trash2Icon />}
                  variant="link"
                  size="icon"
                  color="destructive"
                  onClick={() => onRemoveDocument(item.document.id)}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
