'use client'

import { Button } from '@/components/ui/button'
import { ImageUpload } from '@/components/ui/file-upload'
import { cn } from '@/lib/utils'
import { CheckIcon, XIcon } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'
import { toast } from 'sonner'

interface PhotoOption {
  id: string
  src: string
  alt: string
  file?: File // For uploaded files
  isUploaded?: boolean
}

const initialSamplePhotos: PhotoOption[] = [
  {
    id: '1',
    src: '/image/sample-letter-bg.png',
    alt: 'Heart hands photo',
  },
  {
    id: '2',
    src: '/image/sample-letter-bg.png',
    alt: 'Mountain landscape',
  },
  {
    id: '3',
    src: '/image/sample-letter-bg.png',
    alt: 'Sunset mountains',
  },
  {
    id: '4',
    src: '/image/sample-letter-bg.png',
    alt: 'Forest path',
  },
]

type Props = {
  hidden?: boolean
  onBack?: () => void
  onContinue?: () => void
}

export function SelectPhotos({ hidden, onBack, onContinue }: Props) {
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null)
  const [photos, setPhotos] = useState<PhotoOption[]>(initialSamplePhotos)

  // Helper function to check if any photo is selected
  const hasSelectedPhoto = !!selectedPhoto

  const handlePhotoSelect = (photoId: string) => {
    setSelectedPhoto(selectedPhoto === photoId ? null : photoId)
  }

  const handleFileUpload = (file: File) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string
      const newPhoto: PhotoOption = {
        id: `uploaded-${Date.now()}`,
        src: dataUrl,
        alt: file.name,
        file: file,
        isUploaded: true,
      }

      // Remove any existing uploaded photos and add the new one
      setPhotos((prevPhotos) => {
        const nonUploadedPhotos = prevPhotos.filter(
          (photo) => !photo.isUploaded
        )
        return [newPhoto, ...nonUploadedPhotos]
      })
      // Auto-select the newly uploaded photo
      setSelectedPhoto(newPhoto.id)
    }
    reader.onerror = () => {
      toast.error('Error reading file')
    }
    reader.readAsDataURL(file)
  }

  const removeUploadedPhoto = (photoId: string) => {
    setPhotos((prevPhotos) =>
      prevPhotos.filter((photo) => photo.id !== photoId)
    )
    if (selectedPhoto === photoId) {
      setSelectedPhoto(null)
    }
  }

  return (
    <div hidden={hidden}>
      {/* Header */}
      <div className="mb-10">
        <div className="flex items-center gap-4">
          <div>
            <h1 className="mb-2 text-[40px] font-semibold">
              Photo <span className="text-primary">(size 4x6 inches)</span>
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
            Save to draft
          </Button>
        </div>
      </div>

      <div className="">
        {/* Photo Upload Section */}
        <div className="mb-8">
          {/* Upload Area */}
          <ImageUpload
            onFileUpload={handleFileUpload}
            className="mb-10"
            uploadLabel="Upload an image by dragging or clicking on the image to the area"
            dropLabel="Drop your image here!"
            supportText="Supports JPG and PNG up to 10MB"
          />
        </div>

        {/* Sample Photos Grid */}
        <div className="mb-10">
          <h3 className="text-text-primary mb-4 text-lg font-semibold">
            Choose from available photos:
          </h3>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {photos.map((photo) => (
              <div
                key={photo.id}
                className={cn(
                  'group relative aspect-[6/4] cursor-pointer overflow-hidden rounded-lg border-2 transition-all',
                  selectedPhoto === photo.id
                    ? 'border-primary ring-primary/20 shadow-lg ring-2'
                    : 'hover:border-primary/50 border-gray-200 hover:shadow-md'
                )}
                onClick={() => handlePhotoSelect(photo.id)}
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
                />
                <div
                  className={cn(
                    'absolute inset-0 transition-all',
                    selectedPhoto === photo.id
                      ? 'bg-primary/20'
                      : 'bg-black/0 group-hover:bg-black/10'
                  )}
                >
                  {selectedPhoto === photo.id && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="bg-primary rounded-full p-2 shadow-lg">
                        <CheckIcon className="size-5 text-white" />
                      </div>
                    </div>
                  )}
                </div>

                {/* Remove button for uploaded photos */}
                {photo.isUploaded && (
                  <Button
                    icon={<XIcon />}
                    size="icon"
                    onClick={(e) => {
                      e.stopPropagation()
                      removeUploadedPhoto(photo.id)
                    }}
                    className="absolute top-2 right-2"
                    variant="link"
                    color="destructive"
                  />
                )}

                {/* Upload indicator */}
                {photo.isUploaded && (
                  <div className="absolute top-2 left-2 rounded bg-green-500 px-2 py-1 text-xs text-white">
                    Uploaded
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4">
          <Button
            variant="outline"
            size="xl"
            className="flex-1"
            onClick={onBack}
          >
            back to previous page
          </Button>
          <Button
            size="xl"
            className="flex-1"
            disabled={!hasSelectedPhoto}
            onClick={onContinue}
          >
            Continue
          </Button>
        </div>
      </div>
    </div>
  )
}
