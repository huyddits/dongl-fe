import { useWriteLetterStore } from '@/stores/useWriteLetterStore'
import { ICreateDraftBody, IPhotoData } from '@/utils/types/letter'

export const useLetterRequest = (): ICreateDraftBody & {
  uploadedPhotos: File[]
  removedPhotos: number[]
} => {
  const { writeLetterParams } = useWriteLetterStore()

  return {
    template_id: writeLetterParams.selectedTemplate?.id ?? 0,
    content: writeLetterParams.content.map((page) => page.content),
    styling: writeLetterParams.styling,
    uploadedPhotos: writeLetterParams.photos
      .filter((photo) => !photo.isRemoved && photo.data instanceof File)
      .map((photo) => photo.data as File),
    removedPhotos: writeLetterParams.photos
      .filter((photo) => photo.isRemoved && !(photo.data instanceof File))
      .map((photo) => (photo.data as IPhotoData).id),
  }
}
