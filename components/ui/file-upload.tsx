'use client'

import { cn } from '@/lib/utils'
import { UploadIcon } from 'lucide-react'
import { useState } from 'react'
import { toast } from './sonner'

interface FileUploadProps {
  onFileUpload: (file: File) => void
  acceptedTypes?: string[]
  maxSize?: number // in bytes
  className?: string
  children?: React.ReactNode
  disabled?: boolean
  uploadLabel?: string
  dropLabel?: string
  supportText?: string
}

export function FileUpload({
  onFileUpload,
  acceptedTypes = ['image/jpeg', 'image/jpg', 'image/png'],
  maxSize = 10 * 1024 * 1024, // 10MB default
  className,
  children,
  disabled = false,
  uploadLabel,
  dropLabel,
  supportText,
}: FileUploadProps) {
  const [isDragOver, setIsDragOver] = useState(false)

  const validateAndProcessFile = (file: File) => {
    // Validate file type
    if (!acceptedTypes.includes(file.type)) {
      const allowedExtensions = acceptedTypes
        .map((type) => type.split('/')[1].toUpperCase())
        .join(', ')
      toast.error(`Please select a valid file (${allowedExtensions} only)`)
      return
    }

    // Validate file size
    if (file.size > maxSize) {
      const maxSizeMB = Math.round(maxSize / (1024 * 1024))
      toast.error(`File size must be less than ${maxSizeMB}MB`)
      return
    }

    onFileUpload(file)
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file && !disabled) {
      validateAndProcessFile(file)
    }
    // Reset input value to allow selecting the same file again
    event.target.value = ''
  }

  const handleDragOver = (event: React.DragEvent) => {
    if (disabled) return
    event.preventDefault()
    event.stopPropagation()
  }

  const handleDragEnter = (event: React.DragEvent) => {
    if (disabled) return
    event.preventDefault()
    event.stopPropagation()
    setIsDragOver(true)
  }

  const handleDragLeave = (event: React.DragEvent) => {
    if (disabled) return
    event.preventDefault()
    event.stopPropagation()
    // Only set dragOver to false if we're leaving the drop zone entirely
    if (!event.currentTarget.contains(event.relatedTarget as Node)) {
      setIsDragOver(false)
    }
  }

  const handleDrop = (event: React.DragEvent) => {
    if (disabled) return
    event.preventDefault()
    event.stopPropagation()
    setIsDragOver(false)

    const files = event.dataTransfer.files
    if (files.length > 0) {
      validateAndProcessFile(files[0])
    }
  }

  const triggerFileInput = () => {
    if (disabled) return
    document.getElementById('file-upload-input')?.click()
  }

  const acceptAttribute = acceptedTypes.join(',')

  // Default labels
  const defaultUploadLabel = 'Upload a file by dragging or clicking on the area'
  const defaultDropLabel = 'Drop your file here!'

  return (
    <div
      className={cn(
        'relative flex h-60 w-full cursor-pointer items-center justify-center rounded-lg border-2 border-dashed transition-all duration-300',
        isDragOver && !disabled
          ? 'border-primary bg-primary/10 shadow-lg'
          : 'border-primary hover:bg-primary/5 hover:border-primary/80 bg-white',
        disabled && 'cursor-not-allowed opacity-50',
        className
      )}
      onDragOver={handleDragOver}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={triggerFileInput}
    >
      {children || (
        <div className={cn('px-6 text-center transition-all duration-300')}>
          <UploadIcon
            className={cn(
              'mx-auto mb-4 size-12 transition-all duration-300',
              isDragOver && !disabled ? 'text-primary' : 'text-primary'
            )}
          />
          <p
            className={cn(
              'mb-2 text-lg font-medium transition-all duration-300',
              isDragOver && !disabled ? 'text-primary' : 'text-text-primary'
            )}
          >
            {isDragOver && !disabled
              ? dropLabel || defaultDropLabel
              : uploadLabel || defaultUploadLabel}
          </p>
          {!!supportText && (
            <p className="text-text-secondary text-sm">{supportText}</p>
          )}
        </div>
      )}

      <input
        type="file"
        accept={acceptAttribute}
        onChange={handleFileChange}
        className="hidden"
        id="file-upload-input"
        disabled={disabled}
      />
    </div>
  )
}

// Specialized component for image uploads
export function ImageUpload(props: Omit<FileUploadProps, 'acceptedTypes'>) {
  return (
    <FileUpload
      {...props}
      acceptedTypes={['image/jpeg', 'image/jpg', 'image/png']}
    />
  )
}
